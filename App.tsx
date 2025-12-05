import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { QUESTIONS } from './constants';
import { QuizState, Question } from './types';
import { analyzePersonality, generateCharacterImage, generateFoodImage } from './services/geminiService';

const QUESTIONS_PER_SESSION = 10;

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentStep: 'welcome',
    userName: '',
    answers: {},
    result: null,
    characterImageUrl: null,
    foodImageUrl: null,
  });

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startQuiz = (name: string) => {
    // Randomize and select questions
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, QUESTIONS_PER_SESSION);
    
    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setState(prev => ({ 
      ...prev, 
      currentStep: 'quiz',
      userName: name,
      answers: {}, // Clear answers on start
      result: null,
      characterImageUrl: null,
      foodImageUrl: null
    }));
  };

  const handleAnswer = async (value: string) => {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const newAnswers = { ...state.answers, [currentQuestion.id]: value };
    
    setState(prev => ({ ...prev, answers: newAnswers }));

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish quiz
      setState(prev => ({ ...prev, answers: newAnswers, currentStep: 'analyzing' }));
      processResults(activeQuestions, newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    // Allows moving next without re-selecting if an answer exists
    if (currentQuestionIndex < activeQuestions.length - 1) {
       setCurrentQuestionIndex(prev => prev + 1);
    } else {
       // Finish if on last step
       setState(prev => ({ ...prev, currentStep: 'analyzing' }));
       processResults(activeQuestions, state.answers);
    }
  };

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const processResults = async (questions: Question[], answers: Record<number, string>) => {
    try {
      // 1. Analyze personality
      const result = await analyzePersonality(questions, answers, state.userName);
      
      // 2. Generate Images in parallel
      const imagePromises = [
        generateCharacterImage(result.characterName, result.movieTitle),
        generateFoodImage(result.foodMatch)
      ];

      // Use allSettled to allow partial success (e.g. if one image fails, we still show the other)
      const results = await Promise.allSettled(imagePromises);

      const characterImageUrl = results[0].status === 'fulfilled' ? results[0].value : null;
      const foodImageUrl = results[1].status === 'fulfilled' ? results[1].value : null;

      if (results[0].status === 'rejected') console.error("Character image failed:", results[0].reason);
      if (results[1].status === 'rejected') console.error("Food image failed:", results[1].reason);

      setState(prev => ({
        ...prev,
        currentStep: 'result',
        result: result,
        characterImageUrl: characterImageUrl,
        foodImageUrl: foodImageUrl
      }));
    } catch (error) {
      console.error("Analysis failed", error);
      alert("There was an error analyzing your results. Please check your API key and try again.");
      setState(prev => ({ ...prev, currentStep: 'welcome' }));
    }
  };

  const resetQuiz = () => {
    setState({
      currentStep: 'welcome',
      userName: '',
      answers: {},
      result: null,
      characterImageUrl: null,
      foodImageUrl: null
    });
    setCurrentQuestionIndex(0);
    setActiveQuestions([]);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-body selection:bg-accent-500 selection:text-white">
      <main className="container mx-auto px-4 py-8">
        
        {state.currentStep !== 'welcome' && (
          <header className="mb-8 flex justify-between items-center px-2 border-b border-dark-800 pb-4">
            <h1 className="text-xl font-display font-bold text-gray-500">PsychoCineMatch</h1>
            {state.userName && (
              <span className="text-sm font-semibold text-accent-500 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/20">
                Subject: {state.userName}
              </span>
            )}
          </header>
        )}

        {state.currentStep === 'welcome' && (
          <WelcomeScreen onStart={startQuiz} />
        )}

        {state.currentStep === 'quiz' && activeQuestions.length > 0 && (
          <QuizScreen 
            question={activeQuestions[currentQuestionIndex]}
            currentNumber={currentQuestionIndex + 1}
            totalQuestions={activeQuestions.length}
            onAnswer={handleAnswer}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onJumpTo={handleJumpTo}
            userName={state.userName}
            selectedAnswer={state.answers[activeQuestions[currentQuestionIndex].id]}
            answers={state.answers}
            activeQuestions={activeQuestions}
          />
        )}

        {state.currentStep === 'analyzing' && (
          <LoadingScreen />
        )}

        {state.currentStep === 'result' && state.result && (
          <ResultScreen 
            result={state.result} 
            imageUrl={state.characterImageUrl}
            foodImageUrl={state.foodImageUrl}
            onReset={resetQuiz}
            userName={state.userName}
          />
        )}

      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-xs text-dark-700 bg-dark-900/80 backdrop-blur-sm z-50">
        &copy; {new Date().getFullYear()} PsychoCineMatch. All rights reserved.
      </footer>
    </div>
  );
};

export default App;