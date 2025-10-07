import React, { useState } from 'react';
import { StyleData } from '../types';
import StepNavigation from './StepNavigation';
import { STYLE_PREFERENCES, COLOR_SCHEMES, BACKGROUND_OPTIONS } from '../constants';

interface StyleStepProps {
  onNext: (data: StyleData) => void;
  onBack: () => void;
  initialData: StyleData;
}

const OptionButton: React.FC<{label: string, isSelected: boolean, onClick: () => void}> = ({ label, isSelected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
        }`}
    >
        {label}
    </button>
);

const StyleStep: React.FC<StyleStepProps> = ({ onNext, onBack, initialData }) => {
  const [data, setData] = useState<StyleData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOptionClick = (field: keyof StyleData, value: string) => {
    setData(prev => ({...prev, [field]: value}));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, logoImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert('Please upload a valid PNG or JPG image.');
    }
  };

  const removeLogo = () => {
    setData(prev => ({ ...prev, logoImage: null }));
    const fileInput = document.getElementById('logoUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2">Visual Preferences</h2>
      <p className="text-gray-400 text-center mb-8">Define the look and feel of your poster.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-3">Style Preference</label>
          <div className="flex flex-wrap gap-2">
             {STYLE_PREFERENCES.map(style => (
                 <OptionButton key={style} label={style} isSelected={data.stylePreference === style} onClick={() => handleOptionClick('stylePreference', style)} />
             ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-3">Color Scheme</label>
           <div className="flex flex-wrap gap-2">
             {COLOR_SCHEMES.map(scheme => (
                 <OptionButton key={scheme} label={scheme} isSelected={data.colorScheme === scheme} onClick={() => handleOptionClick('colorScheme', scheme)} />
             ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-3">Background Style</label>
          <div className="flex flex-wrap gap-2">
             {BACKGROUND_OPTIONS.map(bg => (
                 <OptionButton key={bg} label={bg} isSelected={data.backgroundImage === bg} onClick={() => handleOptionClick('backgroundImage', bg)} />
             ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="imageRequirements" className="block text-gray-300 text-sm font-bold mb-2">Image/Graphic Requirements</label>
          <textarea
            id="imageRequirements"
            name="imageRequirements"
            value={data.imageRequirements}
            onChange={handleChange}
            placeholder="e.g., A photo of a coffee cup, abstract shapes, an illustration of a person working"
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <h3 className="text-xl font-bold mb-4 mt-8 border-b border-gray-600 pb-2">Brand Guidelines (Optional)</h3>
        
         <div className="my-6 bg-gray-700/50 p-4 rounded-lg">
            <label htmlFor="logoUpload" className="block text-gray-300 text-sm font-bold mb-2">Upload Logo</label>
            <div className="flex items-center gap-4">
                <input 
                    type="file" 
                    id="logoUpload" 
                    name="logoUpload" 
                    accept="image/png, image/jpeg"
                    onChange={handleLogoUpload}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" 
                />
                {data.logoImage && (
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <img src={data.logoImage} alt="Logo Preview" className="h-12 w-12 object-contain bg-white/10 rounded" />
                        <button type="button" onClick={removeLogo} title="Remove logo" className="bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brandColors" className="block text-gray-300 text-sm font-bold mb-2">Brand Colors</label>
              <input type="text" id="brandColors" name="brandColors" value={data.brandColors} onChange={handleChange} placeholder="e.g., #FF5733, navy blue" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label htmlFor="fontPreference" className="block text-gray-300 text-sm font-bold mb-2">Font Preferences</label>
              <input type="text" id="fontPreference" name="fontPreference" value={data.fontPreference} onChange={handleChange} placeholder="e.g., Sans-serif, bold, modern" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
        </div>
        <div className="mt-6">
            <label htmlFor="logoPlacement" className="block text-gray-300 text-sm font-bold mb-2">Logo Placement Requirements</label>
            <input type="text" id="logoPlacement" name="logoPlacement" value={data.logoPlacement} onChange={handleChange} placeholder="e.g., Bottom right corner" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        </div>
        
        <StepNavigation onBack={onBack} />
      </form>
    </div>
  );
};

export default StyleStep;