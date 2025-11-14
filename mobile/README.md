# Fayyaa Mobile App

Beautiful React Native app for scanning products and viewing their nutritional impact on your body.

## Features

- **Product Scanning**: Scan barcodes to instantly get product information
- **Health Grading**: A-E rating system with color-coded scores
- **Body Impact Visualization**: See how products affect different body systems (heart, brain, energy, digestion, skin, muscle, immune)
- **Detailed Nutrition**: Complete breakdown of macros and micronutrients
- **Smart Flags**: Visual warnings and highlights for key product attributes
- **Beautiful UI**: Clean, modern design with smooth animations

## Tech Stack

- **React Native + Expo**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **Expo Camera**: Barcode scanning functionality
- **React Hooks**: Modern state management

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo Go app on your phone (for testing)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Device

1. Install **Expo Go** app on your phone from App Store (iOS) or Play Store (Android)
2. Run `npm start` in terminal
3. Scan the QR code with:
   - iPhone: Camera app
   - Android: Expo Go app

### Running on Simulator

```bash
# iOS (requires macOS)
npm run ios

# Android (requires Android Studio)
npm run android

# Web
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── GradeBadge.tsx       # A-E health grade badge
│   │   ├── BodyImpactCard.tsx   # Body system impact card
│   │   ├── FlagChip.tsx         # Warning/positive flag chip
│   │   └── NutrientBar.tsx      # Nutrient progress bar
│   ├── screens/          # App screens
│   │   ├── HomeScreen.tsx       # Landing page
│   │   ├── ScannerScreen.tsx    # Barcode scanner
│   │   └── ProductDetailScreen.tsx # Product info & impact
│   ├── services/         # Business logic
│   │   └── productService.ts    # Product lookup (mock data)
│   ├── theme/            # Design system
│   │   ├── colors.ts            # Color palette
│   │   ├── typography.ts        # Font system
│   │   ├── spacing.ts           # Spacing scale
│   │   └── index.ts             # Theme exports
│   └── types/            # TypeScript types
│       └── product.ts           # Product & nutrition types
├── App.tsx               # Main app component
└── package.json
```

## Mock Products

The app comes with 5 sample products for testing:

1. **Oreo Cookies** (7622300441753) - Grade E
2. **Coca-Cola** (5449000000996) - Grade E
3. **Avocado** (737628064502) - Grade A
4. **Banana** (4011) - Grade A
5. **Corn Flakes** (5000159484695) - Grade C

Try scanning these barcodes or use the manual entry feature!

## Design System

### Color Palette

- **Grade Colors**: A (emerald) to E (red)
- **Body Systems**: Unique color for each system (heart=red, brain=purple, energy=amber, etc.)
- **Semantic Colors**: Success, warning, error, info
- **Neutrals**: Clean grays for text and surfaces

### Typography

- **Scale**: xs (12px) to 5xl (48px)
- **Weights**: Regular, medium, semibold, bold
- **Line Heights**: Tight, normal, relaxed

### Spacing

- Based on 4px grid system
- Scale: xs (4px) to 4xl (64px)

## Key Components

### GradeBadge
Displays health grade (A-E) with score (0-100) in a circular badge.

### BodyImpactCard
Shows how a product affects a specific body system with:
- System icon and name
- Impact indicator (positive/neutral/negative)
- Detailed explanation

### FlagChip
Compact chip for product flags:
- Warning flags (high sugar, ultra-processed, etc.)
- Positive flags (high fiber, whole food, etc.)

### NutrientBar
Progress bar showing nutrient value vs daily target.

## Development Notes

### Adding New Products

Edit `src/services/productService.ts` and add entries to the `mockProducts` object.

### Customizing Theme

Modify files in `src/theme/` directory:
- `colors.ts` - Color palette
- `typography.ts` - Font settings
- `spacing.ts` - Spacing & border radius

### Next Steps

- [ ] Connect to real backend API
- [ ] Add user authentication
- [ ] Implement shopping list feature
- [ ] Add household management
- [ ] Create insights dashboard
- [ ] Implement experiments feature

## Contributing

This is part of the Fayyaa project. See main repository for contribution guidelines.

## License

TBD
