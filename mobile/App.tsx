/**
 * Fayyaa - Nutrition Observability App
 * Main App Component
 */

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { Product } from './src/types/product';
import { theme } from './src/theme';

type AppScreen = 'home' | 'scanner' | 'productDetail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleScanPress = () => {
    setCurrentScreen('scanner');
  };

  const handleProductFound = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('productDetail');
  };

  const handleCloseScanner = () => {
    setCurrentScreen('home');
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    setCurrentScreen('home');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Home Screen */}
      {currentScreen === 'home' && <HomeScreen onScanPress={handleScanPress} />}

      {/* Scanner Modal */}
      <Modal
        visible={currentScreen === 'scanner'}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ScannerScreen onProductFound={handleProductFound} onClose={handleCloseScanner} />
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        visible={currentScreen === 'productDetail' && selectedProduct !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedProduct && (
          <ProductDetailScreen product={selectedProduct} onClose={handleCloseProductDetail} />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
