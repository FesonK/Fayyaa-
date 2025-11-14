/**
 * Product and nutrition type definitions
 */

export type HealthGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export type NutrientStatus = 'low' | 'adequate' | 'high';

export type BodySystem =
  | 'heart'
  | 'brain'
  | 'energy'
  | 'digestion'
  | 'skin'
  | 'muscle'
  | 'immune';

export type ImpactLevel = 'positive' | 'neutral' | 'negative';

export interface NutrientProfile {
  energyKcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  fiberG: number;
  sugarG: number;
  saturatedFatG: number;
  sodiumMg: number;
  // Micronutrients
  vitaminC?: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
}

export interface BodyImpact {
  system: BodySystem;
  impact: ImpactLevel;
  score: number; // 0-100
  reason: string;
  icon: string; // icon name
}

export interface ProductFlag {
  code: string;
  type: 'warning' | 'positive';
  label: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand?: string;
  category: string;
  imageUrl?: string;

  // Nutritional data
  nutrientsPer100g: NutrientProfile;
  servingSizeG?: number;

  // Rating
  ratingScore: number; // 0-100
  ratingGrade: HealthGrade;
  ratingReason: string;

  // Flags
  isUltraProcessed: boolean;
  flags: ProductFlag[];

  // Body impact
  bodyImpacts: BodyImpact[];

  // Allergens
  allergens: string[];

  // Additional info
  ingredients?: string[];
  description?: string;
}

export interface DailyTarget {
  nutrient: string;
  current: number;
  target: number;
  unit: string;
  percentage: number; // 0-100+
  status: NutrientStatus;
}
