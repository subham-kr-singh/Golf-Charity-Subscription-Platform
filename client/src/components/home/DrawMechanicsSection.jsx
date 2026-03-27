import { motion } from 'framer-motion';
import { Target, Zap, Gift } from 'lucide-react';

export function DrawMechanicsSection() {
  const steps = [
    {
      icon: Target,
      title: "Play Your Round",
      desc: "Hit the course. Keep your score. The better you play, the better your chances."
    },
    {
      icon: Zap,
      title: "Log Your Score",
      desc: "Submit your total strokes on our platform. Your score determines your bracket and numbers."
    },
    {
      icon: Gift,
      title: "Win Big",
      desc: "Match your drawn numbers in the monthly algorithmic draw to win exclusive prizes and gear."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
            Your Game. Rewarded.
          </h2>
          <p className="text-lg text-muted">
            We've revolutionized golf rewards. Your verifiable scores directly generate your ticket numbers. Better golf equals better odds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.title}
              className="relative flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="w-24 h-24 rounded-full glass border border-accent/30 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-glow-cyan">
                <step.icon size={32} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">{step.title}</h3>
              <p className="text-muted leading-relaxed max-w-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
