// 1. Dummy Medicines
export const DUMMY_MEDICINES = [
  { id: '1', name: 'Paracetamol 500mg', description: 'Effective pain relief and fever reducer.', price: 5.00, stock: 120, image: '💊' },
  { id: '2', name: 'Amoxicillin 250mg', description: 'Antibiotic used to treat bacterial infections.', price: 12.50, stock: 45, image: '🧪' },
  { id: '3', name: 'Vitamin C 1000mg', description: 'Immune system booster with Zinc.', price: 8.00, stock: 200, image: '🍊' },
  { id: '4', name: 'Ibuprofen 400mg', description: 'Anti-inflammatory for pain and swelling.', price: 6.50, stock: 15, image: '⚡' },
  { id: '5', name: 'Insulin Glargine', description: 'Long-acting insulin for diabetes management.', price: 45.00, stock: 8, image: '💉' },
  { id: '6', name: 'Cetirizine (Allergy)', description: 'Relief from hay fever and allergy symptoms.', price: 7.25, stock: 80, image: '🌿' },
];

// 2. Dummy Orders
export const DUMMY_ORDERS = [
  { id: 'ORD-7782', status: 'delivered', total: 15.50, date: '2025-10-15' },
  { id: 'ORD-9921', status: 'shipped', total: 45.00, date: '2025-11-20' },
];

// 3. Helper to simulate delay (Async)
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));