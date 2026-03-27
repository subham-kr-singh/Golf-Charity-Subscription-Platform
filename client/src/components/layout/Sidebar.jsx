import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Target, Zap, Heart, 
  CreditCard, Trophy, User, Shield, ArrowLeft, X, BarChart3, Users
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/auth.store';
import { useUIStore } from '../../store/ui.store';
import { Badge } from '../ui/Badge';

export function Sidebar({ isAdminConfig = false }) {
  const location = useLocation();
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Scores', path: '/dashboard/scores', icon: Target },
    { name: 'Monthly Draw', path: '/dashboard/draw', icon: Zap },
    { name: 'My Charity', path: '/dashboard/charity', icon: Heart },
    { name: 'Subscription', path: '/dashboard/subscription', icon: CreditCard },
    { name: 'My Winnings', path: '/dashboard/winnings', icon: Trophy },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Draws', path: '/admin/draws', icon: Zap },
    { name: 'Charities', path: '/admin/charities', icon: Heart },
    { name: 'Winners', path: '/admin/winners', icon: Trophy },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  const links = isAdminConfig ? adminLinks : userLinks;

  const NavItem = ({ name, path, icon: Icon }) => {
    // Match exact or prefix for active state
    const isActive = location.pathname === path || (path !== '/dashboard' && path !== '/admin' && location.pathname.startsWith(path));
    
    return (
      <Link to={path}>
        <motion.div 
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group relative overflow-hidden",
            isActive ? "bg-accent/10 text-white" : "text-muted hover:bg-surface-2 hover:text-white"
          )}
          whileHover={{ x: 4 }}
        >
          {isActive && (
            <motion.div layoutId="activeNav" className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full" />
          )}
          <Icon size={20} className={isActive ? "text-accent" : "text-muted group-hover:text-white transition-colors"} />
          <span className="font-medium text-sm">{name}</span>
        </motion.div>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface border-r border-border bg-opacity-95 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/favicon.svg" alt="Logo" className="w-6 h-6" />
          <span className="font-heading font-extrabold text-lg text-text tracking-tight">GolfGives</span>
        </Link>
        <button onClick={toggleSidebar} className="lg:hidden text-muted hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {links.map(link => <NavItem key={link.path} {...link} />)}

        {!isAdminConfig && user?.is_admin && (
          <>
            <div className="my-4 border-t border-border" />
            <Link to="/admin">
              <motion.div 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-500 hover:bg-surface-2 transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Shield size={20} className="text-amber-500/70 group-hover:text-amber-500" />
                <span className="font-medium text-sm">Admin Panel</span>
                <Badge variant="warning" size="sm" className="ml-auto bg-transparent border-amber-500/30">PRO</Badge>
              </motion.div>
            </Link>
          </>
        )}

        {isAdminConfig && (
          <>
            <div className="my-4 border-t border-border" />
            <Link to="/dashboard">
              <motion.div 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-surface-2 hover:text-white transition-colors group"
                whileHover={{ x: 4 }}
              >
                <ArrowLeft size={20} className="text-muted group-hover:text-white transition-colors" />
                <span className="font-medium text-sm">Back to Dashboard</span>
              </motion.div>
            </Link>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0 transition-all duration-300 relative z-20">
        <div className="fixed top-0 bottom-0 w-64">
           {sidebarContent}
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={toggleSidebar}
            />
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }} 
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative w-64 h-full bg-surface shadow-2xl flex-shrink-0"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
