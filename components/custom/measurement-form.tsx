// ============================================
// MEASUREMENT FIELDS
// ============================================

export interface MeasurementField {
  id: string;
  label: string;
  placeholder?: string;
  unit?: string;
  required?: boolean;
  hint?: string;
}

export const measurementFields: MeasurementField[] = [
  { id: "neck", label: "Neck", placeholder: "e.g. 15.5", unit: "in", required: true, hint: "Around the base of your neck, one finger loose." },
  { id: "chest", label: "Chest", placeholder: "e.g. 40", unit: "in", required: true, hint: "Around the fullest part of your chest." },
  { id: "waist", label: "Waist", placeholder: "e.g. 34", unit: "in", required: true, hint: "Around your natural waistline." },
  { id: "hip", label: "Hip", placeholder: "e.g. 40", unit: "in", required: true, hint: "Around the fullest part of your hips." },
  { id: "shoulder", label: "Shoulder Width", placeholder: "e.g. 18", unit: "in", required: true, hint: "Shoulder point to shoulder point across your back." },
  { id: "sleeve", label: "Sleeve Length", placeholder: "e.g. 25", unit: "in", required: true, hint: "From shoulder point to wrist bone." },
  { id: "jacketLength", label: "Jacket Length", placeholder: "e.g. 30", unit: "in", required: false, hint: "From base of neck to jacket hem." },
  { id: "trouserWaist", label: "Trouser Waist", placeholder: "e.g. 34", unit: "in", required: false, hint: "Where you wear your trousers." },
  { id: "inseam", label: "Inseam", placeholder: "e.g. 32", unit: "in", required: false, hint: "From crotch to ankle bone." },
  { id: "thigh", label: "Thigh", placeholder: "e.g. 24", unit: "in", required: false, hint: "Around the fullest part of your thigh." },
  { id: "height", label: "Height", placeholder: "e.g. 70", unit: "in", required: true, hint: "Without shoes." },
  { id: "weight", label: "Weight", placeholder: "e.g. 170", unit: "lbs", required: false, hint: "Optional, helps us gauge fit." },
];
