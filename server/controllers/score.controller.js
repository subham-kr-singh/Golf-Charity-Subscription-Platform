const scoreService = require('../services/score.service');
const { supabaseAdmin } = require('../config/supabase');

const getScores = async (req, res, next) => {
  try {
    const { data, error } = await scoreService.getUserScores(req.user.id);
    if (error) throw error;
    res.status(200).json({ data: { scores: data, count: data.length } });
  } catch (error) {
    next(error);
  }
};

const createScore = async (req, res, next) => {
  try {
    const { value, played_date } = req.body;
    const { data: inserted, error } = await scoreService.insertScore({
      user_id: req.user.id,
      value,
      played_date
    });
    if (error) throw error;
    
    // fetch full list to return
    const { data: allScores, error: allErr } = await scoreService.getUserScores(req.user.id);
    if (allErr) throw allErr;

    res.status(201).json({ data: { score: inserted, list: allScores } });
  } catch (error) {
    next(error);
  }
};

const updateScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: existing, error: existErr } = await scoreService.getScoreById(id);
    
    if (existErr || !existing || existing.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Score not found' });
    }
    
    const { data, error } = await scoreService.updateScore(id, req.body);
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const deleteScoreHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: existing, error: existErr } = await scoreService.getScoreById(id);
    
    if (existErr || !existing || existing.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Score not found' });
    }
    
    const { error } = await scoreService.deleteScore(id);
    if (error) throw error;
    res.status(200).json({ message: 'Score deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getScores, createScore, updateScore, deleteScore: deleteScoreHandler };
