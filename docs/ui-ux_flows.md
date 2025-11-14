
---

## 5. `ux-flows.md`

```md
# UX Flows & Screens

## Global UX Principles

- Minimize per-meal manual logging.
- Use **grocery events** and **lists** as the main data entry.
- Every insight should be backed by an explainable drill-down.
- Make the **Builder** feel like a “nutrition CFO / kingdom leader”.

---

## Screens (MVP)

1. **Onboarding**
2. **Home Dashboard**
3. **Shopping List**
4. **Product Scan & Detail**
5. **Household Management**
6. **Eating Out / Quick Add**
7. **Personal Insights**
8. **Household Insights**

---

## Flow 1 – Onboarding

1. User installs app, opens.
2. Welcome screen:
   - Short intro: “Visualize what you eat like a company tracks its money.”
3. Questions:
   - “Are you buying groceries just for yourself or for a household?”
     - Option: `Just me` vs `Household / family`.
   - Age, activity level, goals:
     - Checkboxes: `Build muscle`, `Boost brain`, `Support heart`, `Skin & beauty`, `General health`, `Other`.
4. If `Household`:
   - Create household name (e.g., “Smith Family”).
   - Add members (names, ages).
   - Mark which ones will use the app vs not (toggle).
5. Land on **Home Dashboard**.

---

## Flow 2 – Shopping List (Builder)

**Screen:** Shopping List Overview

- Top bar: current week (e.g., “Week of Mar 3–9”), option to change week.
- Main area:
  - List of items with:
    - Product name + small rating badge.
    - Quantity.
    - Status pill: `To buy` or `Bought`.

**Adding Items**

1. Builder taps `+ Add Item`.
2. Options:
   - `Scan barcode`.
   - `Search product`.
3. After scanning/searching:
   - Show **Product Detail Sheet**:
     - Name, brand, rating badge, key nutrients.
     - Button: `Add to list`.
4. On “Add to list”:
   - Show **Consumption Distribution modal**:
     - List of household members.
     - Slider per member (default equal).
     - Total shows 100%.
   - Confirm → item added.

**Marking Purchased**

- From Shopping List:
  - Tap checkbox / swipe to mark purchased.
  - Item animates and moves to “Bought” section, greyed but visible.

**Finalizing List**

- CTA at bottom when most items are purchased: “Finalize week”.
- Confirmation: “We’ll estimate how these foods are consumed this week.”
- On confirm: triggers backend to generate intake events.

---

## Flow 3 – Household Member Requesting Items

1. Member opens app, navigates to **Shopping List**.
2. Section: `Requests` with button `Request an item`.
3. Flow:
   - Search product or free-text (“strawberry ice cream”).
   - Optional comment: “For my birthday”.
   - Submit request.
4. Builder sees:
   - On their Shopping List screen, a “Requests” card with pending items.
   - For each: approve or decline.
   - Approved items move into main list, with label “Requested by [name]”.

---

## Flow 4 – Product Scan & Detail

**Entry points:**
- From Shopping List (Add via Scan).
- Quick scan from Home.

**Product Detail Screen / Bottom Sheet**

- Header: product name, image (if available), brand.
- Badge: rating grade (A–E) with color, plus score.
- Sections:
  - **Summary**: short note (“High fiber, moderate sugar”).
  - **Nutrition per serving**: simple bar chart or chips (kcal, protein, sugar, etc.).
  - **Flags**: “Ultra processed”, “Contains additives”, “High sugar”, etc.
- Primary actions:
  - `Add to shopping list`.
  - `Compare with alternatives` (future).

---

## Flow 5 – Eating Out / Quick Food

1. From Home, tap `Ate out? Quick add`.
2. Options:
   - Search: “McDonalds Big Mac”.
   - Or “Create quick meal” with manual nutrient sliders/inputs.
3. Choose who ate:
   - Member chips (toggle), plus slider if amounts differ.
4. Save → creates immediate IntakeEvents.

---

## Flow 6 – Personal Insights Screen

**Layout:**

- Top: time range selector (Week / Month).
- Section 1: “How you’re doing”
  - A large card with overall score (0–100).
  - Trend indicator vs previous period.
- Section 2: Key metrics
  - Macro donut chart.
  - Daily kcal line graph.
- Section 3: “You’re missing”
  - List of 3–5 nutrients or categories with low scores.
  - Each has explanation and “Foods to help” (categories, not prescriptions).
- Section 4: “Risks to watch”
  - Cards: high sugar, high sodium, etc.
  - Tap → see underlying patterns (how often, which foods).

---

## Flow 7 – Household Insights Screen

- Similar layout but aggregated.
- Stacked bar charts by member.
- “Who is most underfed in fiber?” style comparisons (soft language).

---

## Visual Style Notes (for designers)

- Use soft, health-adjacent colors (greens, yellows, soft purples).
- Plenty of whitespace; card-based design.
- Motion:
  - Smooth expansions when:
    - Opening item details.
    - Adjusting sliders.
  - Micro-animations for check-offs (shopping items).
- Accessibility:
  - Large tap targets.
  - High contrast for key information (esp. risk badges).
