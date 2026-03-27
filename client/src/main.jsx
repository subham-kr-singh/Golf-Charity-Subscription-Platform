import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { ShieldAlert } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="glass p-8 rounded-2xl max-w-md w-full border border-danger/50 text-center">
        <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-heading font-bold text-white mb-2">Platform Error</h2>
        <p className="text-muted text-sm mb-6 bg-surface p-4 rounded-xl text-left overflow-auto max-h-32 font-mono">
          {error.message}
        </p>
        <button 
          onClick={resetErrorBoundary}
          className="w-full py-3 bg-danger text-white rounded-xl font-bold hover:bg-danger/90 transition-colors shadow-glow-gold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
