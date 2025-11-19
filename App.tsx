import React, { useState, useEffect } from 'react';
import { 
  Language, 
  AppStep, 
  SirFormData, 
  UploadedImage,
  Translation 
} from './types';
import { INITIAL_FORM_DATA, TRANSLATIONS } from './constants';
import { extractFormData } from './services/geminiService';
import { generateSirPdf } from './services/pdfService';
import { LanguageSelector } from './components/LanguageSelector';
import { UploadSection } from './components/UploadSection';
import { FormReview } from './components/FormReview';
import { ProcessingState } from './components/ProcessingState';
import { FileText } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState<SirFormData>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  const t: Translation = TRANSLATIONS[language];

  // Reset state when language changes if in initial steps, 
  // but keep data if already extracted to allow verifying translation (conceptually, though labels change)
  useEffect(() => {
    document.title = t.title;
  }, [language, t.title]);

  const handleImagesSelected = (newImages: UploadedImage[]) => {
    setUploadedImages((prev) => [...prev, ...newImages]);
    setError(null);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleProcess = async () => {
    if (uploadedImages.length === 0) return;

    setStep(AppStep.PROCESSING);
    setError(null);

    try {
      const extractedData = await extractFormData(uploadedImages);
      setFormData(extractedData);
      setStep(AppStep.REVIEW);
    } catch (err) {
      console.error(err);
      setError("Failed to scan documents. Please ensure images are clear and try again.");
      setStep(AppStep.UPLOAD);
    }
  };

  const handleDownload = () => {
    generateSirPdf(formData, language, t);
    // Optional: setStep(AppStep.SUCCESS);
  };

  const handleReset = () => {
    setUploadedImages([]);
    setFormData(INITIAL_FORM_DATA);
    setStep(AppStep.UPLOAD);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-blue-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded text-white">
              <FileText size={20} />
            </div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              SIR Form <span className="text-blue-600">India</span>
            </h1>
          </div>
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {step === AppStep.UPLOAD ? 'Step 1/3' : step === AppStep.PROCESSING ? 'Step 2/3' : 'Step 3/3'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full p-4">
        
        {step === AppStep.UPLOAD && (
          <>
            <div className="text-center mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h2>
              <p className="text-gray-500">{t.subtitle}</p>
            </div>
            <LanguageSelector currentLang={language} setLanguage={setLanguage} />
          </>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        {step === AppStep.UPLOAD && (
          <UploadSection
            onImagesSelected={handleImagesSelected}
            uploadedImages={uploadedImages}
            onRemoveImage={handleRemoveImage}
            onProcess={handleProcess}
            t={t}
          />
        )}

        {step === AppStep.PROCESSING && (
          <ProcessingState text={t.processing} />
        )}

        {step === AppStep.REVIEW && (
          <FormReview
            formData={formData}
            setFormData={setFormData}
            onDownload={handleDownload}
            onReset={handleReset}
            t={t}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400">
        <p>© 2024 SIR Auto-Fill. Privacy Safe & Secure.</p>
        <p className="mt-1">No data is stored on servers.</p>
      </footer>
    </div>
  );
};

export default App;
