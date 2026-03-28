const stripe = require('../config/stripe');
const { supabaseAdmin } = require('../config/supabase');
const subService = require('../services/subscription.service');

const checkout = async (req, res, next) => {
  try {
    const { plan } = req.body;
    
    const { data: existingSub } = await subService.getActiveSubscription(req.user.id);
    if (existingSub) {
      return res.status(409).json({ error: 'Already subscribed' });
    }

    let customerId = req.user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.full_name,
        metadata: { user_id: req.user.id }
      });
      customerId = customer.id;
      await supabaseAdmin.from('users').update({ stripe_customer_id: customerId }).eq('id', req.user.id);
    }

    const priceId = plan === 'monthly' ? process.env.STRIPE_PRICE_ID_MONTHLY : process.env.STRIPE_PRICE_ID_YEARLY;

    const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',')[0] : 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${clientUrl}/dashboard?subscribed=true`,
      cancel_url: `${clientUrl}/dashboard/subscription?cancelled=true`,
      metadata: { user_id: req.user.id, plan }
    });

    res.status(200).json({ data: { checkout_url: session.url } });
  } catch (error) {
    next(error);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const { data, error } = await subService.getActiveSubscription(req.user.id);
    if (error || !data) {
      return res.status(200).json({ data: { status: 'none' } });
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const cancel = async (req, res, next) => {
  try {
    await stripe.subscriptions.cancel(req.subscription.stripe_subscription_id);
    const { data, error } = await subService.manualUpdateSubscription(req.user.id, {
      status: 'cancelled',
      cancelled_at: new Date().toISOString()
    });
    if (error) throw error;
    res.status(200).json({ message: 'Subscription cancelled. Access continues until period end.', data });
  } catch (error) {
    next(error);
  }
};

const portal = async (req, res, next) => {
  try {
    const { data: user } = await supabaseAdmin.from('users').select('stripe_customer_id').eq('id', req.user.id).single();
    if (!user || !user.stripe_customer_id) {
      return res.status(400).json({ error: 'No Stripe customer found' });
    }

    const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',')[0] : 'http://localhost:5173';

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${clientUrl}/dashboard/subscription`
    });

    res.status(200).json({ data: { portal_url: session.url } });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout, getStatus, cancel, portal };
