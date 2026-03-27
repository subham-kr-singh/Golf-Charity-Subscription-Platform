import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl md:text-[120px] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-surface-2 opacity-50 mb-8">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">Out of Bounds</h2>
      <p className="text-muted text-lg max-w-md mb-8">
        We couldn't find the page you're looking for. It looks like your shot went a little wide.
      </p>
      <Link to="/">
        <Button size="lg">Return to Fairway</Button>
      </Link>
    </div>
  );
}
