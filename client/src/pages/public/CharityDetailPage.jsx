import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import { useCharityDetail } from '../../hooks/useCharity';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { NotFoundPage } from './NotFoundPage';

export function CharityDetailPage() {
  const { slug } = useParams();
  const { data: response, isLoading, isError } = useCharityDetail(slug);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !response?.data) {
    return <NotFoundPage />;
  }

  const charity = response.data;

  return (
    <div className="flex-1 py-12 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/charities" className="inline-flex items-center gap-2 text-muted hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Charities</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl"
        >
          <div className="h-64 sm:h-80 md:h-[400px] w-full relative">
            <img 
              src={charity.image_url || 'https://images.unsplash.com/photo-1593113554625-5460f782c5f1?auto=format&fit=crop&q=80'} 
              alt={charity.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              {charity.featured && (
                <Badge variant="info" className="mb-4 backdrop-blur-md bg-accent/20 border-accent/30 font-bold tracking-wider">
                  FEATURED PARTNER
                </Badge>
              )}
              <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-2 leading-tight">
                {charity.name}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-white/90 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                {charity.description}
              </p>
              
              {charity.website_url && (
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-muted">
                    <Globe className="text-accent" size={24} />
                    <span>Official Website</span>
                  </div>
                  <a href={charity.website_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" rightIcon={<ExternalLink size={16} />}>
                      Visit Website
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
