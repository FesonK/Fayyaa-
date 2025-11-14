/**
 * Product Detail Screen
 * Shows detailed product information and body impact
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Product } from '../types/product';
import { theme } from '../theme';
import { GradeBadge } from '../components/GradeBadge';
import { BodyImpactCard } from '../components/BodyImpactCard';
import { FlagChip } from '../components/FlagChip';
import { NutrientBar } from '../components/NutrientBar';

interface ProductDetailScreenProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onClose,
}) => {
  const macroNutrients = [
    {
      label: 'Energy',
      value: product.nutrientsPer100g.energyKcal,
      unit: 'kcal',
      color: theme.colors.energy,
    },
    {
      label: 'Protein',
      value: product.nutrientsPer100g.proteinG,
      unit: 'g',
      color: theme.colors.muscle,
    },
    {
      label: 'Carbs',
      value: product.nutrientsPer100g.carbG,
      unit: 'g',
      color: theme.colors.warning,
    },
    {
      label: 'Fat',
      value: product.nutrientsPer100g.fatG,
      unit: 'g',
      color: theme.colors.secondary,
    },
  ];

  const keyNutrients = [
    {
      label: 'Fiber',
      value: product.nutrientsPer100g.fiberG,
      unit: 'g',
      percentage: (product.nutrientsPer100g.fiberG / 25) * 100, // 25g daily target
    },
    {
      label: 'Sugar',
      value: product.nutrientsPer100g.sugarG,
      unit: 'g',
      percentage: (product.nutrientsPer100g.sugarG / 50) * 100, // 50g daily limit
    },
    {
      label: 'Saturated Fat',
      value: product.nutrientsPer100g.saturatedFatG,
      unit: 'g',
      percentage: (product.nutrientsPer100g.saturatedFatG / 20) * 100, // 20g daily limit
    },
    {
      label: 'Sodium',
      value: product.nutrientsPer100g.sodiumMg,
      unit: 'mg',
      percentage: (product.nutrientsPer100g.sodiumMg / 2300) * 100, // 2300mg daily limit
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Header */}
        <View style={styles.productHeader}>
          {product.imageUrl && (
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
          )}
          <View style={styles.productInfo}>
            <Text style={styles.brand}>{product.brand || product.category}</Text>
            <Text style={styles.productName}>{product.name}</Text>
          </View>
        </View>

        {/* Health Grade */}
        <View style={styles.section}>
          <View style={styles.gradeContainer}>
            <GradeBadge grade={product.ratingGrade} score={product.ratingScore} />
            <View style={styles.gradeInfo}>
              <Text style={styles.sectionTitle}>Health Score</Text>
              <Text style={styles.ratingReason}>{product.ratingReason}</Text>
            </View>
          </View>
        </View>

        {/* Flags */}
        {product.flags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Information</Text>
            <View style={styles.flagsContainer}>
              {product.flags.map((flag, index) => (
                <FlagChip key={index} flag={flag} />
              ))}
            </View>
          </View>
        )}

        {/* Body Impact */}
        {product.bodyImpacts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Impact on Your Body</Text>
            <Text style={styles.sectionSubtitle}>
              How this product affects different systems
            </Text>
            <View style={styles.impactsContainer}>
              {product.bodyImpacts.map((impact, index) => (
                <BodyImpactCard key={index} impact={impact} />
              ))}
            </View>
          </View>
        )}

        {/* Macronutrients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition per 100g</Text>
          <View style={styles.macroGrid}>
            {macroNutrients.map((nutrient, index) => (
              <View key={index} style={styles.macroCard}>
                <View style={[styles.macroIcon, { backgroundColor: `${nutrient.color}15` }]}>
                  <Text style={[styles.macroValue, { color: nutrient.color }]}>
                    {nutrient.value.toFixed(0)}
                  </Text>
                </View>
                <Text style={styles.macroLabel}>{nutrient.label}</Text>
                <Text style={styles.macroUnit}>{nutrient.unit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Key Nutrients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Nutrients</Text>
          <View style={styles.nutrientsContainer}>
            {keyNutrients.map((nutrient, index) => (
              <NutrientBar
                key={index}
                label={nutrient.label}
                value={nutrient.value}
                unit={nutrient.unit}
                percentage={nutrient.percentage}
              />
            ))}
          </View>
        </View>

        {/* Allergens */}
        {product.allergens.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergens</Text>
            <View style={styles.allergensContainer}>
              {product.allergens.map((allergen, index) => (
                <View key={index} style={styles.allergenChip}>
                  <MaterialCommunityIcons
                    name="alert"
                    size={16}
                    color={theme.colors.warning}
                  />
                  <Text style={styles.allergenText}>{allergen}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Ingredients */}
        {product.ingredients && product.ingredients.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.ingredientsText}>{product.ingredients.join(', ')}</Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={{ height: theme.spacing['2xl'] }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
  },
  productHeader: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadow.sm,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.md,
  },
  productInfo: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  brand: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  section: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  gradeContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadow.sm,
  },
  gradeInfo: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  sectionSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  ratingReason: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  flagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  impactsContainer: {
    gap: theme.spacing.md,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  macroCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
    ...theme.shadow.sm,
  },
  macroIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  macroValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  macroLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  macroUnit: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  nutrientsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    ...theme.shadow.sm,
  },
  allergensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  allergenChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.warning}15`,
    borderWidth: 1,
    borderColor: theme.colors.warning,
  },
  allergenText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.warning,
  },
  ingredientsText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.relaxed,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
});
