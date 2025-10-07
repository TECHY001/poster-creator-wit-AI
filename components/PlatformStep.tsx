
import React, { useState } from 'react';
import { PlatformData, Format } from '../types';
import { PLATFORMS } from '../constants';
import StepNavigation from './StepNavigation';

interface PlatformStepProps {
  onNext: (data: PlatformData) => void;
  onBack: () => void;
  initialData: PlatformData;
}

const PlatformStep: React.FC<PlatformStepProps> = ({ onNext, onBack, initialData }) => {
  const [selectedPlatformName, setSelectedPlatformName] = useState<string>(initialData.platformName);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(initialData.format);

  const selectedPlatform = PLATFORMS.find(p => p.name === selectedPlatformName);

  const handlePlatformSelect = (name: string) => {
    setSelectedPlatformName(name);
    setSelectedFormat(null); // Reset format when platform changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatformName && selectedFormat) {
      onNext({ platformName: selectedPlatformName, format: selectedFormat });
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2">Platform Selection</h2>
      <p className="text-gray-400 text-center mb-8">Where will you be posting this?</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-gray-300 text-sm font-bold mb-4">1. Choose your platform:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PLATFORMS.map(platform => (
              <button
                type="button"
                key={platform.name}
                onClick={() => handlePlatformSelect(platform.name)}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
                  selectedPlatformName === platform.name
                    ? 'border-blue-500 bg-blue-900/50 scale-105'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600'
                }`}
              >
                <platform.icon className="h-8 w-8 mb-2" />
                <span className="text-sm font-semibold">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedPlatform && (
          <div className="mb-8 animate-fade-in-up">
            <label className="block text-gray-300 text-sm font-bold mb-4">2. Which format do you need?</label>
            <div className="flex flex-wrap gap-3">
              {selectedPlatform.formats.map(format => (
                <button
                  type="button"
                  key={format.name}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedFormat?.name === format.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {format.name} <span className="text-gray-400 text-xs">({format.width}x{format.height})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <StepNavigation onBack={onBack} nextDisabled={!selectedFormat} />
      </form>
    </div>
  );
};

export default PlatformStep;
