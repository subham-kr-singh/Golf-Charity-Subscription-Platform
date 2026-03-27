import { motion } from 'framer-motion';
import { Target, Zap, Gift, Trophy, ShieldCheck, Heart } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function HowItWorksPage() {
  const steps = [
    {
      icon: Target,
      title: "1. Join & Subscribe",
      desc: "Sign up for £15/month. Instantly, 20% of your fee is directed to the charity of your choice."
    },
    {
      icon: Trophy,
      title: "2. Play Golf",
      desc: "Play your standard stroke play rounds at any verified golf course."
    },
    {
      icon: Zap,
      title: "3. Log Your Score",
      desc: "Submit your gross score. Our system validates it and places you into a performance bracket."
    },
    {
      icon: ShieldCheck,
      title: "4. Claim Your Numbers",
      desc: "Each bracket awards you 5 random numbers for the monthly algorithm draw."
    },
    {
      icon: Gift,
      title: "5. Win the Draw",
      desc: "On the 1st of every month, 5 numbers are drawn. Match 3, 4, or 5 numbers to win from the prize pool."
    },
    {
      icon: Heart,
      title: "6. Make an Impact",
      desc: "Regardless of whether you win, you're making a continuous, positive impact on a cause you love."
    }
  ];

  return (
    <div className="flex-1 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-6 tracking-tight"
          >
            Play. Submit. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">Win.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted leading-relaxed"
          >
            The simplest way to give back while enjoying the game you love. Here is your complete guide to the GolfGives ecosystem.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <step.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-[3rem] p-8 md:p-16 border border-border/50 shadow-2xl relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-2/10 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-40" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">Performance Brackets</h2>
              <p className="text-lg text-muted mb-8">
                Your performance matters. Better scores mean better odds, encouraging you to improve your game.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1"><Badge variant="success">Beginner</Badge></div>
                  <div>
                    <h4 className="text-white font-bold">Standard Odds</h4>
                    <p className="text-sm text-muted">Baseline odds for entering your score.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1"><Badge variant="info">Regular</Badge></div>
                  <div>
                    <h4 className="text-white font-bold">1.2x Multiplier</h4>
                    <p className="text-sm text-muted">A slight bump to odds for consistently solid play.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1"><Badge variant="warning">Excellent</Badge></div>
                  <div>
                    <h4 className="text-white font-bold">1.5x Multiplier</h4>
                    <p className="text-sm text-muted">High-performance odds for breaking personal records.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative h-64 md:h-full min-h-[400px] bg-surface-2 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535136124430-802c6762391b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-tr from-bg via-bg/80 to-transparent" />
              <div className="relative z-10 text-center">
                <Target size={64} className="mx-auto text-accent mb-6 opacity-80" />
                <h3 className="font-heading font-black text-3xl text-white mb-2">Practice Pays.</h3>
                <p className="text-accent-2 font-bold uppercase tracking-widest">Literally.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
