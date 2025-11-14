# API Design (v1, REST, JSON)

Base URL: `/api/v1`

Authentication: Bearer JWT

---

## Auth

### POST /auth/register
- Body: `{ email, password, name, age?, gender?, activityLevel? }`
- Returns: `{ user, accessToken, refreshToken }`

### POST /auth/login
- Body: `{ email, password }`
- Returns: `{ user, accessToken, refreshToken }`

### POST /auth/refresh
- Body: `{ refreshToken }`

---

## Users & Households

### GET /me
- Returns authenticated user profile.

### PATCH /me
- Update user preferences (e.g., units, health goals).

### POST /households
- Body: `{ name }`
- Creates a household, current user is `role = "builder"`.

### GET /households
- List households user belongs to.

### GET /households/{id}
- Household details, including members & roles.

### POST /households/{id}/members
- Body:
  ```json
  {
    "name": "Alice",
    "type": "user" | "pseudo",
    "userId": "optional-if-linking-existing-user",
    "age": 10,
    "isActiveAppUser": true | false
  }
