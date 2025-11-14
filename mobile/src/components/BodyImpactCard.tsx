/**
 * Body Impact Card Component
 * Shows how a product affects a specific body system
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BodyImpact } from '../types/product';
import { theme } from '../theme';

interface BodyImpactCardProps {
  impact: BodyImpact;
}

export const BodyImpactCard: React.FC<BodyImpactCardProps> = ({ impact }) => {
  const getSystemConfig = () => {
    const configs = {
      heart: {
        color: theme.colors.heart,
        icon: 'heart-pulse' as const,
        label: 'Heart Health',
      },
      brain: {
        color: theme.colors.brain,
        icon: 'brain' as const,
        label: 'Brain & Focus',
      },
      energy: {
        color: theme.colors.energy,
        icon: 'lightning-bolt' as const,
        label: 'Energy',
      },
      digestion: {
        color: theme.colors.digestion,
        icon: 'stomach' as const,
        label: 'Digestion',
      },
      skin: {
        color: theme.colors.skin,
        icon: 'face-woman' as const,
        label: 'Skin & Beauty',
      },
      muscle: {
        color: theme.colors.muscle,
        icon: 'arm-flex' as const,
        label: 'Muscle',
      },
      immune: {
        color: theme.colors.immune,
        icon: 'shield-plus' as const,
        label: 'Immune',
      },
    };

    return configs[impact.system];
  };

  const getImpactStyle = () => {
    switch (impact.impact) {
      case 'positive':
        return { color: theme.colors.success, emoji: '✓' };
      case 'negative':
        return { color: theme.colors.error, emoji: '!' };
      case 'neutral':
        return { color: theme.colors.textSecondary, emoji: '−' };
    }
  };

  const config = getSystemConfig();
  const impactStyle = getImpactStyle();

  return (
    <View style={[styles.container, { borderLeftColor: config.color }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
          <MaterialCommunityIcons name={config.icon} size={24} color={config.color} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.label}>{config.label}</Text>
          <View style={styles.impactBadge}>
            <View
              style={[
                styles.impactIndicator,
                { backgroundColor: impactStyle.color },
              ]}
            >
              <Text style={styles.impactEmoji}>{impactStyle.emoji}</Text>
            </View>
            <Text
              style={[
                styles.impactText,
                { color: impactStyle.color },
              ]}
            >
              {impact.impact === 'positive'
                ? 'Positive'
                : impact.impact === 'negative'
                ? 'Negative'
                : 'Neutral'}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.reason}>{impact.reason}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderLeftWidth: 4,
    ...theme.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  impactIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  impactEmoji: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverse,
  },
  impactText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  reason: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },
});
