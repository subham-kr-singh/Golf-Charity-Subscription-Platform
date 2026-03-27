const { supabaseAdmin } = require('../config/supabase');

const requireSubscription = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: subscription, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'active')
      .gt('current_period_end', new Date().toISOString())
      .single();

    if (error || !subscription) {
      return res.status(403).json({ 
        error: 'subscription_required',
        message: 'An active subscription is required to access this feature.'
      });
    }

    req.subscription = subscription;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireSubscription;
