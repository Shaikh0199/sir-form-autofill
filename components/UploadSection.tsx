import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedImage, Translation } from '../types';

interface Props {
  onImagesSelected: (images: UploadedImage[]) => void;
  uploadedImages: UploadedImage[];
  onRemoveImage: (id: string) => void;
  onProcess: () => void;
  t: Translation;
}

export const UploadSection: React.FC<Props> = ({
  onImagesSelected,
  uploadedImages,
  onRemoveImage,
  onProcess,
  t,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: UploadedImage[] = [];
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push({
              id: Math.random().toString(36).substr(2, 9),
              type: 'form', // Defaulting to form, logic doesn't strictly strictly distinguish for extraction
              data: event.target.result as string,
            });
            // If we processed all files
            if (newImages.length === e.target.files!.length) {
               // Use a timeout to ensure React state updates correctly if rapid firing
               onImagesSelected(newImages);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
      <div className="text-center mb-8">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t.uploadTitle}</h2>
        <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
          {t.uploadDesc}
        </p>
      </div>

      {/* Image Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {uploadedImages.map((img) => (
            <div key={img.id} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img src={img.data} alt="Upload" className="w-full h-full object-cover" />
              <button
                onClick={() => onRemoveImage(img.id)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-90 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col space-y-3">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-3 px-4 bg-white border-2 border-dashed border-blue-300 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center justify-center gap-2"
        >
          <ImageIcon size={20} />
          {t.uploadBtn}
        </button>

        {uploadedImages.length > 0 && (
          <button
            onClick={onProcess}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
          >
            Scan & Auto-Fill
          </button>
        )}
      </div>
    </div>
  );
};
