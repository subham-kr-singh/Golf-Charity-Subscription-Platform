import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/favicon.svg" alt="GolfGives Logo" className="w-8 h-8 opacity-80" />
              <span className="font-heading font-extrabold text-xl tracking-tight text-white/90">GolfGives</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Combining golf performance with genuine charitable impact. Every score counts, every subscription gives.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-white tracking-wide uppercase text-sm">Platform</h4>
            <div className="flex flex-col gap-3">
              <Link to="/how-it-works" className="text-muted hover:text-white text-sm transition-colors">How It Works</Link>
              <Link to="/charities" className="text-muted hover:text-white text-sm transition-colors">Charities</Link>
              <Link to="/login" className="text-muted hover:text-white text-sm transition-colors">Sign In</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-white tracking-wide uppercase text-sm">Impact</h4>
            <p className="text-muted text-sm leading-relaxed max-w-xs italic border-l-2 border-accent-2 pl-3 py-1">
              "A portion of every subscription goes directly to a registered charity of your choice."
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} GolfGives. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-muted text-sm cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="text-muted text-sm cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
