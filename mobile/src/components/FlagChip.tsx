/**
 * Flag Chip Component
 * Shows warning or positive flags for products
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProductFlag } from '../types/product';
import { theme } from '../theme';

interface FlagChipProps {
  flag: ProductFlag;
}

export const FlagChip: React.FC<FlagChipProps> = ({ flag }) => {
  const getStyle = () => {
    if (flag.type === 'positive') {
      return {
        backgroundColor: `${theme.colors.success}15`,
        borderColor: theme.colors.success,
        textColor: theme.colors.success,
        icon: 'check-circle' as const,
      };
    }

    // Warning styles based on severity
    const severityColors = {
      high: theme.colors.error,
      medium: theme.colors.warning,
      low: theme.colors.info,
    };

    const color = severityColors[flag.severity || 'medium'];

    return {
      backgroundColor: `${color}15`,
      borderColor: color,
      textColor: color,
      icon: 'alert-circle' as const,
    };
  };

  const style = getStyle();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        },
      ]}
    >
      <MaterialCommunityIcons name={style.icon} size={14} color={style.textColor} />
      <Text style={[styles.text, { color: style.textColor }]}>{flag.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
  },
  text: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
