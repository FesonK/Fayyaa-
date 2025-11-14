/**
 * Color palette for Fayyaa app
 * Health-focused, calming colors with clear visual hierarchy
 */

export const colors = {
  // Grade colors (for A-E rating)
  gradeA: '#10B981', // Emerald green - Excellent
  gradeB: '#84CC16', // Lime green - Good
  gradeC: '#F59E0B', // Amber - Moderate
  gradeD: '#F97316', // Orange - Poor
  gradeE: '#EF4444', // Red - Very Poor

  // Primary brand colors
  primary: '#10B981', // Emerald green
  primaryLight: '#6EE7B7',
  primaryDark: '#059669',

  // Secondary colors
  secondary: '#8B5CF6', // Purple
  secondaryLight: '#C4B5FD',
  secondaryDark: '#7C3AED',

  // Body system colors (for impact visualization)
  heart: '#EF4444', // Red
  brain: '#8B5CF6', // Purple
  energy: '#F59E0B', // Amber
  digestion: '#84CC16', // Lime
  skin: '#EC4899', // Pink
  muscle: '#3B82F6', // Blue
  immune: '#10B981', // Emerald

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Neutral colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',

  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Text colors
  text: '#111827', // Almost black
  textSecondary: '#6B7280', // Gray
  textTertiary: '#9CA3AF', // Light gray
  textInverse: '#FFFFFF',

  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Transparent
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
