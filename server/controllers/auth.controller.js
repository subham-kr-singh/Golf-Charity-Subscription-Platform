const { supabaseAnon, supabaseAdmin } = require('../config/supabase');

const register = async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body;
    console.log('Registering user:', email);

    // Check if user already exists in public users table
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Use admin client to create user with email auto-confirmed
    // so users can log in immediately without email verification
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (authError) {
      console.error('Registration Auth Error:', authError.message);
      if (authError.message.toLowerCase().includes('already') ||
          authError.message.toLowerCase().includes('duplicate')) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      throw authError;
    }

    console.log('User created in Auth, email auto-confirmed:', authData.user.id);

    const { error: dbError } = await supabaseAdmin.from('users').insert([{
      auth_id: authData.user.id,
      email,
      full_name,
    }]);

    if (dbError) {
      console.error('Registration DB Error:', dbError.message);
      // Rollback the auth user if DB insert fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw dbError;
    }

    console.log('Registration profile created successfully!');
    res.status(201).json({ message: 'Registration successful.', data: authData.user });
  } catch (error) {
    console.error('Unexpected Registration Error:', error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error('Supabase Auth Error:', error.message);
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
