const { supabaseAdmin } = require('../config/supabase');

const getPrizePoolConfig = async () => {
  return supabaseAdmin.from('prize_pool_config').select('*').eq('id', 1).single();
};

const calculatePrizePools = (activeSubscriberCount, monthlyFeeAmount, carriedJackpot = 0, config) => {
  // Fallback defaults if config not passed
  const c = config || {
    pool_percent_of_fee: 15,
    match5_share: 40,
    match4_share: 35,
    match3_share: 25
  };

  const fee = parseFloat(monthlyFeeAmount);
  const percent = parseFloat(c.pool_percent_of_fee) / 100;
  
  const total_pool = Math.round((activeSubscriberCount * fee * percent) * 100) / 100;
  
  const pool5Base = Math.round((total_pool * (parseFloat(c.match5_share) / 100)) * 100) / 100;
  const pool4Base = Math.round((total_pool * (parseFloat(c.match4_share) / 100)) * 100) / 100;
  const pool3Base = Math.round((total_pool * (parseFloat(c.match3_share) / 100)) * 100) / 100;

  return {
    total_pool: total_pool,
    pool5: Math.round((pool5Base + carriedJackpot) * 100) / 100,
    pool4: pool4Base,
    pool3: pool3Base,
    active_subscribers: activeSubscriberCount
  };
};

const getCarriedJackpot = async () => {
  const { data, error } = await supabaseAdmin
    .from('draws')
    .select('pool_match5')
    .eq('status', 'published')
    .eq('jackpot_carried_forward', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return { data: 0, error: null };
  return { data: parseFloat(data.pool_match5) || 0, error: null };
};

const getActiveSubscriberCount = async () => {
  const { count, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString());

  if (error) return { data: 0, error };
  return { data: count, error: null };
};

module.exports = {
  getPrizePoolConfig,
  calculatePrizePools,
  getCarriedJackpot,
  getActiveSubscriberCount
};
