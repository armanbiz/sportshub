import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We're working hard to bring you this feature. Stay tuned!
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-neon-green hover:bg-neon-green/90 text-white/90"
          >
            Go Back
          </Button>
        </AnimatedSection>
      </div>
    </div>
  );
}