const { supabaseAdmin } = require('../config/supabase');

const getUserWins = async (userId) => {
  return supabaseAdmin
    .from('winners')
    .select(`*, draws(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

const getWinnerById = async (id) => supabaseAdmin.from('winners').select('*').eq('id', id).single();

const updateWinner = async (id, data) => supabaseAdmin.from('winners').update(data).eq('id', id).select().single();

const getWinnersPaginated = async ({ draw_id, verify_status, payout_status, page = 1, limit = 20 }) => {
  let query = supabaseAdmin.from('winners').select(`*, users(email), draws(draw_date)`, { count: 'exact' });
  if (draw_id) query = query.eq('draw_id', draw_id);
  if (verify_status) query = query.eq('verify_status', verify_status);
  if (payout_status) query = query.eq('payout_status', payout_status);
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return query.range(from, to).order('created_at', { ascending: false });
};

module.exports = {
  getUserWins,
  getWinnerById,
  updateWinner,
  getWinnersPaginated
};
