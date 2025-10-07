
import React from 'react';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="text-center animate-fade-in-up">
      <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
        AI Poster Generator
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8">
        I'll help you create a professional poster for social media. Let's start!
      </p>
      <button
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
      >
        Let's Start!
      </button>
    </div>
  );
};

export default WelcomeStep;
