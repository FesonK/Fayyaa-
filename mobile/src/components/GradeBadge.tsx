/**
 * Grade Badge Component
 * Shows A-E health rating with color coding
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HealthGrade } from '../types/product';
import { theme } from '../theme';

interface GradeBadgeProps {
  grade: HealthGrade;
  score: number;
  size?: 'small' | 'large';
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({ grade, score, size = 'large' }) => {
  const getGradeColor = () => {
    switch (grade) {
      case 'A':
        return theme.colors.gradeA;
      case 'B':
        return theme.colors.gradeB;
      case 'C':
        return theme.colors.gradeC;
      case 'D':
        return theme.colors.gradeD;
      case 'E':
        return theme.colors.gradeE;
    }
  };

  const isLarge = size === 'large';

  return (
    <View style={[styles.container, isLarge && styles.containerLarge]}>
      <View
        style={[
          styles.gradeBadge,
          { backgroundColor: getGradeColor() },
          isLarge && styles.gradeBadgeLarge,
        ]}
      >
        <Text style={[styles.gradeText, isLarge && styles.gradeTextLarge]}>{grade}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, isLarge && styles.scoreTextLarge]}>{score}</Text>
        <Text style={[styles.scoreLabel, isLarge && styles.scoreLabelLarge]}>/ 100</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  containerLarge: {
    gap: theme.spacing.sm,
  },
  gradeBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.md,
  },
  gradeBadgeLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  gradeText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverse,
  },
  gradeTextLarge: {
    fontSize: theme.typography.fontSize['3xl'],
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  scoreText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  scoreTextLarge: {
    fontSize: theme.typography.fontSize.xl,
  },
  scoreLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  scoreLabelLarge: {
    fontSize: theme.typography.fontSize.base,
  },
});
