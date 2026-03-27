import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function CharityImpactSection() {
  return (
    <section className="py-24 bg-surface-2 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay [mask-image:linear-gradient(to_right,transparent,black)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-8">
              <Heart size={32} className="text-danger" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
              Empowering Communities,<br />One Swing at a Time.
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              We allocate 20% of every subscription directly to registered partner charities. You have the power to select which cause your membership supports from your dashboard.
            </p>
            <ul className="space-y-4 mb-8">
              {['100% verifiable donations', 'Direct partnerships with registered charities', 'Change your supported cause anytime'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <div className="relative h-[500px] hidden md:block">
            <div className="absolute inset-0 glass rounded-3xl border border-white/10 p-8 flex flex-col justify-between">
              <div className="text-muted text-sm font-bold uppercase tracking-widest text-right">Impact Report</div>
              <div className="flex-1 mt-8 relative">
                <div className="absolute bottom-0 w-1/4 h-[40%] bg-accent/40 rounded-t-xl" />
                <div className="absolute bottom-0 left-[30%] w-1/4 h-[60%] bg-accent-2/40 rounded-t-xl" />
                <div className="absolute bottom-0 left-[60%] w-1/4 h-[85%] bg-accent-3/40 rounded-t-xl" />
              </div>
              <div className="mt-8 pt-8 border-t border-border flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted font-bold uppercase">Total Donated</p>
                  <p className="text-3xl font-heading font-black text-white mt-1">£24,500+</p>
                </div>
                <div>
                  <p className="text-xs text-muted font-bold uppercase">Partner Charities</p>
                  <p className="text-3xl font-heading font-black text-white mt-1">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
