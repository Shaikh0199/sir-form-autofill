import React from 'react';
import { SirFormData, Translation } from '../types';
import { Download, RefreshCw } from 'lucide-react';

interface Props {
  formData: SirFormData;
  setFormData: (data: SirFormData) => void;
  onDownload: () => void;
  onReset: () => void;
  t: Translation;
}

export const FormReview: React.FC<Props> = ({
  formData,
  setFormData,
  onDownload,
  onReset,
  t,
}) => {
  const handleChange = (field: keyof SirFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const InputField = ({ 
    field, 
    label, 
    type = "text",
    half = false 
  }: { 
    field: keyof SirFormData; 
    label: string; 
    type?: string;
    half?: boolean;
  }) => (
    <div className={`${half ? 'col-span-1' : 'col-span-2'}`}>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 font-medium"
      />
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t.reviewTitle}</h2>
            <p className="text-gray-500 text-sm">{t.reviewDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField field="fullName" label={t.labels.fullName} />
          
          <InputField field="relativeName" label={t.labels.relativeName} />
          <InputField field="relationType" label={t.labels.relationType} half />
          <InputField field="gender" label={t.labels.gender} half />

          <InputField field="dob" label={t.labels.dob} half />
          <InputField field="age" label={t.labels.age} half />

          <div className="col-span-2 h-px bg-gray-100 my-2"></div>

          <InputField field="epicNumber" label={t.labels.epicNumber} />
          <InputField field="aadhaarNumber" label={t.labels.aadhaarNumber} />
          <InputField field="mobileNumber" label={t.labels.mobileNumber} />

          <div className="col-span-2 h-px bg-gray-100 my-2"></div>

          <InputField field="houseNumber" label={t.labels.houseNumber} half />
          <InputField field="familyMembersCount" label={t.labels.familyMembersCount} half />
          <InputField field="address" label={t.labels.address} />
        </div>
      </div>

      <div className="flex gap-3 pb-10">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          {t.resetBtn}
        </button>
        <button
          onClick={onDownload}
          className="flex-2 w-2/3 py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Download size={20} />
          {t.downloadBtn}
        </button>
      </div>
    </div>
  );
};
