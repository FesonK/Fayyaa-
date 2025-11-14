# Fayyaa Mobile App - Quick Start Guide

## What's Been Built

A beautiful, fully functional nutrition app MVP with:

- **Product Scanning**: Point your camera at barcodes to scan products
- **Health Grading**: Instant A-E rating with color-coded scores (0-100)
- **Body Impact Visualization**: See how food affects 7 body systems
- **Detailed Nutrition**: Complete breakdown of macros and micronutrients
- **Beautiful UI**: Modern, health-focused design with smooth animations

## Running the App

### Step 1: Navigate to Mobile Directory
```bash
cd mobile
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm start
```

This will open Expo Dev Tools in your browser and show a QR code.

### Step 4: Run on Your Device

**Option A: On Your Phone (Recommended)**
1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Scan the QR code:
   - **iOS**: Use your Camera app
   - **Android**: Use the Expo Go app

**Option B: On iOS Simulator (macOS only)**
```bash
npm run ios
```

**Option C: On Android Emulator**
```bash
npm run android
```

**Option D: In Web Browser**
```bash
npm run web
```

## Testing the App

The app includes 5 mock products you can test with:

### Sample Barcodes:

1. **Oreo Cookies** - `7622300441753`
   - Grade: E (Poor)
   - High sugar, ultra-processed

2. **Coca-Cola** - `5449000000996`
   - Grade: E (Very Poor)
   - Empty calories, very high sugar

3. **Avocado** - `737628064502`
   - Grade: A (Excellent)
   - Healthy fats, high fiber, nutrient-rich

4. **Banana** - `4011`
   - Grade: A (Excellent)
   - Natural energy, high potassium

5. **Corn Flakes** - `5000159484695`
   - Grade: C (Moderate)
   - High sodium, added sugar

### How to Test:

1. **Tap "Scan Product"** on the home screen
2. **Allow camera access** when prompted
3. **Position a barcode** within the scanning frame
   - You can use actual product barcodes
   - Or search online for images of the sample barcodes above
4. **View the results** - beautiful product detail screen will appear!

## App Features Walkthrough

### Home Screen
- Clean landing page with app branding
- Large "Scan Product" button
- Feature cards explaining capabilities
- Quick access to scanning

### Scanner Screen
- Full-screen camera view
- Animated scanning frame with corner guides
- Loading indicator during product lookup
- Manual entry option for testing
- Permission handling

### Product Detail Screen
- **Product Header**: Name, brand, category, image
- **Health Grade Badge**: Large A-E badge with score
- **Key Information**: Warning/positive flag chips
- **Body Impact Cards**: How food affects:
  - Heart Health
  - Brain & Focus
  - Energy Levels
  - Digestion
  - Skin & Beauty
  - Muscle
  - Immune System
- **Nutrition Grid**: Macros displayed in colorful cards
- **Key Nutrients**: Progress bars for fiber, sugar, sat fat, sodium
- **Allergens**: Warning chips for allergens
- **Ingredients**: Full ingredient list

## Design Highlights

### Color System
- **Grade A**: Emerald green (#10B981) - Excellent
- **Grade B**: Lime green (#84CC16) - Good
- **Grade C**: Amber (#F59E0B) - Moderate
- **Grade D**: Orange (#F97316) - Poor
- **Grade E**: Red (#EF4444) - Very Poor

### Body System Colors
- Heart: Red
- Brain: Purple
- Energy: Amber
- Digestion: Lime
- Skin: Pink
- Muscle: Blue
- Immune: Emerald

### UI Principles
- Clean, modern card-based design
- Generous whitespace
- Smooth modal transitions
- Consistent spacing (4px grid)
- Clear visual hierarchy
- High contrast for accessibility

## Project Structure

```
mobile/
├── src/
│   ├── components/
│   │   ├── GradeBadge.tsx         # A-E grade with score
│   │   ├── BodyImpactCard.tsx     # Body system impact card
│   │   ├── FlagChip.tsx           # Warning/positive chips
│   │   └── NutrientBar.tsx        # Progress bar for nutrients
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Landing page
│   │   ├── ScannerScreen.tsx      # Camera/barcode scanner
│   │   └── ProductDetailScreen.tsx # Product info display
│   ├── services/
│   │   └── productService.ts      # Mock product lookup
│   ├── theme/
│   │   ├── colors.ts              # Color palette
│   │   ├── typography.ts          # Font system
│   │   ├── spacing.ts             # Spacing scale
│   │   └── index.ts               # Theme exports
│   └── types/
│       └── product.ts             # TypeScript types
├── App.tsx                        # Main component
└── README.md                      # Full documentation
```

## Next Steps

### Immediate Enhancements:
1. **Add more mock products** - Edit `src/services/productService.ts`
2. **Customize theme** - Modify files in `src/theme/`
3. **Add animations** - Use React Native Reanimated
4. **Implement search** - Add product search screen

### Backend Integration:
1. Create API service to replace mock data
2. Implement real barcode lookup via OpenFoodFacts API
3. Add user authentication
4. Store scanned product history

### New Features:
1. Shopping list management
2. Household member setup
3. Personal insights dashboard
4. Nutrition tracking over time

## Troubleshooting

### Camera Not Working?
- Make sure you allowed camera permissions
- On iOS Simulator, camera won't work (use real device or Android emulator)
- Try restarting the app

### Barcode Not Scanning?
- Ensure good lighting
- Hold steady with barcode in frame
- Try the mock barcodes listed above
- Use "Manual Entry" to see the demo

### App Won't Start?
```bash
# Clear cache and restart
npm start --clear
```

### Dependencies Issues?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Screenshots Preview

The app includes:
- ✅ Beautiful home screen with branding
- ✅ Full-screen camera scanner with guides
- ✅ Comprehensive product detail view
- ✅ Color-coded health grades
- ✅ Body impact visualization
- ✅ Nutritional breakdown
- ✅ Warning and positive flags
- ✅ Smooth modal animations

## Tech Stack

- **React Native** via Expo (v54)
- **TypeScript** for type safety
- **Expo Camera** for barcode scanning
- **Custom Design System** (no UI library dependencies)
- **Modular Architecture** for scalability

## Resources

- Full Documentation: `mobile/README.md`
- Architecture Docs: `docs/architecture.md`
- API Design: `docs/api_design.md`
- UX Flows: `docs/ui-ux_flows.md`

---

**Ready to scan!** 📱 Run `npm start` in the mobile directory and start exploring healthy eating! 🥑
