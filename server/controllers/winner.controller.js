const winnerService = require('../services/winner.service');
const { supabaseAdmin } = require('../config/supabase');
const path = require('path');

const getMyWins = async (req, res, next) => {
  try {
    const { data, error } = await winnerService.getUserWins(req.user.id);
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const submitProof = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: winner, error: winnerErr } = await winnerService.getWinnerById(id);
    
    if (winnerErr || !winner || winner.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Winner record not found' });
    }
    
    if (winner.verify_status !== 'pending') {
      return res.status(409).json({ error: 'Proof already submitted or reviewed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Proof file is required' });
    }

    const fileExt = path.extname(req.file.originalname);
    const fileName = `${req.user.id}/${winner.draw_id}-proof${fileExt}`;

    const { data: uploadData, error: uploadErr } = await supabaseAdmin
      .storage
      .from('winner-proofs')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      });

    if (uploadErr) throw uploadErr;

    const { data: publicUrlData } = supabaseAdmin.storage.from('winner-proofs').getPublicUrl(fileName);
    
    const { error: updateErr } = await winnerService.updateWinner(id, {
      proof_url: publicUrlData.publicUrl,
      verify_status: 'pending' // Or explicitly mark it as submitted
    });

    if (updateErr) throw updateErr;

    res.status(200).json({ message: 'Proof submitted. Under review.', data: { proof_url: publicUrlData.publicUrl } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyWins, submitProof };
