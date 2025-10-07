
import React, { useState } from 'react';
import { ContentData } from '../types';
import StepNavigation from './StepNavigation';

interface ContentStepProps {
  onNext: (data: ContentData) => void;
  onBack: () => void;
  initialData: ContentData;
}

const InputField: React.FC<{id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, required?: boolean}> = ({ id, label, value, onChange, placeholder, required }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
);

const ContentStep: React.FC<ContentStepProps> = ({ onNext, onBack, initialData }) => {
  const [data, setData] = useState<ContentData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl animate-fade-in w-full">
      <h2 className="text-3xl font-bold text-center mb-2">Poster Content</h2>
      <p className="text-gray-400 text-center mb-8">What message do you want to convey?</p>
      <form onSubmit={handleSubmit}>
        <InputField id="headline" label="Main Headline / Title" value={data.headline} onChange={handleChange} placeholder="e.g., Grand Opening Sale" required />
        <InputField id="cta" label="Key Message or Call-to-Action" value={data.cta} onChange={handleChange} placeholder="e.g., Get 50% Off Today!" required />
        <InputField id="subtitle" label="Subtitle or Description" value={data.subtitle} onChange={handleChange} placeholder="Optional: A short, catchy description" />
        <InputField id="brandName" label="Brand Name or Logo Text" value={data.brandName} onChange={handleChange} placeholder="Optional: Your Company Name" />
        <InputField id="additionalText" label="Any Additional Text" value={data.additionalText} onChange={handleChange} placeholder="Optional: Website, date, location, etc." />
        <StepNavigation onBack={onBack} />
      </form>
    </div>
  );
};

export default ContentStep;
