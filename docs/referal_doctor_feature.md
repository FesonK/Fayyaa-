
---

## 4. `data-model.md`

```md
# Data Model

## Key Entities

### User
- `id: uuid`
- `email: string`
- `passwordHash: string`
- `name: string`
- `dateOfBirth: date?`
- `sex: enum?`
- `activityLevel: enum("sedentary","light","moderate","high")`
- `dietType: enum("omnivore","vegan","vegetarian","pescatarian",...)`
- `goals: jsonb` (muscle gain, brain health, organ focus, beauty, fasting, etc.)

### Household
- `id: uuid`
- `name: string`
- `createdByUserId: uuid`
- `createdAt`

### HouseholdMember
- `id: uuid`
- `householdId: uuid`
- `userId: uuid?` (null if pseudo / non-app user)
- `name: string`
- `age: int?`
- `isActiveAppUser: boolean`
- `role: enum("builder","member")`

### Product
- `id: uuid`
- `barcode: string?`
- `name: string`
- `brand: string?`
- `category: string`
- `source: enum("open_food_facts","usda","manual")`
- `nutrientsPer100g: NutrientProfile`
- `nutrientsPerServing: NutrientProfile`
- `servingSizeG: number?`
- `allergens: string[]`
- `isUltraProcessed: boolean?`
- `ratingScore: number` (0–100)
- `ratingGrade: string` (“A”–“E”)
- `ratingDetails: jsonb` (reasons, breakdown)
- `lastUpdatedAt`

**NutrientProfile** (as JSONB)
- `energyKcal`
- `proteinG`
- `fatG`
- `carbG`
- `fiberG`
- `sugarG`
- `saturatedFatG`
- `sodiumMg`
- `vitamins` (nested)
- `minerals` (nested)

### ShoppingList
- `id: uuid`
- `householdId: uuid`
- `name: string`
- `periodStart: date`
- `periodEnd: date`
- `status: enum("draft","active","completed")`
- `createdByUserId`
- `createdAt`

### ShoppingItem
- `id: uuid`
- `shoppingListId: uuid`
- `productId: uuid`
- `quantity: number`
- `unit: string` (box, kg, etc.)
- `isPurchased: boolean`
- `notes: string?`

### ConsumptionShare
- `id: uuid`
- `shoppingItemId: uuid`
- `householdMemberId: uuid`
- `share: number` (0–1, sum per item = 1)

### IntakeEvent
- Represents a **per-member** intake of some product/meal.

Fields:
- `id: uuid`
- `householdMemberId: uuid`
- `sourceType: enum("shopping_list","eating_out","manual")`
- `sourceId: uuid` (shopping item id or eating out id)
- `productId: uuid?`
- `description: string`
- `timestamp: datetime`
- `estimatedPortionG: number`
- `nutrients: NutrientProfile` (resolved at event creation – snapshot)

### EatingOutEntry
- `id: uuid`
- `householdId: uuid`
- `date: date`
- `restaurantName: string`
- `mealName: string`
- `baseNutrients: NutrientProfile`
- `memberShares: jsonb` or normalized table similar to ConsumptionShare.

### InsightAggregate
- Precomputed stats per member per period.

Fields:
- `id: uuid`
- `householdMemberId`
- `periodType: enum("day","week","month")`
- `periodStart: date`
- `periodEnd: date`
- `totalNutrients: NutrientProfile`
- `avgPerDay: NutrientProfile`
- `macroPercentages: jsonb`
- `riskFlags: jsonb[]` (codes + metrics)

---

## Example TypeScript Interfaces (Client / Shared)

```ts
export type NutrientStatus = "low" | "adequate" | "high";

export interface NutrientScore {
  name: string;
  status: NutrientStatus;
  score: number; // 0-1, normalized against recommended intake
}

export interface HouseholdMember {
  id: string;
  name: string;
  isActiveAppUser: boolean;
}

export interface ShoppingItem {
  id: string;
  productId: string;
  quantity: number;
  unit: string;
  isPurchased: boolean;
  consumptionShares: { memberId: string; share: number }[];
}
