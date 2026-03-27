const { supabaseAdmin } = require('../config/supabase');
const stripe = require('../config/stripe');
const subService = require('../services/subscription.service');
const charityService = require('../services/charity.service');

const getMe = async (req, res, next) => {
  try {
    const { data: subscription } = await subService.getActiveSubscription(req.user.id);
    const { data: charityRes } = await charityService.getUserCharitySelection(req.user.id);
    
    res.status(200).json({
      data: {
        ...req.user,
        subscription_status: subscription ? 'active' : 'none',
        subscription: subscription || null,
        charity_selection: charityRes || null
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const updates = req.body; 
    const { data, error } = await supabaseAdmin.from('users').update(updates).eq('id', req.user.id).select().single();
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    if (req.subscription && req.subscription.stripe_subscription_id) {
      await stripe.subscriptions.cancel(req.subscription.stripe_subscription_id);
      await subService.manualUpdateSubscription(req.user.id, { 
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      });
    }
    
    res.status(200).json({ message: 'Account deactivated. Subscription cancelled.' });
  } catch (error) {
    next(error);
  }
};

const updateMyCharity = async (req, res, next) => {
  try {
    const { charity_id, contribution_percent } = req.body;
    const { data, error } = await charityService.upsertUserCharitySelection(req.user.id, charity_id, contribution_percent);
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const getMyCharity = async (req, res, next) => {
  try {
    const { data, error } = await charityService.getUserCharitySelection(req.user.id);
    if (error || !data) {
      return res.status(200).json({ data: { selection: null } });
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMe, updateMe, deleteMe, updateMyCharity, getMyCharity };
