const charityService = require('../../services/charity.service');
const { supabaseAdmin } = require('../../config/supabase');

const createCharityAdmin = async (req, res, next) => {
  try {
    const { is_featured } = req.body;
    if (is_featured === true) {
      await charityService.unfeatureAllCharities();
    }
    const { data, error } = await charityService.createCharity(req.body);
    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

const updateCharityAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_featured } = req.body;
    if (is_featured === true) {
      await charityService.unfeatureAllCharities();
    }
    const { data, error } = await charityService.updateCharity(id, req.body);
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const deleteCharityAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { count } = await supabaseAdmin.from('user_charity_selections').select('*', { count: 'exact', head: true }).eq('charity_id', id);
    if (count && count > 0) {
      return res.status(409).json({ error: 'Cannot delete: charity has active donors', donor_count: count });
    }
    await charityService.updateCharity(id, { is_active: false });
    res.status(200).json({ message: 'Charity deactivated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCharityAdmin, updateCharityAdmin, deleteCharityAdmin };
