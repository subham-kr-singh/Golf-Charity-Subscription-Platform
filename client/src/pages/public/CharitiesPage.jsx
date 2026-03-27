import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useCharities } from '../../hooks/useCharity';
import { CharityGrid } from '../../components/charity/CharityGrid';
import { Input } from '../../components/ui/Input';
import { useDebounce } from '../../lib/useDebounce';

export function CharitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const { data: charities, isLoading } = useCharities({ search: debouncedSearch });

  return (
    <div className="flex-1 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight">
            Causes We <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">Champion</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Every subscription helps fund these incredible organizations. Browse our charity partners, read about their impact, and select the cause you want to support.
          </p>
        </motion.div>

        <div className="mb-12 max-w-md">
          <Input 
            placeholder="Search charities..." 
            leftIcon={<Search size={20} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 text-lg bg-surface/50 backdrop-blur-md"
          />
        </div>

        <CharityGrid charities={charities?.data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
