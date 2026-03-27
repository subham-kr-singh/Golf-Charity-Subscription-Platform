const { supabaseAdmin } = require('../config/supabase');

const getUserById = async (id) => {
  return supabaseAdmin.from('users').select('*').eq('id', id).single();
};

const getUserByAuthId = async (authId) => {
  return supabaseAdmin.from('users').select('*').eq('auth_id', authId).single();
};

const createUser = async (user) => {
  return supabaseAdmin.from('users').insert([user]).select().single();
};

const updateUser = async (id, data) => {
  return supabaseAdmin.from('users').update(data).eq('id', id).select().single();
};

const getUsersPaginated = async ({ search, status, page = 1, limit = 20 }) => {
  // We'll join with subscriptions in the controller or do complex view query
  let query = supabaseAdmin.from('users').select('*', { count: 'exact' });
  if (search) query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return query.range(from, to).order('created_at', { ascending: false });
};

module.exports = {
  getUserById,
  getUserByAuthId,
  createUser,
  updateUser,
  getUsersPaginated
};
