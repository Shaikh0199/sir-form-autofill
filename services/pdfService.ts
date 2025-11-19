import { jsPDF } from "jspdf";
import { SirFormData, Language, Translation } from "../types";

export const generateSirPdf = (data: SirFormData, language: Language, translations: Translation) => {
  const doc = new jsPDF();
  
  // Setup font/styling
  // Note: Standard jsPDF doesn't support Indic scripts out of the box without loading custom fonts.
  // For this MVP, we will generate the PDF primarily in English data to ensure readability, 
  // or assume the device can render basic text. 
  // To keep it robust, we will use the English field labels in the PDF, 
  // but the content will be whatever is in the data (which might be English transliterated by Gemini).

  const margin = 20;
  let y = 20;

  // Header
  doc.setFontSize(18);
  doc.setTextColor(41, 128, 185); // Blue
  doc.text("SIR BLO Form - Digital Copy", margin, y);
  
  y += 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, y);
  
  y += 10;
  doc.setLineWidth(0.5);
  doc.line(margin, y, 190, y);
  y += 15;

  // Helper to add field
  const addField = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y);
    
    doc.setFont("helvetica", "normal");
    // Handle long text wrapping
    const splitValue = doc.splitTextToSize(value || "N/A", 100);
    doc.text(splitValue, margin + 60, y);
    
    y += (splitValue.length * 7) + 3;
  };

  // Fields
  addField("Full Name", data.fullName);
  addField("Relative Name", data.relativeName);
  addField("Relation Type", data.relationType);
  addField("Gender", data.gender);
  addField("Date of Birth", data.dob);
  addField("Age", data.age);
  
  y += 5; // Spacer
  
  addField("EPIC Number", data.epicNumber);
  addField("Aadhaar Number", data.aadhaarNumber);
  addField("Mobile Number", data.mobileNumber);
  
  y += 5; // Spacer

  addField("House Number", data.houseNumber);
  addField("Address", data.address);
  addField("Family Members", data.familyMembersCount);

  // Footer
  y = 280;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Generated via Instant SIR Form Auto-Fill", margin, y);

  // Save
  doc.save("SIR-BLO-Form.pdf");
};
