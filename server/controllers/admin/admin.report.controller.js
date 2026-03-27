const { supabaseAdmin } = require('../../config/supabase');
const prizePool = require('../../services/prizePool.service');

const getOverview = async (req, res, next) => {
  try {
    const { count: total_users } = await supabaseAdmin.from('users').select('*', { count: 'exact', head: true });
    
    const { count: active_subscribers } = await supabaseAdmin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active');
    
    const { count: monthly_subscribers } = await supabaseAdmin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').eq('plan', 'monthly');
    const { count: yearly_subscribers } = await supabaseAdmin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').eq('plan', 'yearly');

    const { count: total_draws } = await supabaseAdmin.from('draws').select('*', { count: 'exact', head: true }).eq('status', 'published');
    
    const { data: paid_winners } = await supabaseAdmin.from('winners').select('prize_amount').eq('payout_status', 'paid');
    const total_prize_paid = paid_winners ? paid_winners.reduce((acc, w) => acc + (parseFloat(w.prize_amount) || 0), 0) : 0;
    
    const { count: total_winners_all_time } = await supabaseAdmin.from('winners').select('*', { count: 'exact', head: true });
    
    const { data: carriedJackpot } = await prizePool.getCarriedJackpot();

    const { data: charity_contribution_estimate, error: cErr } = await supabaseAdmin.from('v_charity_contributions').select('*');

    res.status(200).json({
      data: {
        total_users,
        active_subscribers,
        monthly_subscribers,
        yearly_subscribers,
        total_draws,
        total_prize_paid,
        total_winners_all_time,
        current_jackpot_pool: carriedJackpot || 0,
        charity_contribution_estimate: cErr ? null : charity_contribution_estimate
      }
    });
  } catch (error) {
    next(error);
  }
};

const getDrawsReport = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('draws')
      .select('draw_date, entry_count, jackpot_carried_forward, winners(match_type, prize_amount, payout_status)')
      .eq('status', 'published')
      .order('draw_date', { ascending: false });

    if (error) throw error;
    
    const report = data.map(d => {
      let w5 = 0, w4 = 0, w3 = 0, paid = 0;
      if (d.winners) {
        d.winners.forEach(w => {
          if (w.match_type === '5') w5++;
          if (w.match_type === '4') w4++;
          if (w.match_type === '3') w3++;
          if (w.payout_status === 'paid') paid += parseFloat(w.prize_amount) || 0;
        });
      }
      return {
        draw_date: d.draw_date,
        entry_count: d.entry_count,
        winners_per_tier: { match5: w5, match4: w4, match3: w3 },
        total_prize_paid_out: paid,
        jackpot_carried_forward: d.jackpot_carried_forward
      };
    });

    res.status(200).json({ data: report });
  } catch (error) {
    next(error);
  }
};

const getCharitiesReport = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin.from('v_charity_contributions').select('*');
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOverview, getDrawsReport, getCharitiesReport };
