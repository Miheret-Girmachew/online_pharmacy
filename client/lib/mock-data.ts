// 1. Dummy Medicines (20 Items)
export const DUMMY_MEDICINES = [
  // Page 1
  { 
    id: '1', 
    name: 'Paracetamol 500mg', 
    description: 'Effective pain relief and fever reducer.', 
    price: 5.00, 
    stock: 120, 
    image: '💊', 
    requiresPrescription: false 
  },
  { 
    id: '2', 
    name: 'Amoxicillin 250mg', 
    description: 'Broad-spectrum antibiotic for bacterial infections.', 
    price: 12.50, 
    stock: 45, 
    image: '🧪', 
    requiresPrescription: true 
  },
  { 
    id: '3', 
    name: 'Vitamin C 1000mg', 
    description: 'Immune system booster with Zinc.', 
    price: 8.00, 
    stock: 200, 
    image: '🍊', 
    requiresPrescription: false 
  },
  { 
    id: '4', 
    name: 'Ibuprofen 400mg', 
    description: 'Anti-inflammatory for pain and swelling.', 
    price: 6.50, 
    stock: 15, // Low Stock Check
    image: '⚡', 
    requiresPrescription: false 
  },
  { 
    id: '5', 
    name: 'Insulin Glargine', 
    description: 'Long-acting insulin for diabetes management.', 
    price: 45.00, 
    stock: 8, // Very Low Stock Check
    image: '💉', 
    requiresPrescription: true 
  },
  { 
    id: '6', 
    name: 'Cetirizine (Allergy)', 
    description: 'Relief from hay fever and allergy symptoms.', 
    price: 7.25, 
    stock: 80, 
    image: '🌿', 
    requiresPrescription: false 
  },

  // Page 2
  { 
    id: '7', 
    name: 'Azithromycin 500mg', 
    description: 'Strong antibiotic for respiratory infections.', 
    price: 25.00, 
    stock: 30, 
    image: '🧬', 
    requiresPrescription: true 
  },
  { 
    id: '8', 
    name: 'Omeprazole 20mg', 
    description: 'Treats acid reflux and heartburn.', 
    price: 10.00, 
    stock: 100, 
    image: '🧊', 
    requiresPrescription: false 
  },
  { 
    id: '9', 
    name: 'Metformin 500mg', 
    description: 'First-line medication for Type 2 Diabetes.', 
    price: 18.50, 
    stock: 60, 
    image: '🩸', 
    requiresPrescription: true 
  },
  { 
    id: '10', 
    name: 'Salbutamol Inhaler', 
    description: 'Reliever inhaler for asthma attacks.', 
    price: 35.00, 
    stock: 5, // Low Stock Check
    image: '💨', 
    requiresPrescription: true 
  },
  { 
    id: '11', 
    name: 'Multivitamin Complex', 
    description: 'Daily supplement with Iron and B12.', 
    price: 15.00, 
    stock: 150, 
    image: '🥗', 
    requiresPrescription: false 
  },
  { 
    id: '12', 
    name: 'First Aid Bandages', 
    description: 'Sterile adhesive bandages for cuts.', 
    price: 3.50, 
    stock: 300, 
    image: '🩹', 
    requiresPrescription: false 
  },

  // Page 3
  { 
    id: '13', 
    name: 'Amlodipine 5mg', 
    description: 'Medication for high blood pressure.', 
    price: 14.00, 
    stock: 90, 
    image: '❤️', 
    requiresPrescription: true 
  },
  { 
    id: '14', 
    name: 'Diclofenac Gel', 
    description: 'Topical pain relief for joints/muscles.', 
    price: 9.75, 
    stock: 25, 
    image: '🧴', 
    requiresPrescription: false 
  },
  { 
    id: '15', 
    name: 'Cough Syrup (Honey)', 
    description: 'Soothing relief for dry coughs.', 
    price: 11.00, 
    stock: 40, 
    image: '🍯', 
    requiresPrescription: false 
  },
  { 
    id: '16', 
    name: 'Atorvastatin 10mg', 
    description: 'Lowers cholesterol and heart risk.', 
    price: 22.00, 
    stock: 55, 
    image: '📉', 
    requiresPrescription: true 
  },
  { 
    id: '17', 
    name: 'Oral Rehydration Salts', 
    description: 'Restores fluids and electrolytes.', 
    price: 2.00, 
    stock: 500, 
    image: '💧', 
    requiresPrescription: false 
  },
  { 
    id: '18', 
    name: 'Doxycycline 100mg', 
    description: 'Antibiotic for skin conditions/malaria.', 
    price: 20.00, 
    stock: 12, 
    image: '🦠', 
    requiresPrescription: true 
  },

  // Page 4
  { 
    id: '19', 
    name: 'Digital Thermometer', 
    description: 'Fast and accurate body temperature check.', 
    price: 60.00, 
    stock: 20, 
    image: '🌡️', 
    requiresPrescription: false 
  },
  { 
    id: '20', 
    name: 'Prednisolone 5mg', 
    description: 'Steroid for allergies and inflammation.', 
    price: 8.50, 
    stock: 35, 
    image: '💊', 
    requiresPrescription: true 
  },
];

// 2. Dummy Orders
export const DUMMY_ORDERS = [
  { id: 'ORD-7782', status: 'delivered', total: 15.50, date: '2025-10-15' },
  { id: 'ORD-9921', status: 'shipped', total: 45.00, date: '2025-11-20' },
  { id: 'ORD-1004', status: 'processing', total: 112.00, date: '2025-11-21' },
];

// 3. Helper to simulate delay (Async)
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));