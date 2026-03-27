import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from 'framer-motion';

export function Modal({ isOpen, onClose, title, size = 'md', children }) {
  const prefersReducedMotion = useReducedMotion();

  const sizes = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl"
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  className={cn("w-full bg-surface border border-border shadow-card rounded-card relative overflow-hidden", sizes[size])}
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <Dialog.Title className="text-xl font-heading font-bold text-text">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="text-muted hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent">
                        <X size={20} />
                        <span className="sr-only">Close</span>
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
