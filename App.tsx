import React, { useState, useCallback } from 'react';
import { Step, FormData, ContentData, StyleData, PlatformData } from './types';
import WelcomeStep from './components/WelcomeStep';
import ContentStep from './components/ContentStep';
import StyleStep from './components/StyleStep';
import PlatformStep from './components/PlatformStep';
import GenerationStep from './components/GenerationStep';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.Welcome);
  const [formData, setFormData] = useState<FormData>({
    content: {
      headline: '',
      subtitle: '',
      cta: '',
      brandName: '',
      additionalText: '',
    },
    style: {
      colorScheme: 'Vibrant and energetic',
      stylePreference: 'Modern',
      imageRequirements: 'Abstract background graphics',
      backgroundImage: 'Subtle Gradient',
      brandColors: '',
      fontPreference: '',
      logoPlacement: 'Bottom right corner',
      logoImage: null,
    },
    platform: {
      platformName: '',
      format: null,
    },
  });

  const handleWelcomeNext = useCallback(() => {
    setStep(Step.Content);
  }, []);

  const handleContentNext = useCallback((data: ContentData) => {
    setFormData(prev => ({ ...prev, content: data }));
    setStep(Step.Style);
  }, []);

  const handleStyleNext = useCallback((data: StyleData) => {
    setFormData(prev => ({ ...prev, style: data }));
    setStep(Step.Platform);
  }, []);
  
  const handlePlatformNext = useCallback((data: PlatformData) => {
    setFormData(prev => ({ ...prev, platform: data }));
    setStep(Step.Generation);
  }, []);

  const handleBack = useCallback(() => {
    setStep(prev => Math.max(0, prev - 1));
  }, []);

  const handleRestart = useCallback(() => {
    setFormData({
      content: { headline: '', subtitle: '', cta: '', brandName: '', additionalText: '' },
      style: { colorScheme: 'Vibrant and energetic', stylePreference: 'Modern', imageRequirements: 'Abstract background graphics', backgroundImage: 'Subtle Gradient', brandColors: '', fontPreference: '', logoPlacement: 'Bottom right corner', logoImage: null },
      platform: { platformName: '', format: null },
    });
    setStep(Step.Welcome);
  }, []);

  const renderStep = () => {
    switch (step) {
      case Step.Welcome:
        return <WelcomeStep onNext={handleWelcomeNext} />;
      case Step.Content:
        return <ContentStep onNext={handleContentNext} onBack={handleBack} initialData={formData.content} />;
      case Step.Style:
        return <StyleStep onNext={handleStyleNext} onBack={handleBack} initialData={formData.style} />;
      case Step.Platform:
        return <PlatformStep onNext={handlePlatformNext} onBack={handleBack} initialData={formData.platform} />;
      case Step.Generation:
        return <GenerationStep formData={formData} onRestart={handleRestart} />;
      default:
        return <WelcomeStep onNext={handleWelcomeNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default App;