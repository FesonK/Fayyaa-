/**
 * Nutrient Bar Component
 * Shows nutrient value with progress bar
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface NutrientBarProps {
  label: string;
  value: number;
  unit: string;
  percentage?: number; // 0-100, percentage of daily target
  color?: string;
}

export const NutrientBar: React.FC<NutrientBarProps> = ({
  label,
  value,
  unit,
  percentage,
  color = theme.colors.primary,
}) => {
  const displayPercentage = percentage !== undefined ? Math.min(percentage, 100) : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value.toFixed(1)} {unit}
          {displayPercentage !== undefined && (
            <Text style={styles.percentage}> ({displayPercentage}%)</Text>
          )}
        </Text>
      </View>
      {displayPercentage !== undefined && (
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              {
                width: `${displayPercentage}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  value: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  percentage: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  barContainer: {
    height: 6,
    backgroundColor: theme.colors.backgroundTertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
});
