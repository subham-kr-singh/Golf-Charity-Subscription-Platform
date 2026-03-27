const { supabaseAnon, supabaseAdmin } = require('../config/supabase');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    const { data: { user: authUser }, error: authError } = await supabaseAnon.auth.getUser(token);
    
    if (authError || !authUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: dbUser, error: dbError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, is_admin, auth_id')
      .eq('auth_id', authUser.id)
      .single();

    if (dbError || !dbUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = dbUser;
    next();
  } catch (error) {
    next(error);
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }
    const token = authHeader.split(' ')[1];

    const { data: { user: authUser }, error: authError } = await supabaseAnon.auth.getUser(token);
    
    if (authError || !authUser) {
      req.user = null;
      return next();
    }

    const { data: dbUser, error: dbError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, is_admin, auth_id')
      .eq('auth_id', authUser.id)
      .single();

    if (dbError || !dbUser) {
      req.user = null;
      return next();
    }

    req.user = dbUser;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = {
  verifyToken,
  optionalAuth
};
