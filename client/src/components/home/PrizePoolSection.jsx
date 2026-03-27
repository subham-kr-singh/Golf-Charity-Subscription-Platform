import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useCountUp } from '../../lib/useCountUp';

export function PrizePoolSection() {
  const currentPool = useCountUp(12500, 2);

  return (
    <section className="py-24 relative overflow-hidden bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6"
          >
            This Month's Prize Pool
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-3/20 blur-xl rounded-full" />
              <div className="font-heading font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-accent-3 via-amber-200 to-accent-3 relative z-10 drop-shadow-lg">
                £{currentPool.toLocaleString()}
              </div>
            </div>
            <p className="text-accent-3/80 font-bold uppercase tracking-widest mt-4">Est. Total Value</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { match: "5 Numbers", label: "Monthly Jackpot", prize: "40%", glow: "gold" },
            { match: "4 Numbers", label: "Major Prizes", prize: "35%", glow: "violet" },
            { match: "3 Numbers", label: "Minor Prizes", prize: "25%", glow: "cyan" }
          ].map((tier, i) => (
            <motion.div
              key={tier.match}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card glow={tier.glow} className="text-center h-full flex flex-col justify-center items-center p-8 bg-surface/50 backdrop-blur-xl border-border/50">
                <h3 className="font-heading font-bold text-2xl text-white mb-2">{tier.match}</h3>
                <p className="text-muted text-sm uppercase tracking-wider mb-6">{tier.label}</p>
                <div className="text-4xl font-black text-white">{tier.prize}</div>
                <p className="text-muted text-xs mt-2">of the prize pool</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
