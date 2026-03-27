const { supabaseAdmin } = require('../config/supabase');

const getActiveCharities = async (search, featured) => {
  let query = supabaseAdmin.from('charities').select('*').eq('is_active', true);
  if (featured) query = query.eq('is_featured', true);
  if (search) query = query.ilike('name', `%${search}%`);
  return query.order('is_featured', { ascending: false }).order('name', { ascending: true });
};

const getCharityBySlug = async (slug) => {
  return supabaseAdmin.from('charities').select('*').eq('slug', slug).eq('is_active', true).single();
};

const getCharityById = async (id) => {
  return supabaseAdmin.from('charities').select('*').eq('id', id).single();
};

const getUserCharitySelection = async (userId) => {
  return supabaseAdmin
    .from('user_charity_selections')
    .select(`*, charities(*)`)
    .eq('user_id', userId)
    .single();
};

const upsertUserCharitySelection = async (userId, charityId, contributionPercent) => {
  return supabaseAdmin
    .from('user_charity_selections')
    .upsert({ user_id: userId, charity_id: charityId, contribution_percent: contributionPercent }, { onConflict: 'user_id' })
    .select()
    .single();
};

const createCharity = async (data) => supabaseAdmin.from('charities').insert([data]).select().single();

const updateCharity = async (id, data) => supabaseAdmin.from('charities').update(data).eq('id', id).select().single();

const unfeatureAllCharities = async () => supabaseAdmin.from('charities').update({ is_featured: false }).eq('is_featured', true);

module.exports = {
  getActiveCharities,
  getCharityBySlug,
  getCharityById,
  getUserCharitySelection,
  upsertUserCharitySelection,
  createCharity,
  updateCharity,
  unfeatureAllCharities
};
