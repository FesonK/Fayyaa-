# Architecture Overview

## High-Level Diagram (text description)

Mobile App (React Native)
  ↕ (HTTPS / JSON)
Backend API (Node.js + TypeScript, NestJS)
  ↔ PostgreSQL (core relational data)
  ↔ Redis (cache, queues)
  ↔ External Nutrition APIs (OpenFoodFacts, etc.)
  ↔ Analytics / BI (future: warehouse + dashboards)

---

## Client Architecture (React Native)

### Layers

1. **UI Layer**
   - Screens (ShoppingListScreen, ProductScanScreen, HouseholdInsightsScreen, PersonalInsightsScreen, ExperimentsScreen (future)).
   - Components:
     - `ProductCard`, `NutrientBadge`, `RiskChip`, `HouseholdMemberSlider`, `InsightCard`, etc.

2. **State & Data Layer**
   - Global state (Zustand/Redux) for:
     - Auth (user, tokens).
     - Active household & members.
     - Current shopping list.
     - User preferences (units, themes).
   - Server state (React Query):
     - Products (get by barcode or search).
     - Shopping lists.
     - Insights.
     - Household info.

3. **Services**
   - `apiClient.ts` — wraps axios/fetch with base URL & auth headers.
   - `productService.ts`, `shoppingListService.ts`, `insightsService.ts`, `householdService.ts`.

4. **Utilities**
   - Types (TS interfaces mirrored from backend).
   - Input validation (e.g., Zod or simple guards).
   - Analytics events (for product usage telemetry – internal, not health).

---

## Backend Architecture (NestJS-style)

### Modules

- `AuthModule`
  - Handles sign-up, login, JWT, password reset.
- `UserModule`
  - User profiles, preferences, goals.
- `HouseholdModule`
  - Households, members, roles (builder vs member).
- `ProductModule`
  - Product cache, barcode lookup.
- `ShoppingModule`
  - Shopping lists, shopping items, consumption distributions.
- `IntakeModule`
  - Eating events: from grocery lists, eating-out entries.
- `InsightsModule`
  - Periodic stats computation, risk flags.
- `ExperimentsModule` (future)
  - Experiments, arms, user assignments, outcome metrics.
- `DoctorModule` (future)
  - Export/share summaries.

### Request Flow Example

1. User scans barcode.
2. App sends `POST /products/lookup` with `barcode`.
3. Backend:
   - Checks local `products` table.
   - If missing or stale:
     - Calls external API, formats data, computes NutriScore, stores in DB.
4. Response includes normalized product info + rating.
5. User taps “Add to List” → `POST /shopping-lists/{id}/items`.

---

## Data Pipeline for Insights

1. **Data capture:**
   - Shopping lists (planned purchase).
   - “Purchased” check-off → confirm list as an **intake batch**.
   - Consumption distributions per item (sliders) → per-person share.
   - Eating-out events (direct intake events).

2. **Normalization:**
   - Each `ShoppingItem` generates estimated **IntakeEvents** per person (e.g. distributed over the week).
   - Each `IntakeEvent` linked to:
     - `person (User or NonUserHouseholdMember)`.
     - `product` or `meal`.
     - `timestamp or period`.

3. **Analytics:**
   - A scheduled job (cron) runs daily:
     - Aggregates nutrients per person per day.
     - Updates monthly aggregates & insights tables.
   - Insights retrieval uses these aggregates for fast UI performance.

---

## Environments

- **Local Dev**
  - Docker compose: API, Postgres, Redis.
  - RN app via emulator or device.

- **Staging**
  - For integration tests and pre-release builds.

- **Production**
  - Managed Node containers.
  - Managed Postgres (RDS-like).
  - Auto backups & monitoring.

---

## Security & Privacy

- JWT access tokens with rotation.
- HTTPS everywhere.
- Pseudonymized IDs for research exports.
- Explicit consent for:
  - “Share data with doctor”.
  - “Share anonymized data for research”.

---

## Scalability Considerations

- Use **read-optimized tables** for insights to keep dashboards fast.
- Product lookup heavily cached (Redis + in-process memory).
- Future: data warehouse (BigQuery/Snowflake/Redshift) to power advanced analytics and research.
