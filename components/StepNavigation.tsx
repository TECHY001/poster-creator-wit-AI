
import React from 'react';

interface StepNavigationProps {
  onBack: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ onBack, nextLabel = 'Next', nextDisabled = false }) => {
  return (
    <div className="flex justify-between items-center mt-10">
      <button
        type="button"
        onClick={onBack}
        className="text-gray-400 hover:text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        &larr; Back
      </button>
      <button
        type="submit"
        disabled={nextDisabled}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
      >
        {nextLabel} &rarr;
      </button>
    </div>
  );
};

export default StepNavigation;
