import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Button } from './Button';
import { Pencil, X, Check, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface QuizScreenProps {
  question: Question;
  currentNumber: number;
  totalQuestions: number;
  onAnswer: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onJumpTo: (index: number) => void;
  userName: string;
  selectedAnswer?: string;
  answers: Record<number, string>;
  activeQuestions: Question[];
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ 
  question, 
  currentNumber, 
  totalQuestions, 
  onAnswer,
  onPrevious,
  onNext,
  onJumpTo,
  userName,
  selectedAnswer,
  answers,
  activeQuestions
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customAnswer, setCustomAnswer] = useState('');
  const [reaction, setReaction] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset local state when question changes
  useEffect(() => {
    setIsCustomMode(false);
    setCustomAnswer('');
    setReaction(null);
    setIsTransitioning(false);
  }, [question.id]);

  const handleOptionClick = (value: string, reactionText?: string) => {
    if (isTransitioning) return;
    
    // Show reaction if available
    if (reactionText) {
      setReaction(reactionText);
      setIsTransitioning(true);
      
      // Delay moving to next step to show reaction
      setTimeout(() => {
        onAnswer(value);
      }, 1200);
    } else {
      // Immediate move if no reaction (e.g. custom answer)
      onAnswer(value);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAnswer.trim()) {
      handleOptionClick(`Custom Answer: ${customAnswer.trim()}`, "Chaotic neutral vibes 🎲");
    }
  };

  const imageUrl = `https://image.pollinations.ai/prompt/cinematic%20dark%20moody%20${encodeURIComponent(question.imageKeyword)}%20atmospheric%20lighting?width=800&height=450&nologo=true`;

  return (
    <div className="max-w-3xl mx-auto w-full p-4 md:p-6 fade-in flex flex-col justify-center min-h-[80vh] relative">
      
      {/* Gen Z Reaction Overlay */}
      {reaction && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-300">
           <div className="bg-accent-600/90 backdrop-blur-md text-white px-8 py-6 rounded-3xl shadow-2xl transform rotate-[-2deg] border-4 border-white/20 max-w-sm text-center">
             <div className="flex justify-center mb-2">
                <MessageCircle size={32} className="fill-white text-white" />
             </div>
             <p className="text-2xl font-bold font-display leading-tight">{reaction}</p>
           </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-gray-400 mb-2 text-xs md:text-sm uppercase tracking-wider font-semibold">
          <span>Question {currentNumber} / {totalQuestions}</span>
          <span className="text-accent-500">Processing: {userName}</span>
        </div>
        <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden border border-dark-700">
          <div 
            className="bg-gradient-to-r from-accent-600 to-indigo-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${(currentNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl overflow-hidden shadow-2xl mb-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
        
        {/* Graphic Image Header */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden bg-dark-900">
          <img 
            src={imageUrl} 
            alt="Question Visualization" 
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight shadow-black drop-shadow-lg">
              {question.text}
            </h2>
          </div>
        </div>

        <div className="p-6">
          {!isCustomMode ? (
            <div className="grid gap-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === option.value;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option.value, option.reaction)}
                    disabled={isTransitioning}
                    className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 group relative overflow-hidden
                      ${isSelected 
                        ? 'bg-accent-600/20 border-accent-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                        : 'bg-dark-900/50 border-dark-700 hover:border-accent-500 hover:bg-dark-700/80'
                      } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-colors
                         ${isSelected
                           ? 'border-accent-500 text-white bg-accent-500'
                           : 'border-gray-600 text-gray-400 group-hover:border-accent-500 group-hover:text-accent-500 bg-dark-800'
                         }`}>
                        {isSelected ? <Check size={16} /> : String.fromCharCode(65 + idx)}
                      </span>
                      <span className={`text-base md:text-lg font-medium ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
              
              <button 
                onClick={() => setIsCustomMode(true)}
                disabled={isTransitioning}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-accent-400 transition-colors py-2"
              >
                <Pencil size={14} />
                <span>None of these fit? Write your own answer</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                Your Answer
              </label>
              <textarea
                value={customAnswer}
                onChange={(e) => setCustomAnswer(e.target.value)}
                placeholder="Describe what you would do..."
                className="w-full bg-dark-900 border border-dark-600 rounded-xl p-4 text-white focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none min-h-[120px] resize-none mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={() => setIsCustomMode(false)}>
                  <X size={18} /> Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1 flex items-center justify-center gap-2" disabled={!customAnswer.trim()}>
                  <Check size={18} /> Confirm Answer
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Navigation & Jump Bar */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <Button 
            variant="secondary" 
            onClick={onPrevious} 
            disabled={currentNumber === 1 || isTransitioning}
            className="flex items-center gap-2 px-6"
          >
            <ChevronLeft size={18} /> Prev
          </Button>

          {selectedAnswer && (
            <Button 
              variant="primary" 
              onClick={onNext}
              disabled={isTransitioning}
              className="flex items-center gap-2 px-8 animate-in fade-in zoom-in duration-300"
            >
              {currentNumber === totalQuestions ? 'Finish' : 'Next'} <ChevronRight size={18} />
            </Button>
          )}
        </div>

        {/* Question Dots Navigator */}
        <div className="flex justify-center gap-2 flex-wrap px-4 py-2 bg-dark-800/30 rounded-full border border-dark-700/50 backdrop-blur-sm">
           {activeQuestions.map((q, idx) => {
             const isAnswered = !!answers[q.id];
             const isCurrent = idx === currentNumber - 1;
             return (
               <button
                 key={q.id}
                 onClick={() => onJumpTo(idx)}
                 disabled={isTransitioning}
                 className={`w-3 h-3 rounded-full transition-all duration-300 
                   ${isCurrent ? 'bg-accent-500 scale-125' : 
                     isAnswered ? 'bg-indigo-500 hover:bg-accent-400' : 'bg-dark-600 hover:bg-dark-500'}
                 `}
                 title={`Question ${idx + 1}`}
               />
             );
           })}
        </div>
      </div>
    </div>
  );
};