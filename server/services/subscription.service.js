const { supabaseAdmin } = require('../config/supabase');

const getActiveSubscription = async (userId) => {
  return supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .single();
};

const getSubscriptionByStripeId = async (stripeSubId) => {
  return supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('stripe_subscription_id', stripeSubId)
    .single();
};

const upsertSubscription = async (data) => {
  return supabaseAdmin.from('subscriptions').upsert(data, { onConflict: 'user_id' }).select().single();
};

const updateSubscription = async (stripeSubId, data) => {
  return supabaseAdmin
    .from('subscriptions')
    .update(data)
    .eq('stripe_subscription_id', stripeSubId)
    .select()
    .single();
};

const manualUpdateSubscription = async (userId, data) => {
  return supabaseAdmin
    .from('subscriptions')
    .update(data)
    .eq('user_id', userId)
    .select()
    .single();
};

module.exports = {
  getActiveSubscription,
  getSubscriptionByStripeId,
  upsertSubscription,
  updateSubscription,
  manualUpdateSubscription
};
