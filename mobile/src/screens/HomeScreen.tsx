/**
 * Home Screen
 * Main landing screen with quick scan button
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';

interface HomeScreenProps {
  onScanPress: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onScanPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="food-apple"
              size={64}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.title}>Fayyaa</Text>
          <Text style={styles.subtitle}>Your Nutrition Observability Platform</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color={theme.colors.info}
            />
            <Text style={styles.infoText}>
              Scan any product to see its health rating and how it affects your body
            </Text>
          </View>

          {/* Quick Scan Button */}
          <TouchableOpacity style={styles.scanButton} onPress={onScanPress}>
            <View style={styles.scanIconContainer}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={48}
                color={theme.colors.textInverse}
              />
            </View>
            <Text style={styles.scanButtonText}>Scan Product</Text>
            <Text style={styles.scanButtonSubtext}>Tap to start scanning</Text>
          </TouchableOpacity>

          {/* Feature Cards */}
          <View style={styles.features}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${theme.colors.heart}15` }]}>
                <MaterialCommunityIcons
                  name="heart-pulse"
                  size={28}
                  color={theme.colors.heart}
                />
              </View>
              <Text style={styles.featureTitle}>Body Impact</Text>
              <Text style={styles.featureText}>
                See how food affects your heart, brain, energy, and more
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={28}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>Health Score</Text>
              <Text style={styles.featureText}>
                Instant A-E rating based on nutritional quality
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${theme.colors.brain}15` }]}>
                <MaterialCommunityIcons
                  name="clipboard-text"
                  size={28}
                  color={theme.colors.brain}
                />
              </View>
              <Text style={styles.featureTitle}>Detailed Info</Text>
              <Text style={styles.featureText}>
                Complete nutritional breakdown and ingredient analysis
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Version 1.0.0 • MVP</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius['2xl'],
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.md,
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: `${theme.colors.info}10`,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.info,
  },
  infoText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },
  scanButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.sm,
    ...theme.shadow.lg,
  },
  scanIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverse,
  },
  scanButtonSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  features: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  featureCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
    ...theme.shadow.sm,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  featureText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
  },
  footer: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    paddingTop: theme.spacing.md,
  },
});
