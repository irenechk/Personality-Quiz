import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-accent-600 opacity-20 blur-xl rounded-full animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-accent-500 animate-spin relative z-10" />
      </div>
      <h2 className="text-2xl font-display font-bold text-white">Analyzing Your Psyche...</h2>
      <div className="flex flex-col items-center space-y-2 text-gray-400">
        <p>Constructing psychological profile...</p>
        <p>Scanning cinema database...</p>
        <p>Generating matching visualization...</p>
      </div>
    </div>
  );
};
