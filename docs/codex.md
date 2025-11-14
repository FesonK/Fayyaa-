# Project Codex — Nutrition Observability App

## Working Name
**Codename:** NutriScope (placeholder – easy to search/replace later)

## Vision

NutriScope gives people “CFO-level” observability into what they eat and how it impacts their body, with minimal manual tracking.

Instead of logging every bite, users:

- Capture **high-leverage inputs** (grocery trips, receipts, scans, eating-out events).
- Assign consumption shares across **household members**.
- See **clear insights and risk signals** about their nutrition, similar to how a company sees dashboards for finances and risk.

Long-term, NutriScope becomes:

- A **personal nutrition intelligence system**.
- A platform for **nutrition experiments** (“Does extra vitamin D every winter help me?”).
- A way to **share structured summaries with doctors** and, eventually, a **research institution–grade dataset**.

---

## Core Personas (v1)

1. **The Builder / Household Admin**
   - Buys groceries, manages the shopping list.
   - Wants an easy way to plan, buy, and understand impact on the household’s health.
   - Approves or rejects item requests from other family members.

2. **Household Member**
   - Eats food from the shared groceries.
   - Wants a say in what gets bought (requests items).
   - Wants a simple view of **“How am *I* doing?”** without heavy tracking.

3. **Individual User (no family)**
   - Single person or someone using the app only for themselves.
   - Uses shopping list & insights primarily for their own diet.

4. **Doctor / Health Professional (future)**
   - Receives concise nutrition summaries and patterns.
   - Uses the output to tailor recommendations.

---

## MVP Feature Set (Phase 1)

### 1. Product Scanner & Info (Yuka-style)

- Scan a **barcode** on packaged food.
- Show:
  - Overall rating (A–E or 0–100).
  - Macros (kcal, protein, fat, carbs).
  - Key micronutrients (fiber, sodium, sugar, etc.).
  - Flags (ultra-processed, additives, high sugar, etc.).
- Allow **manual search** by product name.
- Option to **“Add to Shopping List”** from product info.

**Tech considerations:**
- Use existing food databases via API (e.g., OpenFoodFacts, USDA, etc.) plus a small local DB cache.
- Rating logic implemented in backend so we can refine without app updates.

---

### 2. Nutritional Shopping List (“The Plan / The Cart”)

- Create a **weekly shopping plan**:
  - Add items via **scan** or **search**.
  - Each item:
    - Base quantity (e.g., 2x box, 1kg, etc.).
    - Assigned **household consumption distribution** (slider per member).
- Visualizing the list:
  - For a given week/period, show **estimated nutrients** per person based on the list.
  - Status: “To buy” vs “Bought”.
  - Check-off interactions with nice animations; checked items visually greyed out.

- **Family request flow:**
  - Members can propose “Add X to list”.
  - Builder approves/declines.
  - Optional simple chat/notes on each item (e.g., “Please no peanuts – allergy”).

---

### 3. Statistical Informer / Insights

- Periodic views: **Weekly, Monthly** (MVP) and later Yearly.
- For each user:
  - High-level health dashboard:
    - Macro balance vs targets.
    - Key nutrient sufficiency vs targets (e.g., fiber, sugar, sodium).
    - Trend indicators (improving, stable, worsening).
  - “What’s missing?”:
    - Highlight consistently low nutrients.
    - Suggest food categories to improve.
  - “Risk radar”:
    - Flags for consistently high sugar, low fiber, etc., with simple explanations.

- Household-level view:
  - Breakdown by person.
  - Breakdown by food category (vegetables, fruits, processed snacks, etc.).

**Design philosophy:**
- It should feel like a powerful but friendly **company dashboard**:
  - Cards, charts, and insights.
  - Minimal text walls.
  - As few numbers as possible; use ranges, badges, and traffic light colors.

---

### 4. Household / Family Feature (MVP subset)

- One **Household** with:
  - `members`: some are **users** (have accounts) and some are **non-users** (just names and age).
  - Optional: mark someone as **“not using the app”** but they still receive food share.
- Consumption sliders per item:
  - When adding/expanding a shopping list item, show a slider for each member:
    - Default even distribution.
    - Builder can drag to adjust “who eats more”.
  - This feeds into each member’s personal nutrient stats.

---

### 5. Simple Eating-Out / Instant Foods (v1 lightweight)

- For now:
  - Search a simple internal DB: common fast food chains + common meals.
  - Add “Quick Meals” manually (e.g., “Burger & fries estimate”).
- Each eating-out item:
  - Date/time.
  - Restaurant/food name.
  - Assign to members like groceries.

Future versions can integrate restaurant APIs or crowd-sourcing.

---

## Non-Goals for MVP (but important later)

- Doctor portal with full workflow.
- Formal research tooling and university integration.
- Advanced cultural recipe decomposition (e.g., full injera + stews).
- Wearable integration (e.g., CGM, step counts).
- Clinical diagnostic or treatment recommendations (high regulatory burden).

---

## Tech Stack (Initial Proposal)

### Mobile App

- **Framework:** React Native (TypeScript)
- **Navigation:** React Navigation
- **State:** Zustand or Redux Toolkit (lean toward Zustand for simplicity)
- **Networking:** React Query / TanStack Query
- **UI:** 
  - Component library: NativeBase / React Native Paper, or custom atomic components.
  - Design tokens for color, typography, spacing to support future branding.
- **Camera / Barcode scanning:**
  - `react-native-vision-camera` + barcode plugin or `react-native-camera` alternative.

### Backend

- **Language:** TypeScript
- **Framework:** NestJS or Express + Zod schema validation (NestJS recommended for structure).
- **API style:** REST (with room to add GraphQL for analytics later).
- **Auth:** JWT + refresh tokens; social login (Apple/Google) later.
- **Database:** PostgreSQL (relational, strong for analytics and relations).
- **Caching / queues:** Redis (for caching product info and background tasks).
- **Search:** PostgreSQL full-text search, can add OpenSearch/Meilisearch later if needed.

### Infra & DevOps

- Cloud: AWS / GCP / Azure (choose one; this doc assumes AWS).
- API hosting: AWS ECS/Fargate or managed Node service (or Heroku for early prototypes).
- Database: AWS RDS (PostgreSQL).
- Storage: S3 (receipt photos, if needed).
- CI/CD: GitHub Actions.
- Feature flags: simple DB-based flags or LaunchDarkly (later).

---

## Data Sources for Products & Nutrition

- Public/paid nutrition DBs, e.g.:
  - OpenFoodFacts (barcode + product/nutrition).
  - Country-specific government datasets (USDA, etc.).
- We keep:
  - A **local product cache**.
  - A **rating computation layer** (our secret sauce).

---

## Architecture Priorities

1. **Observability-first domain model**:
   - Everything should be traceable from **food item** → **event** → **person** → **insight**.
2. **Low-friction data entry**:
   - Optimize around grocery events and list-building, not micro-logging.
3. **Explainable insights**:
   - Every warning or recommendation should be traceable back to data (“You’re low in fiber because…”).
4. **Privacy & control**:
   - Users own their data.
   - Explicit consent for sharing with doctor or research.
