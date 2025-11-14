# CLAUDE.md - AI Assistant Guide for Fayyaa (NutriScope)

## Project Overview

**Project Name**: Fayyaa (Codename: NutriScope)
**Type**: Nutrition Observability Mobile Application
**Status**: Early Planning/Documentation Phase
**Philosophy**: Provide "CFO-level" nutrition observability with minimal manual tracking

### Vision Statement
NutriScope gives people executive-level insight into what they eat and how it impacts their body. Instead of logging every bite, users capture high-leverage inputs (grocery trips, receipts, scans, eating-out events) and receive clear insights and risk signals about their nutrition.

## Repository Structure

```
Fayyaa-/
├── .git/                    # Git repository data
├── .gitignore              # Git ignore rules (.env files)
├── docs/                   # All project documentation
│   ├── codex.md           # Project vision, MVP features, tech stack
│   ├── architecture.md    # System architecture (client & backend)
│   ├── api_design.md      # REST API endpoint specifications
│   ├── ui-ux_flows.md     # User experience flows and screen designs
│   ├── future-directions.md # Future features (doctor summaries, experiments)
│   ├── referal_doctor_feature.md # Doctor integration specs
│   └── get_insights.md    # Insights API response format
└── CLAUDE.md              # This file - AI assistant guide
```

**Important**: This is currently a **documentation-only repository**. No source code has been written yet. All implementation decisions are documented in `/docs`.

## Tech Stack (Planned)

### Mobile Application
- **Framework**: React Native with TypeScript
- **Navigation**: React Navigation
- **State Management**: Zustand (preferred) or Redux Toolkit
- **Server State**: React Query / TanStack Query
- **UI Components**: NativeBase, React Native Paper, or custom atomic components
- **Barcode Scanning**: react-native-vision-camera with barcode plugin

### Backend
- **Language**: TypeScript
- **Framework**: NestJS (recommended for structure)
- **API Style**: REST (JSON), future GraphQL for analytics
- **Authentication**: JWT + refresh tokens, future social login (Apple/Google)
- **Database**: PostgreSQL (primary relational store)
- **Caching/Queues**: Redis
- **Search**: PostgreSQL full-text search (OpenSearch/Meilisearch later)

### Infrastructure (Proposed)
- **Cloud Provider**: AWS (can be substituted)
- **API Hosting**: AWS ECS/Fargate or managed Node service
- **Database**: AWS RDS (PostgreSQL)
- **Storage**: S3 for receipt photos
- **CI/CD**: GitHub Actions
- **Feature Flags**: DB-based or LaunchDarkly (later)

### External Data Sources
- **OpenFoodFacts**: Barcode + product/nutrition data
- **USDA**: Government nutrition datasets
- **Future**: Restaurant APIs, crowd-sourced data

## Architecture Patterns

### Backend Module Structure (NestJS)
```
- AuthModule       # Sign-up, login, JWT, password reset
- UserModule       # User profiles, preferences, goals
- HouseholdModule  # Households, members, roles
- ProductModule    # Product cache, barcode lookup, rating computation
- ShoppingModule   # Shopping lists, items, consumption distributions
- IntakeModule     # Eating events from grocery lists and eating-out entries
- InsightsModule   # Periodic stats computation, risk flags
- ExperimentsModule (future) # Nutrition experiments
- DoctorModule (future)      # Export/share summaries
```

### Data Flow Pattern
```
1. User scans barcode
2. App → POST /products/lookup with barcode
3. Backend checks local products table
4. If missing/stale: fetch from external API, compute rating, store in DB
5. Return normalized product + rating
6. User adds to list → POST /shopping-lists/{id}/items
7. Consumption distribution sliders per household member
8. "Purchased" confirmation → generates IntakeEvents
9. Cron job aggregates nutrients → InsightAggregates table
10. Fast insights retrieval from precomputed aggregates
```

## Core Domain Concepts

### Key Entities (See docs/referal_doctor_feature.md for full data model)

1. **User**: App user with profile, preferences, health goals
2. **Household**: Family or group sharing food purchases
3. **HouseholdMember**: Can be a User (app account) or pseudo-member (name only)
4. **Product**: Food item with barcode, nutrients, rating (A-E), flags
5. **ShoppingList**: Weekly/periodic list of planned purchases
6. **ShoppingItem**: Product + quantity + consumption distribution
7. **ConsumptionShare**: Per-member share of a shopping item (sliders)
8. **IntakeEvent**: Actual food intake record per member
9. **EatingOutEntry**: Restaurant/fast food intake
10. **InsightAggregate**: Precomputed nutrition stats per member per period

### Consumption Distribution Pattern
- Each ShoppingItem has ConsumptionShares for household members
- Builder assigns consumption via sliders (defaults to equal distribution)
- Shares sum to 1.0 (100%) per item
- When list is "finalized", IntakeEvents are generated per member based on shares

### Rating System
- Products rated A-E (or 0-100 score)
- Computed by backend "secret sauce" algorithm
- Factors: macros, micronutrients, ultra-processing, additives, sugar, sodium
- Stored in product cache for fast retrieval

## User Personas

1. **Builder/Household Admin**: Buys groceries, manages shopping list, approves item requests
2. **Household Member**: Eats from shared groceries, can request items, views personal insights
3. **Individual User**: Single person using app for themselves only
4. **Doctor/Health Professional** (future): Receives nutrition summaries for patients

## MVP Feature Set (Phase 1)

### 1. Product Scanner (Yuka-style)
- Barcode scanning
- Product info display: rating, macros, micronutrients, flags
- Manual product search
- "Add to Shopping List" action

### 2. Nutritional Shopping List
- Weekly shopping plan
- Add items via scan or search
- Quantity + household consumption distribution (sliders)
- Visualize estimated nutrients per person
- Status: "To buy" vs "Bought"
- Family request/approval flow

### 3. Statistical Insights Dashboard
- Weekly/Monthly views
- Per-user health dashboard: macros, nutrient sufficiency, trends
- "What's missing" highlights
- "Risk radar" for high sugar, low fiber, etc.
- Household-level breakdown by person and food category
- Design: card-based, minimal text, traffic light colors

### 4. Household/Family Features
- Multiple members (users + pseudo-users)
- Consumption sliders per shopping item
- Builder approves/declines member requests
- Per-member nutrition stats

### 5. Eating-Out/Quick Foods (lightweight v1)
- Search common fast food chains
- Quick meal estimates
- Assign to members like grocery items

## Development Workflows

### Current Phase: Documentation
Since no code exists yet, the workflow is:
1. Review/update documentation in `/docs`
2. Refine architecture decisions
3. Clarify data models and API contracts
4. Prepare for implementation kickoff

### Future Development Workflow (when coding begins)
1. **Feature Development**:
   - Start with docs (update architecture.md, api_design.md as needed)
   - Implement backend module + endpoints
   - Create/update database migrations
   - Implement mobile screens + state management
   - Write tests (unit + integration)
   - Update API documentation

2. **Git Branching**:
   - Main branch: `main` or `master`
   - Feature branches: `feature/feature-name`
   - AI development branches: `claude/claude-md-*` (as assigned)

3. **Commit Guidelines**:
   - Conventional commits preferred: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
   - Reference docs when implementing: "Implements shopping list API from api_design.md"

4. **Testing Strategy**:
   - Backend: Unit tests for services, E2E tests for critical flows
   - Mobile: Component tests, E2E tests (Detox or similar)
   - Test data: Mock households, products, shopping lists

## Key Conventions for AI Assistants

### Documentation-First Approach
- **Always check `/docs` first** before implementing features
- Maintain consistency with documented architecture
- Update docs when proposing architecture changes
- Reference specific doc files in code comments

### Privacy & Security Priorities
- Never commit `.env` files (already in .gitignore)
- Implement JWT with rotation
- HTTPS everywhere in production
- Pseudonymize data for research exports
- Explicit consent for doctor sharing and research participation
- Audit trails for data access

### Code Quality Standards
- **TypeScript**: Strict mode, no `any` types without justification
- **Naming**: Use domain language (Product, ShoppingList, IntakeEvent, not generic names)
- **Error Handling**: Always handle external API failures gracefully
- **Validation**: Use Zod or class-validator for input validation
- **Comments**: Explain WHY, not WHAT (code should be self-documenting)

### Performance Considerations
- Use precomputed `InsightAggregate` tables for dashboard queries
- Heavy caching for product lookups (Redis + in-process)
- Optimize for read-heavy insights workload
- Consider pagination for shopping lists and insights

### Testing Philosophy
- Test critical paths: product lookup, shopping list creation, intake event generation
- Mock external nutrition APIs in tests
- Test consumption distribution calculations
- Test insight aggregation logic

### UI/UX Principles (from docs/ui-ux_flows.md)
- Minimize per-meal manual logging (use grocery events)
- Every insight must be explainable (drill-down capability)
- Builder should feel like a "nutrition CFO"
- Soft, health-adjacent colors (greens, yellows, soft purples)
- Card-based design with whitespace
- Smooth animations for interactions
- High accessibility (large tap targets, high contrast)

## API Design Patterns

### Base URL
`/api/v1`

### Authentication
- Bearer JWT in `Authorization` header
- Endpoints return 401 if token invalid/expired

### Common Response Patterns
```typescript
// Success with data
{ data: T, meta?: { ... } }

// Error
{ error: { code: string, message: string, details?: any } }

// Paginated
{ data: T[], pagination: { page, limit, total, hasMore } }
```

### Key Endpoint Groups (See docs/api_design.md)
- `/auth/*` - Registration, login, refresh
- `/me` - Current user profile
- `/households/*` - Household CRUD, member management
- `/products/*` - Product lookup, search
- `/shopping-lists/*` - List CRUD, items, finalization
- `/insights/*` - Personal and household insights
- `/intake/*` - Eating-out entries, manual intake

## Future Features (Not in MVP)

### Doctor Portal
- Export nutrition summaries as PDF/web link
- QR code for doctor access
- Explicit consent + audit trail
- See: `docs/referal_doctor_feature.md`

### Nutrition Experiments
- User-run structured experiments (e.g., "Take vitamin D daily in winter")
- Template library
- Metric tracking (energy, mood, subjective scores)
- NOT medical advice - educational only

### Research Institution Integration
- Opt-in anonymized data aggregation
- Observational studies on diet patterns
- Strong consent model with revocation ability

### Cultural Foods & Recipes
- Composite food modeling (e.g., injera with stews)
- Recipe entity with ingredients
- Portion-based intake tracking

### Integrations
- Fitness trackers (steps, workouts)
- Sleep trackers
- User-uploaded lab results

## Common Tasks for AI Assistants

### When Asked to Implement a Feature
1. Check if it's documented in `/docs`
2. If documented, follow the spec exactly
3. If not documented, ask user or propose addition to docs first
4. Reference doc sections in commit messages

### When Asked About Architecture
1. Refer to `docs/architecture.md` as source of truth
2. For API details, check `docs/api_design.md`
3. For UX flows, check `docs/ui-ux_flows.md`
4. For data model, check `docs/referal_doctor_feature.md` (has full schema)

### When Proposing Changes
1. Explain alignment with project vision (docs/codex.md)
2. Consider impact on households and consumption distribution
3. Consider privacy/security implications
4. Update relevant docs if proposal is accepted

### When Writing Code (Future)
1. Use TypeScript strict mode
2. Follow NestJS patterns for backend (modules, services, controllers)
3. Follow React Native + Zustand patterns for mobile
4. Write tests for business logic (especially intake calculations)
5. Add JSDoc comments for complex domain logic
6. Reference docs: `// Implements shopping list finalization from architecture.md:99`

## Troubleshooting & Common Pitfalls

### Consumption Distribution Math
- Shares must sum to 1.0 (100%) per ShoppingItem
- Validate share sums on backend
- Handle rounding errors gracefully (normalize if sum ≈ 1.0)

### Product Lookup Flow
- Always check local cache first (products table)
- External API calls should be async/background
- Handle missing products gracefully (show "Unknown product" with manual entry option)

### Insight Computation
- Run aggregation jobs off-peak (scheduled cron)
- Use separate read-optimized tables (InsightAggregate)
- Don't compute insights on-demand for large datasets

### Household Member Complexity
- Members can be Users (have accounts) OR pseudo-members (just names)
- Always check `isActiveAppUser` flag
- Pseudo-members still get intake events and insights

## Project Conventions

### File Naming
- Backend: `kebab-case.service.ts`, `kebab-case.controller.ts`, `kebab-case.module.ts`
- Mobile: `PascalCaseComponent.tsx` for components, `camelCaseHook.ts` for hooks
- Docs: `kebab-case.md`

### Variable Naming
- Use domain language: `shoppingList`, `intakeEvent`, `consumptionShare`
- Avoid abbreviations except common ones (id, url, api)
- Boolean prefixes: `is`, `has`, `should`, `can`

### Database Conventions
- Table names: `snake_case` plural (users, shopping_lists, intake_events)
- Column names: `snake_case` (created_at, household_id)
- UUIDs for primary keys
- Always include `created_at`, `updated_at` for entities

### Environment Variables
- Never commit `.env` files (already in .gitignore)
- Document required env vars in future README
- Use `.env.example` template (create when needed)

## Questions to Ask User

If requirements are unclear, ask:
1. "Is this feature documented in `/docs`? Should I check there first?"
2. "Should this affect household-level or individual-level data?"
3. "How should consumption distribution work for this feature?"
4. "Is this an MVP feature or post-MVP? (check docs/codex.md)"
5. "Should this be cached in Redis?"
6. "Does this need doctor-export compatibility?"

## Resources & References

### Documentation Files Priority Order
1. `docs/codex.md` - Vision, MVP scope, personas
2. `docs/architecture.md` - System design, modules, data flow
3. `docs/api_design.md` - API endpoint specifications
4. `docs/referal_doctor_feature.md` - Full data model (embedded)
5. `docs/ui-ux_flows.md` - Screen flows, UX principles
6. `docs/future-directions.md` - Post-MVP features
7. `docs/get_insights.md` - Insights API response format

### External References
- OpenFoodFacts API: https://world.openfoodfacts.org/data
- NestJS docs: https://docs.nestjs.com
- React Native docs: https://reactnative.dev
- React Query: https://tanstack.com/query

## Current State Summary

**Last Updated**: 2025-11-14
**Git Status**: Clean (initial upload commit)
**Implementation Status**: Documentation phase - no source code yet
**Next Steps**: Begin backend scaffolding (NestJS project setup) or mobile app initialization (React Native)

---

## AI Assistant Quick Reference Card

```
PROJECT: Nutrition observability app (grocery-based tracking)
PHASE: Documentation only - no code yet
STACK: React Native + TypeScript (mobile), NestJS + TypeScript (backend), PostgreSQL
DOCS: Check /docs first before any implementation
DOMAIN: Products, ShoppingLists, ConsumptionShares, IntakeEvents, Insights
CORE PATTERN: Grocery list → Consumption distribution → Intake events → Aggregated insights
PRIVACY: Critical - JWT, HTTPS, explicit consent, pseudonymization
TESTING: Focus on intake calculations and insight aggregations
```

---

This guide should be updated as the project evolves and code is implemented. Always sync this file with actual implementation decisions.
