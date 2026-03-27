const { supabaseAdmin } = require('../config/supabase');

const createDraw = async (data) => supabaseAdmin.from('draws').insert([data]).select().single();

const updateDraw = async (id, data) => supabaseAdmin.from('draws').update(data).eq('id', id).select().single();

const getDrawById = async (id) => supabaseAdmin.from('draws').select('*').eq('id', id).single();

const getLatestPublishedDraw = async () => {
  return supabaseAdmin
    .from('draws')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(1)
    .single();
};

const getPublishedDrawsPaginated = async (page = 1, limit = 12) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return supabaseAdmin
    .from('draws')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);
};

const getAllDrawsPaginated = async (page = 1, limit = 20) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return supabaseAdmin
    .from('draws')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);
};

const deleteDraw = async (id) => supabaseAdmin.from('draws').delete().eq('id', id);

const deleteDrawEntries = async (drawId) => supabaseAdmin.from('draw_entries').delete().eq('draw_id', drawId);

module.exports = {
  createDraw,
  updateDraw,
  getDrawById,
  getLatestPublishedDraw,
  getPublishedDrawsPaginated,
  getAllDrawsPaginated,
  deleteDraw,
  deleteDrawEntries
};
