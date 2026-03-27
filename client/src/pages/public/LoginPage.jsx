import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    try {
      await login({ email, password });
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-[80vh] relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-bg via-bg to-accent/5 pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-md glass p-8 sm:p-10 rounded-2xl border border-border shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/favicon.svg" alt="Logo" className="w-12 h-12 mx-auto drop-shadow-glow" />
          </Link>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-muted">Sign in to your GolfGives account</p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-danger">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={18} />}
            required
          />
          
          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={18} />}
            required
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full h-12"
            isLoading={isLoggingIn}
          >
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent hover:text-white transition-colors font-medium">
            Subscribe Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
