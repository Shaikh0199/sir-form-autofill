import { Language, SirFormData, Translation } from './types';

export const INITIAL_FORM_DATA: SirFormData = {
  fullName: '',
  relativeName: '',
  relationType: '',
  dob: '',
  age: '',
  gender: '',
  epicNumber: '',
  aadhaarNumber: '',
  mobileNumber: '',
  houseNumber: '',
  address: '',
  familyMembersCount: ''
};

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    title: 'SIR Form Auto-Fill',
    subtitle: 'Upload documents to auto-fill your form',
    uploadTitle: 'Upload Documents',
    uploadDesc: 'Take a photo of your Blank SIR Form, Aadhaar Card, and Voter ID.',
    uploadBtn: 'Select / Take Photo',
    processing: 'Scanning documents with AI...',
    reviewTitle: 'Review Details',
    reviewDesc: 'Please check the details below and edit if necessary.',
    downloadBtn: 'Download PDF',
    resetBtn: 'Start Over',
    labels: {
      fullName: 'Full Name',
      relativeName: 'Relative Name (Father/Husband)',
      relationType: 'Relation Type',
      dob: 'Date of Birth',
      age: 'Age',
      gender: 'Gender',
      epicNumber: 'EPIC No. (Voter ID)',
      aadhaarNumber: 'Aadhaar Number',
      mobileNumber: 'Mobile Number',
      houseNumber: 'House No.',
      address: 'Full Address',
      familyMembersCount: 'Total Family Members'
    }
  },
  [Language.HI]: {
    title: 'SIR फॉर्म ऑटो-फिल',
    subtitle: 'अपना फॉर्म भरने के लिए दस्तावेज़ अपलोड करें',
    uploadTitle: 'दस्तावेज़ अपलोड करें',
    uploadDesc: 'अपने SIR फॉर्म, आधार कार्ड और वोटर आईडी की फोटो लें।',
    uploadBtn: 'फोटो चुनें / लें',
    processing: 'एआई के साथ स्कैन हो रहा है...',
    reviewTitle: 'विवरण जांचें',
    reviewDesc: 'कृपया नीचे दिए गए विवरणों की जांच करें और यदि आवश्यक हो तो सुधारें।',
    downloadBtn: 'PDF डाउनलोड करें',
    resetBtn: 'पुनः आरंभ करें',
    labels: {
      fullName: 'पूरा नाम',
      relativeName: 'रिश्तेदार का नाम (पिता/पति)',
      relationType: 'संबंध का प्रकार',
      dob: 'जन्म की तारीख',
      age: 'उम्र',
      gender: 'लिंग',
      epicNumber: 'EPIC नंबर (वोटर आईडी)',
      aadhaarNumber: 'आधार नंबर',
      mobileNumber: 'मोबाइल नंबर',
      houseNumber: 'मकान नंबर',
      address: 'पूरा पता',
      familyMembersCount: 'कुल परिवार के सदस्य'
    }
  },
  [Language.GU]: {
    title: 'SIR ફોર્મ ઓટો-ફિલ',
    subtitle: 'તમારું ફોર્મ ભરવા માટે દસ્તાવેજો અપલોડ કરો',
    uploadTitle: 'દસ્તાવેજો અપલોડ કરો',
    uploadDesc: 'તમારા SIR ફોર્મ, આધાર કાર્ડ અને મતદાર ઓળખપત્રનો ફોટો લો.',
    uploadBtn: 'ફોટો પસંદ કરો / લો',
    processing: 'AI સાથે સ્કેન થઈ રહ્યું છે...',
    reviewTitle: 'વિગતો તપાસો',
    reviewDesc: 'કૃપા કરીને નીચેની વિગતો તપાસો અને જો જરૂરી હોય તો સુધારો.',
    downloadBtn: 'PDF ડાઉનલોડ કરો',
    resetBtn: 'ફરી શરૂ કરો',
    labels: {
      fullName: 'પૂરું નામ',
      relativeName: 'સંબંધીનું નામ (પિતા/પતિ)',
      relationType: 'સંબંધનો પ્રકાર',
      dob: 'જન્મ તારીખ',
      age: 'ઉંમર',
      gender: 'જાતિ (Gender)',
      epicNumber: 'EPIC નંબર (મતદાર આઈડી)',
      aadhaarNumber: 'આધાર નંબર',
      mobileNumber: 'મોબાઇલ નંબર',
      houseNumber: 'ઘર નંબર',
      address: 'સરનામું',
      familyMembersCount: 'કુલ પરિવારના સભ્યો'
    }
  }
};
