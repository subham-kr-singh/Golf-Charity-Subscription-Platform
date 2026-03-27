const charityService = require('../services/charity.service');

const getCharities = async (req, res, next) => {
  try {
    const search = req.query.search;
    const featured = req.query.featured === 'true';
    const { data, error } = await charityService.getActiveCharities(search, featured);
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const getCharityBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { data, error } = await charityService.getCharityBySlug(slug);
    if (error || !data) {
      return res.status(404).json({ error: 'Charity not found' });
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCharities, getCharityBySlug };
