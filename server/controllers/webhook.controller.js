const stripe = require('../config/stripe');
const { supabaseAdmin } = require('../config/supabase');
const emailService = require('../services/email.service');
const subService = require('../services/subscription.service');

const handleStripeWebhook = async (req, res, next) => {
  let event;

  try {
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Acknowledge immediately
  res.status(200).json({ received: true });

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.mode === 'subscription') {
          const userId = session.metadata.user_id;
          const plan = session.metadata.plan;
          
          const sub = await stripe.subscriptions.retrieve(session.subscription);
          
          await supabaseAdmin.from('subscriptions').insert([{
            user_id: userId,
            plan,
            status: 'active',
            stripe_subscription_id: session.subscription,
            current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString()
          }]);
          
          const { data: user } = await supabaseAdmin.from('users').select('*').eq('id', userId).single();
          if (user) {
            await emailService.sendWelcomeEmail(user.email, user.full_name);
            await emailService.sendSubscriptionConfirmedEmail(user.email, user.full_name, plan, sub.current_period_end * 1000);
          }
        }
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        if (invoice.subscription) {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription);
          await supabaseAdmin.from('subscriptions')
            .update({
              status: 'active',
              current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
              current_period_end: new Date(sub.current_period_end * 1000).toISOString()
            })
            .eq('stripe_subscription_id', invoice.subscription);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        if (invoice.subscription) {
          const { data: dbSub } = await subService.getSubscriptionByStripeId(invoice.subscription);
          if (dbSub) {
            await supabaseAdmin.from('subscriptions').update({ status: 'lapsed' }).eq('stripe_subscription_id', invoice.subscription);
            const { data: user } = await supabaseAdmin.from('users').select('*').eq('id', dbSub.user_id).single();
            if (user) {
              await emailService.sendPaymentFailedEmail(user.email, user.full_name, `${process.env.CLIENT_URL}/dashboard`);
            }
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await supabaseAdmin.from('subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    // Ignore error, already sent 200
  }
};

module.exports = { handleStripeWebhook };
