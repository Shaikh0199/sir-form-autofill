import React from 'react';
import { ScanLine } from 'lucide-react';

interface Props {
  text: string;
}

export const ProcessingState: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-white p-10 rounded-xl shadow-sm border border-blue-100 flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
          <ScanLine className="w-10 h-10 text-blue-600" />
        </div>
        <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full w-20 h-20 animate-spin"></div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{text}</h3>
      <p className="text-gray-500 text-sm text-center max-w-xs">
        Using AI to read details from your Aadhaar and Voter ID...
      </p>
    </div>
  );
};
