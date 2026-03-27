const { supabaseAdmin } = require('../../config/supabase');
const scoreService = require('../../services/score.service');

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search;
    const status = req.query.status;

    let query = supabaseAdmin.from('users').select(`
      *,
      subscriptions(status, plan),
      scores(count)
    `, { count: 'exact' });

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
    }
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data: users, count, error } = await query.range(from, to).order('created_at', { ascending: false });
    if (error) throw error;
    
    // Simple filter in js if status is provided (supabase join filtering is complex)
    let filteredUsers = users;
    if (status) {
      filteredUsers = users.filter(u => u.subscriptions && u.subscriptions.some(s => s.status === status));
    }

    res.status(200).json({ data: filteredUsers, count });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin.from('users').select(`
      *,
      subscriptions(*),
      scores(*),
      winners(*)
    `).eq('id', id).single();
    
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const replaceScores = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { scores } = req.body;
    
    const { data, error } = await scoreService.completelyReplaceScores(id, scores);
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .update({ status })
      .eq('user_id', id)
      .select().single();
      
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, replaceScores, updateSubscription };
