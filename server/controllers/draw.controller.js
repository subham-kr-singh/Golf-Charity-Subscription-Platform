const drawService = require('../services/draw.service');
const { supabaseAdmin } = require('../config/supabase');

const getLatest = async (req, res, next) => {
  try {
    const { data: draw, error } = await drawService.getLatestPublishedDraw();
    if (error || !draw) {
      return res.status(404).json({ error: 'No published draws found' });
    }

    let winnerDetails = null;
    if (req.user) {
      const { data: winData, error: winErr } = await supabaseAdmin
        .from('winners')
        .select('*')
        .eq('draw_id', draw.id)
        .eq('user_id', req.user.id)
        .single();
        
      if (!winErr && winData) {
        winnerDetails = winData;
      }
    }

    res.status(200).json({ data: { ...draw, ...(winnerDetails && { winnerDetails }) } });
  } catch (error) {
    next(error);
  }
};

const getResults = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: draw, error: drawErr } = await drawService.getDrawById(id);
    if (drawErr || !draw) return res.status(404).json({ error: 'Draw not found' });

    const { data: winners, error: winErr } = await supabaseAdmin
      .from('winners')
      .select('match_type')
      .eq('draw_id', id);

    if (winErr) throw winErr;

    const aggregate = { match5: 0, match4: 0, match3: 0 };
    winners.forEach(w => {
      if (w.match_type === '5') aggregate.match5++;
      if (w.match_type === '4') aggregate.match4++;
      if (w.match_type === '3') aggregate.match3++;
    });

    res.status(200).json({ data: { draw, winners: aggregate } });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const { data: draws, error } = await drawService.getPublishedDrawsPaginated(page, limit);
    if (error) throw error;
    
    res.status(200).json({ data: draws });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLatest, getResults, getHistory };
