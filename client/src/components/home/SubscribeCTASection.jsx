import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function SubscribeCTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-20 rounded-[3rem] border border-accent/20 shadow-glow-cyan"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">
            Ready to Make Your Mark?
          </h2>
          <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
            Join GolfGives today. Support amazing causes, log your scores, and win spectacular prizes every single month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <Link to="/register">
              <Button size="lg" className="h-16 px-10 text-xl w-full sm:w-auto">
                Subscribe for £15/mo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted mt-6 uppercase tracking-widest font-bold">Cancel anytime. No lock-in.</p>
        </motion.div>
      </div>
    </section>
  );
}
