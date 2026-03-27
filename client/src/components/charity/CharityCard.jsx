import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function CharityCard({ charity }) {
  return (
    <Link to={`/charities/${charity.slug}`}>
      <Card hover glow="cyan" className="h-full flex flex-col p-0">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={charity.image_url || 'https://images.unsplash.com/photo-1593113554625-5460f782c5f1?auto=format&fit=crop&q=80'} 
            alt={charity.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          {charity.featured && (
            <Badge variant="info" className="absolute top-4 left-4 backdrop-blur-md bg-accent/20 border-accent/30 font-bold tracking-wider">
              FEATURED
            </Badge>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-heading font-bold text-xl text-white mb-2 line-clamp-1">{charity.name}</h3>
          <p className="text-muted text-sm line-clamp-3 mb-6 flex-1">{charity.description}</p>
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">Learn More</span>
            <span className="text-muted text-lg">&rarr;</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
