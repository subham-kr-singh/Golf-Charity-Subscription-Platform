import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -top-[400px] -right-[200px] mix-blend-screen opacity-50" />
        <div className="absolute w-[600px] h-[600px] bg-accent-2/20 rounded-full blur-[100px] top-[20%] -left-[200px] mix-blend-screen opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            className="flex flex-col items-start gap-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-glow-cyan" />
              <span className="text-xs font-bold tracking-widest text-white uppercase">Subscribe to make an impact</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
              Elevate Your Game. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">
                Elevate Their Lives.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed">
              Join the elite golf community where your monthly subscription funds charities you care about and enters you into our massive monthly prize draws.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg group">
                  <span className="mr-2">Join the Club</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14">
                  Discover How
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt={`Member ${i}`} className="w-10 h-10 rounded-full border-2 border-bg" />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Join 2,500+ golfers</span>
                <span className="text-muted text-xs">making a true impact</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hidden lg:block relative h-[600px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent rounded-3xl border border-accent/20 backdrop-blur-sm overflow-hidden transform perspective-1000 rotateY-[-10deg] rotateX-[5deg] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cfaa23a?auto=format&fit=crop&q=80" 
                alt="Golf Swing" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            </div>
            
            <motion.div 
              className="absolute -right-12 top-20 glass p-4 rounded-xl border border-white/10 shadow-xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs text-muted mb-1 font-bold uppercase tracking-wider">Donation Match</p>
              <p className="text-2xl font-heading font-black text-accent-3">£14,500</p>
            </motion.div>
            
            <motion.div 
              className="absolute -left-12 bottom-32 glass p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="text-xs text-muted mb-1 font-bold uppercase tracking-wider">Next Prize</p>
                <p className="text-lg font-heading font-bold text-white">Titleist TSR3</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
