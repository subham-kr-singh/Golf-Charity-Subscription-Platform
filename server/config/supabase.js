const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;

const supabaseAnon = createClient(
  supabaseUrl,
  process.env.SUPABASE_ANON_KEY
);

const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = {
  supabaseAnon,
  supabaseAdmin,
};
