"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const WelcomeVideoOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
      // Set timer to show overlay after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark user as having visited
        localStorage.setItem('hasVisitedBefore', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl w-full p-0 bg-background border border-border">
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 text-foreground hover:bg-background transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar video</span>
          </button>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
              Bienvenido
            </h2>
            
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-AzSGmQe8fM?autoplay=1&rel=0"
                title="Video de bienvenida"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeVideoOverlay;