import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/auth.store';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Charities', path: '/charities' }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        isScrolled ? "glass bg-bg/80 border-b border-border shadow-md" : "bg-transparent py-2"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <img src="/favicon.svg" alt="GolfGives Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="font-heading font-extrabold text-xl tracking-tight text-text">GolfGives</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className="text-sm font-medium text-muted hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>Log Out</Button>
                  <Avatar fallback={user.full_name} size="sm" />
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm" className="relative group overflow-hidden">
                      <span className="relative z-10">Subscribe</span>
                      <div className="absolute inset-0 block bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="text-muted hover:text-white p-2"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl flex flex-col pt-20 px-6 pb-6"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-muted hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-6 text-xl font-heading font-bold mt-8">
              {links.map(link => (
                <Link key={link.path} to={link.path} className="text-white hover:text-accent border-b border-border pb-4">
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" className="text-accent border-b border-border pb-4">Dashboard</Link>
                  <button onClick={logout} className="text-left text-danger">Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-muted hover:text-white border-b border-border pb-4">Log In</Link>
                  <Link to="/register">
                    <Button variant="primary" className="w-full mt-4">Subscribe Now</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
