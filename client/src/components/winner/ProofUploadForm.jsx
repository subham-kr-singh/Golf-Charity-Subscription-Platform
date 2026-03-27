import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Upload, CheckCircle2 } from 'lucide-react';

export function ProofUploadForm({ winId, onSubmit, isSubmitting }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    
    const formData = new FormData();
    formData.append('proof_image', file);
    if (message) formData.append('message', message);
    
    onSubmit(formData);
  };

  return (
    <Card className="max-w-xl mx-auto border-dashed border-2">
      <div className="text-center mb-8">
        <h3 className="font-heading font-bold text-2xl text-white mb-2">Claim Your Prize</h3>
        <p className="text-muted">
          Upload a photo of yourself with your prize (or celebrating your win) to claim it. 
          This helps us maintain transparency and show the community real winners!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative border-2 border-dashed border-border rounded-2xl p-8 hover:bg-surface-2 transition-colors text-center cursor-pointer group overflow-hidden">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            required
          />
          
          {previewUrl ? (
            <div className="absolute inset-0 z-10 w-full h-full bg-surface">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 size={48} className="text-success mb-2" />
                <span className="text-white font-bold">Click to change image</span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-accent" />
              </div>
              <p className="text-white font-medium mb-1">Click to upload photo</p>
              <p className="text-xs text-muted">PNG, JPG or GIF (max. 5MB)</p>
            </div>
          )}
        </div>

        <Input 
          label="Optional Message"
          placeholder="Share your excitement with the community!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-bg border-none shadow-glow-gold"
          disabled={!file}
          isLoading={isSubmitting}
        >
          Submit Proof & Claim
        </Button>
      </form>
    </Card>
  );
}
