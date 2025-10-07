import React, { useState, useEffect, useCallback } from 'react';
import { FormData } from '../types';
import { generatePoster } from '../services/geminiService';

interface GenerationStepProps {
  formData: FormData;
  onRestart: () => void;
}

const loadingMessages = [
  "Gathering creative inspiration...",
  "Mixing the perfect color palette...",
  "Crafting your headline...",
  "Aligning visual elements...",
  "Finalizing your masterpiece...",
];

// A helper function to load an image from a data URL
const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };
  
// A helper function to composite the logo onto the poster
const compositeImages = async (posterSrc: string, logoSrc: string, placement: string): Promise<string> => {
    const posterImg = await loadImage(posterSrc);
    const logoImg = await loadImage(logoSrc);
  
    const canvas = document.createElement('canvas');
    canvas.width = posterImg.width;
    canvas.height = posterImg.height;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
  
    ctx.drawImage(posterImg, 0, 0);
  
    const maxLogoWidth = canvas.width * 0.20;
    const maxLogoHeight = canvas.height * 0.20;
    let logoWidth = logoImg.width;
    let logoHeight = logoImg.height;
    const ratio = logoWidth / logoHeight;
    
    if (logoWidth > maxLogoWidth) {
      logoWidth = maxLogoWidth;
      logoHeight = logoWidth / ratio;
    }
    if (logoHeight > maxLogoHeight) {
      logoHeight = maxLogoHeight;
      logoWidth = logoHeight * ratio;
    }
  
    const margin = canvas.width * 0.05;
    let x = 0, y = 0;
    
    placement = placement.toLowerCase();
  
    if (placement.includes('right')) {
      x = canvas.width - logoWidth - margin;
    } else if (placement.includes('left')) {
      x = margin;
    } else {
      x = (canvas.width - logoWidth) / 2;
    }
  
    if (placement.includes('bottom')) {
      y = canvas.height - logoHeight - margin;
    } else if (placement.includes('top')) {
      y = margin;
    } else {
      y = (canvas.height - logoHeight) / 2;
    }
  
    ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
  
    return canvas.toDataURL('image/jpeg', 0.95);
};

const RegenerateIcon: React.FC = () => (
    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.695v-2.257a2.25 2.25 0 00-2.25-2.25H12a2.25 2.25 0 00-2.25 2.25v2.257m12.138 2.695c-.528.92-1.236 1.744-2.138 2.43M5.136 14.695c-.88 1.13-1.558 2.44-2.035 3.822" />
    </svg>
);
const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const GenerationStep: React.FC<GenerationStepProps> = ({ formData, onRestart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const isInitialLoad = React.useRef(true);
  const [statusMessage, setStatusMessage] = useState('');

  const triggerGeneration = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      if (!isInitialLoad.current) {
        setStatusMessage('Regenerating your poster...');
      }
      const posterUrl = await generatePoster(formData);

      if (formData.style.logoImage) {
        setStatusMessage('Adding your logo...');
        const finalImage = await compositeImages(
          posterUrl,
          formData.style.logoImage,
          formData.style.logoPlacement
        );
        setGeneratedImage(finalImage);
      } else {
        setGeneratedImage(posterUrl);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
      isInitialLoad.current = false;
    }
  }, [formData]);

  useEffect(() => {
    triggerGeneration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let messageInterval: number | undefined;
    if (isLoading && isInitialLoad.current) {
      setStatusMessage(loadingMessages[0]);
      messageInterval = window.setInterval(() => {
        setCurrentMessageIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % loadingMessages.length;
            setStatusMessage(loadingMessages[nextIndex]);
            return nextIndex;
        });
      }, 2500);
    }
    return () => {
      if (messageInterval) {
        clearInterval(messageInterval);
      }
    };
  }, [isLoading]);

  if (isLoading && isInitialLoad.current) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Creating your poster...</h2>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto my-8"></div>
        <p className="text-gray-300 text-lg transition-opacity duration-500">{statusMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Generation Failed</h2>
        <p className="text-gray-300 mb-8">{error}</p>
        <button
          onClick={onRestart}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-4xl font-bold mb-6">Your Poster is Ready!</h2>
      {generatedImage && (
        <div className="mb-8">
          <img src={generatedImage} alt="Generated Poster" className="rounded-lg shadow-lg mx-auto max-h-[60vh]"/>
        </div>
      )}
      <div className="flex justify-center flex-wrap gap-4">
        <a 
          href={generatedImage || ''} 
          download="poster.jpeg"
          className={`inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Download Poster
        </a>
        <button
          onClick={triggerGeneration}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 flex items-center justify-center disabled:bg-purple-800 disabled:transform-none disabled:cursor-wait"
        >
          {isLoading ? <SpinnerIcon /> : <RegenerateIcon />}
          {isLoading ? 'Regenerating...' : 'Regenerate'}
        </button>
        <button
          onClick={onRestart}
          disabled={isLoading}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:transform-none"
        >
          Create Another
        </button>
      </div>
    </div>
  );
};

export default GenerationStep;