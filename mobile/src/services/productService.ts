/**
 * Product Service - Mock implementation
 * In production, this will call the backend API
 */

import { Product, HealthGrade, BodyImpact } from '../types/product';

// Mock product database
const mockProducts: Record<string, Product> = {
  '7622300441753': {
    // Oreo cookies
    id: '1',
    barcode: '7622300441753',
    name: 'Oreo Original Cookies',
    brand: 'Nabisco',
    category: 'Cookies & Snacks',
    imageUrl: 'https://images.openfoodfacts.org/images/products/762/230/044/1753/front_en.jpg',
    nutrientsPer100g: {
      energyKcal: 480,
      proteinG: 4.7,
      fatG: 20.5,
      carbG: 68.1,
      fiberG: 3.2,
      sugarG: 38.7,
      saturatedFatG: 7.5,
      sodiumMg: 450,
    },
    servingSizeG: 34,
    ratingScore: 25,
    ratingGrade: 'E',
    ratingReason: 'High in sugar, saturated fat, and ultra-processed ingredients',
    isUltraProcessed: true,
    flags: [
      {
        code: 'HIGH_SUGAR',
        type: 'warning',
        label: 'Very high sugar',
        severity: 'high',
      },
      {
        code: 'ULTRA_PROCESSED',
        type: 'warning',
        label: 'Ultra-processed food',
        severity: 'medium',
      },
      {
        code: 'HIGH_SAT_FAT',
        type: 'warning',
        label: 'High saturated fat',
        severity: 'medium',
      },
    ],
    bodyImpacts: [
      {
        system: 'heart',
        impact: 'negative',
        score: 30,
        reason: 'High saturated fat and sugar can increase cardiovascular risk',
        icon: 'heart',
      },
      {
        system: 'energy',
        impact: 'negative',
        score: 35,
        reason: 'High sugar causes energy spikes and crashes',
        icon: 'flash',
      },
      {
        system: 'skin',
        impact: 'negative',
        score: 40,
        reason: 'Excess sugar may contribute to skin inflammation',
        icon: 'hand-left',
      },
      {
        system: 'digestion',
        impact: 'neutral',
        score: 55,
        reason: 'Low fiber content, minimal digestive benefits',
        icon: 'nutrition',
      },
    ],
    allergens: ['Wheat', 'Soy'],
    ingredients: [
      'Sugar',
      'Enriched Flour',
      'Palm Oil',
      'Cocoa',
      'High Fructose Corn Syrup',
      'Leavening',
      'Salt',
      'Soy Lecithin',
      'Chocolate',
      'Artificial Flavor',
    ],
  },

  '5449000000996': {
    // Coca-Cola
    id: '2',
    barcode: '5449000000996',
    name: 'Coca-Cola',
    brand: 'The Coca-Cola Company',
    category: 'Beverages',
    imageUrl: 'https://images.openfoodfacts.org/images/products/544/900/000/0996/front_en.jpg',
    nutrientsPer100g: {
      energyKcal: 42,
      proteinG: 0,
      fatG: 0,
      carbG: 10.6,
      fiberG: 0,
      sugarG: 10.6,
      saturatedFatG: 0,
      sodiumMg: 10,
    },
    servingSizeG: 330,
    ratingScore: 20,
    ratingGrade: 'E',
    ratingReason: 'Very high sugar content with no nutritional value',
    isUltraProcessed: true,
    flags: [
      {
        code: 'HIGH_SUGAR',
        type: 'warning',
        label: 'Very high sugar',
        severity: 'high',
      },
      {
        code: 'NO_FIBER',
        type: 'warning',
        label: 'No fiber',
        severity: 'low',
      },
      {
        code: 'EMPTY_CALORIES',
        type: 'warning',
        label: 'Empty calories',
        severity: 'medium',
      },
    ],
    bodyImpacts: [
      {
        system: 'energy',
        impact: 'negative',
        score: 25,
        reason: 'Rapid sugar spike followed by energy crash',
        icon: 'flash',
      },
      {
        system: 'heart',
        impact: 'negative',
        score: 30,
        reason: 'Excessive sugar intake linked to heart disease',
        icon: 'heart',
      },
      {
        system: 'brain',
        impact: 'negative',
        score: 35,
        reason: 'Sugar crash can affect focus and mood',
        icon: 'bulb',
      },
    ],
    allergens: [],
    ingredients: ['Carbonated Water', 'Sugar', 'Caramel Color', 'Phosphoric Acid', 'Natural Flavors', 'Caffeine'],
  },

  '737628064502': {
    // Avocado (example of healthy food)
    id: '3',
    barcode: '737628064502',
    name: 'Fresh Avocado',
    brand: 'Fresh Produce',
    category: 'Fruits & Vegetables',
    imageUrl: 'https://images.openfoodfacts.org/images/products/737/628/064/502/front_en.jpg',
    nutrientsPer100g: {
      energyKcal: 160,
      proteinG: 2,
      fatG: 15,
      carbG: 9,
      fiberG: 7,
      sugarG: 0.7,
      saturatedFatG: 2.1,
      sodiumMg: 7,
      vitaminC: 10,
      vitaminD: 0,
      potassium: 485,
    },
    servingSizeG: 150,
    ratingScore: 95,
    ratingGrade: 'A',
    ratingReason: 'Excellent source of healthy fats, fiber, and nutrients',
    isUltraProcessed: false,
    flags: [
      {
        code: 'HIGH_FIBER',
        type: 'positive',
        label: 'High in fiber',
      },
      {
        code: 'HEALTHY_FATS',
        type: 'positive',
        label: 'Healthy fats',
      },
      {
        code: 'NUTRIENT_RICH',
        type: 'positive',
        label: 'Nutrient-rich',
      },
      {
        code: 'WHOLE_FOOD',
        type: 'positive',
        label: 'Whole food',
      },
    ],
    bodyImpacts: [
      {
        system: 'heart',
        impact: 'positive',
        score: 90,
        reason: 'Monounsaturated fats support heart health',
        icon: 'heart',
      },
      {
        system: 'brain',
        impact: 'positive',
        score: 85,
        reason: 'Healthy fats and folate support cognitive function',
        icon: 'bulb',
      },
      {
        system: 'skin',
        impact: 'positive',
        score: 88,
        reason: 'Vitamins and healthy fats promote healthy skin',
        icon: 'hand-left',
      },
      {
        system: 'digestion',
        impact: 'positive',
        score: 92,
        reason: 'High fiber aids digestive health',
        icon: 'nutrition',
      },
      {
        system: 'energy',
        impact: 'positive',
        score: 80,
        reason: 'Provides sustained energy without sugar spikes',
        icon: 'flash',
      },
    ],
    allergens: [],
    description: 'Fresh, ripe avocado rich in heart-healthy monounsaturated fats',
  },

  '5000159484695': {
    // Kellogg's Corn Flakes
    id: '4',
    barcode: '5000159484695',
    name: 'Corn Flakes',
    brand: "Kellogg's",
    category: 'Breakfast Cereals',
    nutrientsPer100g: {
      energyKcal: 370,
      proteinG: 7,
      fatG: 0.9,
      carbG: 84,
      fiberG: 3,
      sugarG: 8,
      saturatedFatG: 0.2,
      sodiumMg: 900,
      iron: 8,
    },
    servingSizeG: 30,
    ratingScore: 55,
    ratingGrade: 'C',
    ratingReason: 'Moderate nutrition, high in sodium and added sugar',
    isUltraProcessed: true,
    flags: [
      {
        code: 'HIGH_SODIUM',
        type: 'warning',
        label: 'High in sodium',
        severity: 'medium',
      },
      {
        code: 'ADDED_SUGAR',
        type: 'warning',
        label: 'Contains added sugar',
        severity: 'low',
      },
      {
        code: 'FORTIFIED',
        type: 'positive',
        label: 'Vitamin fortified',
      },
    ],
    bodyImpacts: [
      {
        system: 'energy',
        impact: 'neutral',
        score: 60,
        reason: 'Quick energy from carbs, but may not sustain',
        icon: 'flash',
      },
      {
        system: 'heart',
        impact: 'neutral',
        score: 50,
        reason: 'Low fat but high sodium may affect blood pressure',
        icon: 'heart',
      },
      {
        system: 'digestion',
        impact: 'neutral',
        score: 55,
        reason: 'Moderate fiber content',
        icon: 'nutrition',
      },
    ],
    allergens: ['Wheat', 'Barley'],
  },

  '4011': {
    // Banana (PLU code)
    id: '5',
    barcode: '4011',
    name: 'Banana',
    brand: 'Fresh Produce',
    category: 'Fruits & Vegetables',
    nutrientsPer100g: {
      energyKcal: 89,
      proteinG: 1.1,
      fatG: 0.3,
      carbG: 23,
      fiberG: 2.6,
      sugarG: 12,
      saturatedFatG: 0.1,
      sodiumMg: 1,
      vitaminC: 8.7,
      potassium: 358,
    },
    servingSizeG: 118,
    ratingScore: 88,
    ratingGrade: 'A',
    ratingReason: 'Excellent source of potassium and natural energy',
    isUltraProcessed: false,
    flags: [
      {
        code: 'HIGH_POTASSIUM',
        type: 'positive',
        label: 'High in potassium',
      },
      {
        code: 'NATURAL_SUGARS',
        type: 'positive',
        label: 'Natural sugars',
      },
      {
        code: 'WHOLE_FOOD',
        type: 'positive',
        label: 'Whole food',
      },
    ],
    bodyImpacts: [
      {
        system: 'heart',
        impact: 'positive',
        score: 85,
        reason: 'Potassium helps regulate blood pressure',
        icon: 'heart',
      },
      {
        system: 'energy',
        impact: 'positive',
        score: 88,
        reason: 'Natural sugars provide quick, sustained energy',
        icon: 'flash',
      },
      {
        system: 'digestion',
        impact: 'positive',
        score: 80,
        reason: 'Good fiber content aids digestion',
        icon: 'nutrition',
      },
      {
        system: 'muscle',
        impact: 'positive',
        score: 82,
        reason: 'Potassium supports muscle function',
        icon: 'fitness',
      },
    ],
    allergens: [],
    description: 'Fresh banana, perfect natural energy source',
  },
};

/**
 * Simulates API call to lookup product by barcode
 */
export const lookupProductByBarcode = async (barcode: string): Promise<Product | null> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return mockProducts[barcode] || null;
};

/**
 * Helper to get grade color
 */
export const getGradeColor = (grade: HealthGrade): string => {
  const gradeColors = {
    A: '#10B981',
    B: '#84CC16',
    C: '#F59E0B',
    D: '#F97316',
    E: '#EF4444',
  };
  return gradeColors[grade];
};

/**
 * Helper to calculate nutrient percentage vs daily target
 */
export const calculateNutrientPercentage = (
  current: number,
  target: number
): number => {
  return Math.min(Math.round((current / target) * 100), 100);
};
