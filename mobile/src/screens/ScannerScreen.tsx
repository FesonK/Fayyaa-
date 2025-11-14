/**
 * Scanner Screen
 * Camera screen for scanning product barcodes
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { lookupProductByBarcode } from '../services/productService';
import { Product } from '../types/product';

interface ScannerScreenProps {
  onProductFound: (product: Product) => void;
  onClose: () => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({ onProductFound, onClose }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (isScanning || isLoading) return;

    setIsScanning(true);
    setIsLoading(true);

    try {
      const product = await lookupProductByBarcode(data);

      if (product) {
        onProductFound(product);
      } else {
        Alert.alert(
          'Product Not Found',
          `No product found with barcode: ${data}`,
          [
            {
              text: 'Scan Again',
              onPress: () => {
                setIsScanning(false);
                setIsLoading(false);
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to lookup product. Please try again.');
      setIsScanning(false);
      setIsLoading(false);
    }
  };

  const handleManualEntry = () => {
    // For demo, use a default product
    Alert.alert(
      'Manual Entry',
      'Try scanning: Oreo (7622300441753), Coca-Cola (5449000000996), Avocado (737628064502), Banana (4011), or Corn Flakes (5000159484695)',
      [{ text: 'OK' }]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="camera-off"
          size={64}
          color={theme.colors.textSecondary}
        />
        <Text style={styles.permissionText}>Camera permission is required to scan barcodes</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
        }}
        onBarcodeScanned={isScanning ? undefined : handleBarCodeScanned}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={28} color={theme.colors.textInverse} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan Product</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Scanning Frame */}
        <View style={styles.scanFrame}>
          <View style={styles.scanFrameContainer}>
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>
          <Text style={styles.scanText}>
            {isLoading ? 'Looking up product...' : 'Position barcode within frame'}
          </Text>
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.textInverse} />
          </View>
        )}

        {/* Manual Entry Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.manualButton} onPress={handleManualEntry}>
            <MaterialCommunityIcons
              name="keyboard"
              size={24}
              color={theme.colors.textInverse}
            />
            <Text style={styles.manualButtonText}>Manual Entry</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.text,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.borderRadius.full,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textInverse,
  },
  scanFrame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  scanFrameContainer: {
    width: 280,
    height: 200,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 4,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: theme.borderRadius.lg,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: theme.borderRadius.lg,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  scanText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textInverse,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.overlay,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.md,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.overlay,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  manualButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textInverse,
  },
  permissionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
  },
  buttonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textInverse,
  },
});
