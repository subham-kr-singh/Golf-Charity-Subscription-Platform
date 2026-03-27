import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function CharitySelector({ charities, currentSelectionId, onSelect, isUpdating }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(currentSelectionId);

  const currentCharity = charities?.find(c => c.id === currentSelectionId);

  const handleSave = () => {
    if (selectedId && selectedId !== currentSelectionId) {
      onSelect(selectedId);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-6" glow="cyan">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center shrink-0">
            <Heart size={32} className={currentSelectionId ? "fill-danger" : ""} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Supported Cause</p>
            {currentCharity ? (
              <>
                <h3 className="text-xl font-heading font-bold text-white">{currentCharity.name}</h3>
                <p className="text-sm text-muted mt-1 w-full max-w-sm truncate">{currentCharity.description}</p>
              </>
            ) : (
              <h3 className="text-lg font-heading font-medium text-warning">No charity selected</h3>
            )}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto shrink-0"
        >
          {currentCharity ? 'Change Cause' : 'Select Cause'}
        </Button>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Select Supported Charity"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 py-4">
          <p className="text-sm text-muted mb-4">
            Select the organization that will receive the donation portion of your monthly subscription. You can change this at any time.
          </p>

          <div className="grid gap-3">
            {charities?.map(charity => (
              <motion.div
                key={charity.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedId(charity.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4
                  ${selectedId === charity.id 
                    ? 'bg-accent/10 border-accent shadow-[0_0_20px_rgba(var(--color-accent),0.2)]' 
                    : 'bg-surface-2 border-border hover:border-accent/50'
                  }`}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface">
                  {charity.image_url ? (
                    <img src={charity.image_url} alt={charity.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border border-border">
                      <Heart size={16} className="text-muted" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold truncate">{charity.name}</h4>
                    {charity.featured && <Badge variant="info" className="text-[10px] px-1.5 py-0 h-4">Featured</Badge>}
                  </div>
                  <p className="text-xs text-muted truncate mt-1">{charity.description}</p>
                </div>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors
                  ${selectedId === charity.id ? 'border-accent bg-accent text-bg' : 'border-muted/50'}
                `}>
                  {selectedId === charity.id && <Check size={14} />}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 flex justify-end gap-3 mt-4 border-t border-border/50">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button 
              variant="primary" 
              onClick={handleSave} 
              isLoading={isUpdating}
              disabled={!selectedId || selectedId === currentSelectionId}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
