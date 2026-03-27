const winnerService = require('../../services/winner.service');
const emailService = require('../../services/email.service');
const { supabaseAdmin } = require('../../config/supabase');

const getWinnersAdmin = async (req, res, next) => {
  try {
    const { draw_id, verify_status, payout_status, page, limit } = req.query;
    const { data, count, error } = await winnerService.getWinnersPaginated({
      draw_id, verify_status, payout_status, page: parseInt(page), limit: parseInt(limit)
    });
    if (error) throw error;
    res.status(200).json({ data, count });
  } catch (error) {
    next(error);
  }
};

const verifyWinnerAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body; // 'approved' | 'rejected'
    
    const { data: winner, error } = await winnerService.updateWinner(id, {
      verify_status: status,
      verified_by: req.user.id,
      verified_at: new Date().toISOString()
    });
    
    if (error) throw error;

    const { data: user } = await supabaseAdmin.from('users').select('*').eq('id', winner.user_id).single();

    if (user) {
      await emailService.sendVerificationOutcomeEmail(user.email, user.full_name, status, winner.prize_amount, admin_notes);
    }
    
    res.status(200).json({ data: winner });
  } catch (error) {
    next(error);
  }
};

const payoutWinnerAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { admin_notes } = req.body;

    const { data: currentWinner, error: fetchErr } = await winnerService.getWinnerById(id);
    if (fetchErr || !currentWinner) return res.status(404).json({ error: 'Winner not found' });
    
    if (currentWinner.verify_status !== 'approved') {
      return res.status(409).json({ error: 'Winner must be approved first' });
    }

    const { data: winner, error } = await winnerService.updateWinner(id, {
      payout_status: 'paid',
      paid_at: new Date().toISOString(),
      admin_notes: admin_notes ? `${currentWinner.admin_notes || ''}\n${admin_notes}` : currentWinner.admin_notes
    });
    
    if (error) throw error;
    
    const { data: user } = await supabaseAdmin.from('users').select('*').eq('id', winner.user_id).single();
    const { data: draw } = await supabaseAdmin.from('draws').select('*').eq('id', winner.draw_id).single();

    if (user && draw) {
      await emailService.sendPaymentConfirmationEmail(user.email, user.full_name, winner.prize_amount, draw.draw_date);
    }

    res.status(200).json({ data: winner });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWinnersAdmin, verifyWinnerAdmin, payoutWinnerAdmin };
