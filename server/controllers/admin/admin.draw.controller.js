const drawService = require('../../services/draw.service');
const drawEngine = require('../../services/drawEngine.service');
const prizePool = require('../../services/prizePool.service');
const emailService = require('../../services/email.service');
const { supabaseAdmin } = require('../../config/supabase');

const createDraw = async (req, res, next) => {
  try {
    const { draw_date, mode } = req.body;
    const { data, error } = await drawService.createDraw({ draw_date, mode, status: 'pending' });
    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

const simulateDraw = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: draw, error } = await drawService.getDrawById(id);
    if (error || !draw) return res.status(404).json({ error: 'Draw not found' });
    if (draw.status !== 'pending') return res.status(409).json({ error: 'Draw must be in pending status' });

    // 1. Snapshot entries
    const { data: entryCount, error: entryErr } = await drawEngine.buildDrawEntries(id);
    if (entryErr) throw entryErr;

    // 2. Predict winning numbers
    let winningNumbers = [];
    if (draw.mode === 'random') {
      winningNumbers = drawEngine.generateRandomDraw();
    } else {
      const { data: scoresData } = await supabaseAdmin.from('scores').select('value');
      const allScores = scoresData ? scoresData.map(s => s.value) : [];
      winningNumbers = drawEngine.generateWeightedDraw(allScores);
    }

    // 3. Process results internally
    const { data: resultData } = await drawEngine.processDrawResults(id, winningNumbers);

    // 4. Calculate pools
    const { data: activeSubCount } = await prizePool.getActiveSubscriberCount();
    const pools = await prizePool.calculatePrizePools(activeSubCount || 0, 9.99, 0);

    const { data: assignmentData } = await drawEngine.calculateAndAssignPrizes(id, resultData, pools, 0);

    const simulationData = {
      status: 'simulated',
      winning_numbers: winningNumbers,
      prize_pool_total: pools.total_pool,
      pool_match5: pools.pool5,
      pool_match4: pools.pool4,
      pool_match3: pools.pool3,
      simulated_at: new Date().toISOString()
    };

    const { data: updatedDraw } = await drawService.updateDraw(id, simulationData);

    res.status(200).json({ 
      data: {
        winning_numbers: winningNumbers,
        entry_count: entryCount,
        potential_winners: { 
          match5: resultData.winners_5.length, 
          match4: resultData.winners_4.length, 
          match3: resultData.winners_3.length 
        },
        prize_breakdown: { pool5: pools.pool5, pool4: pools.pool4, pool3: pools.pool3 },
        jackpot_would_carry: assignmentData.jackpot_carried_forward,
        draw: updatedDraw
      } 
    });
  } catch (error) {
    next(error);
  }
};

const publishDraw = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: draw, error } = await drawService.getDrawById(id);
    if (error || !draw) return res.status(404).json({ error: 'Draw not found' });
    if (draw.status !== 'simulated') return res.status(409).json({ error: 'Draw must be in simulated status' });

    const { data: resultData } = await drawEngine.processDrawResults(id, draw.winning_numbers);

    const { data: carriedJackpot } = await prizePool.getCarriedJackpot();
    const pools = { pool5: draw.pool_match5, pool4: draw.pool_match4, pool3: draw.pool_match3 };
    
    // Calculate and assign updates database winner rows
    const { data: assignData } = await drawEngine.calculateAndAssignPrizes(id, resultData, pools, carriedJackpot);

    const { data: activeSubCount } = await prizePool.getActiveSubscriberCount();

    const publishedData = {
      status: 'published',
      published_at: new Date().toISOString(),
      active_subscriber_count: activeSubCount || 0,
      jackpot_carried_forward: assignData.jackpot_carried_forward
    };
    const { data: publishedDraw } = await drawService.updateDraw(id, publishedData);

    const { data: winnersList } = await supabaseAdmin.from('winners').select('*, users(email, full_name)').eq('draw_id', id);

    // Let's not send actual emails if this is a massive list without queues in production, but per instructions:
    // "Send draw results email to all active subscribers" -> We'll mock it or just iterate
    const { data: subs } = await supabaseAdmin.from('subscriptions').select('users(email, full_name, id), status').eq('status', 'active');
    
    const activeUsers = subs ? subs.map(s => s.users).filter(u => u != null) : [];
    
    for (const user of activeUsers) {
      const isWinner = winnersList.find(w => w.user_id === user.id);
      await emailService.sendDrawResultsEmail(
        user.email, user.full_name, draw.draw_date, draw.winning_numbers, 
        !!isWinner, isWinner ? isWinner.match_type : null
      );
    }
    
    for (const win of winnersList) {
      await emailService.sendWinnerNotificationEmail(
        win.users.email, win.users.full_name, win.prize_amount, win.match_type, 
        `${process.env.CLIENT_URL}/dashboard/win/${win.id}`
      );
    }

    res.status(200).json({ 
      published: true, 
      draw: publishedDraw, 
      summary: { 
        winners_5: resultData.winners_5.length, 
        winners_4: resultData.winners_4.length, 
        winners_3: resultData.winners_3.length 
      }
    });
  } catch (error) {
    next(error);
  }
};

const getDraws = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const { data: draws, error } = await drawService.getAllDrawsPaginated(page, limit);
    if (error) throw error;
    res.status(200).json({ data: draws });
  } catch (error) {
    next(error);
  }
};

const updateDrawAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { mode, admin_notes, draw_date } = req.body;
    const { data: draw, error } = await drawService.getDrawById(id);
    if (error || !draw || draw.status !== 'pending') {
      return res.status(409).json({ error: 'Only allowed on pending draws' });
    }
    const { data: updated } = await drawService.updateDraw(id, { mode, admin_notes, draw_date });
    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteDrawAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: draw, error } = await drawService.getDrawById(id);
    if (error || !draw || !['pending', 'simulated'].includes(draw.status)) {
      return res.status(409).json({ error: 'Only allowed on pending or simulated draws' });
    }
    await drawService.deleteDrawEntries(id);
    await drawService.deleteDraw(id);
    res.status(200).json({ message: 'Draw deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createDraw, simulateDraw, publishDraw, getDraws, updateDrawAdmin, deleteDrawAdmin };
