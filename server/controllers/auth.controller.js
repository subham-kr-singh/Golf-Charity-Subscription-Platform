const { supabaseAnon, supabaseAdmin } = require('../config/supabase');

const register = async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body;
    
    const { data: authData, error: authError } = await supabaseAnon.auth.signUp({ 
      email, 
      password,
      options: { data: { full_name } }
    });
    
    if (authError) {
      if (authError.message.toLowerCase().includes('already registered')) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      throw authError;
    }
    
    if (authData?.user?.identities?.length === 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    const { error: dbError } = await supabaseAdmin.from('users').insert([{
      auth_id: authData.user.id,
      email: email,
      full_name: full_name
    }]);

    if (dbError) throw dbError;

    res.status(201).json({ message: 'Registration successful. Check your email.', data: authData.user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
    
    if (error) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const { data: dbUser, error: dbError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, is_admin')
      .eq('auth_id', data.user.id)
      .single();
      
    if (dbError) throw dbError;
    
    res.status(200).json({ 
      data: {
        access_token: data.session.access_token, 
        refresh_token: data.session.refresh_token, 
        user: dbUser
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { error } = await supabaseAnon.auth.signOut();
    if (error) throw error;
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const { data, error } = await supabaseAnon.auth.refreshSession({ refresh_token });
    if (error) throw error;
    res.status(200).json({ 
      data: {
        access_token: data.session.access_token, 
        refresh_token: data.session.refresh_token 
      }
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await supabaseAnon.auth.resetPasswordForEmail(email, { 
      redirectTo: `${process.env.CLIENT_URL}/reset-password` 
    });
    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, refresh, forgotPassword };
