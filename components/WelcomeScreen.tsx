import React, { useState } from 'react';
import { Button } from './Button';
import { Brain, Play, User } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 space-y-8 fade-in">
      <div className="relative">
        <div className="absolute -inset-4 bg-accent-600 opacity-20 blur-xl rounded-full"></div>
        <Brain className="relative w-24 h-24 text-accent-500" />
      </div>
      
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          PsychoCineMatch
        </h1>
        <p className="text-xl text-gray-400 font-light">
          Dive deep into your psyche. Answer 10 psychological questions to reveal your true inner self and discover which cinematic icon shares your soul.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md pt-8 space-y-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-500 group-focus-within:text-accent-500 transition-colors" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name, Subject"
            className="w-full bg-dark-800/50 border border-dark-600 text-white text-lg rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder:text-gray-600"
            autoFocus
          />
        </div>

        <Button 
          type="submit" 
          disabled={!name.trim()}
          className="text-lg px-8 py-4 flex items-center justify-center gap-2 w-full"
        >
          <Play size={20} />
          Start Analysis
        </Button>
      </form>
      
      <p className="text-sm text-gray-600 mt-12">
        Powered by Advanced AI Psychology Models
      </p>
    </div>
  );
};