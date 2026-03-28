import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [validationError, setValidationError] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  const { register, login, isRegistering } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setValidationError('');
    
    if (formData.password !== formData.confirm_password) {
      setValidationError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password
      });
      
      await login({ email: formData.email, password: formData.password });
      navigate('/dashboard/subscription', { replace: true });
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen relative py-20">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-accent-2/10 to-transparent pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-xl glass p-8 sm:p-12 rounded-3xl border border-border shadow-2xl relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/favicon.svg" alt="Logo" className="w-14 h-14 mx-auto drop-shadow-glow" />
          </Link>
          <h1 className="text-4xl font-heading font-extrabold text-white mb-3">Join the Club</h1>
          <p className="text-lg text-muted">Create your account to start giving back.</p>
        </div>

        {(validationError || submitError) && (
          <div className="mb-8 p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={20} />
            <p className="text-sm font-medium text-danger">{validationError || submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Full Name"
            name="full_name"
            placeholder="John Doe"
            value={formData.full_name}
            onChange={handleChange}
            leftIcon={<User size={18} />}
            required
          />

          <Input 
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail size={18} />}
            required
          />
          
          <div className="grid sm:grid-cols-2 gap-6">
            <Input 
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              leftIcon={<Lock size={18} />}
              required
            />
            
            <Input 
              label="Confirm Password"
              type="password"
              name="confirm_password"
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={handleChange}
              leftIcon={<Lock size={18} />}
              required
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              className="w-full h-14 text-lg"
              isLoading={isLoading || isRegistering}
            >
              Create Account
            </Button>
            <p className="text-xs text-center text-muted mt-4">
              By subscribing, you agree to our Terms of Service & Privacy Policy.
              You will be redirected to setup your subscription.
            </p>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-border/50 text-center">
          <p className="text-muted">
            Already a member?{' '}
            <Link to="/login" className="text-accent hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
