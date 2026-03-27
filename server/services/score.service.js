const { supabaseAdmin } = require('../config/supabase');

const getUserScores = async (userId) => {
  return supabaseAdmin
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('played_date', { ascending: false })
    .order('created_at', { ascending: false });
};

const getScoreById = async (id) => {
  return supabaseAdmin.from('scores').select('*').eq('id', id).single();
};

const insertScore = async (data) => {
  return supabaseAdmin.from('scores').insert([data]).select().single();
};

const updateScore = async (id, data) => {
  return supabaseAdmin.from('scores').update(data).eq('id', id).select().single();
};

const deleteScore = async (id) => {
  return supabaseAdmin.from('scores').delete().eq('id', id);
};

const completelyReplaceScores = async (userId, scoresData) => {
  // Bypass rolling-5 trigger by deleting first, then inserting
  const { error: delError } = await supabaseAdmin.from('scores').delete().eq('user_id', userId);
  if (delError) return { data: null, error: delError };
  
  if (scoresData && scoresData.length > 0) {
    const toInsert = scoresData.map(s => ({ ...s, user_id: userId }));
    return supabaseAdmin.from('scores').insert(toInsert).select();
  }
  return { data: [], error: null };
};

module.exports = {
  getUserScores,
  getScoreById,
  insertScore,
  updateScore,
  deleteScore,
  completelyReplaceScores
};
