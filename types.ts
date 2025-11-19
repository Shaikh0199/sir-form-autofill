export enum Language {
  EN = 'en',
  HI = 'hi',
  GU = 'gu'
}

export enum AppStep {
  UPLOAD = 'upload',
  PROCESSING = 'processing',
  REVIEW = 'review',
  SUCCESS = 'success'
}

export interface SirFormData {
  fullName: string;
  relativeName: string;
  relationType: string;
  dob: string;
  age: string;
  gender: string;
  epicNumber: string;
  aadhaarNumber: string;
  mobileNumber: string;
  houseNumber: string;
  address: string;
  familyMembersCount: string;
}

export interface UploadedImage {
  id: string;
  type: 'form' | 'aadhaar' | 'voterId';
  data: string; // Base64
}

export interface Translation {
  title: string;
  subtitle: string;
  uploadTitle: string;
  uploadDesc: string;
  uploadBtn: string;
  processing: string;
  reviewTitle: string;
  reviewDesc: string;
  downloadBtn: string;
  resetBtn: string;
  labels: {
    fullName: string;
    relativeName: string;
    relationType: string;
    dob: string;
    age: string;
    gender: string;
    epicNumber: string;
    aadhaarNumber: string;
    mobileNumber: string;
    houseNumber: string;
    address: string;
    familyMembersCount: string;
  };
}
