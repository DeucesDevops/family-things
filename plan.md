# Family Things — App Plan

A family-first planning hub where members coordinate events, holidays, eat-outs, and shared activities — all in one place, synced in real time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | Expo + React Native + TypeScript |
| Navigation | Expo Router (file-based) |
| Auth | Clerk |
| Backend | Express.js + TypeScript |
| Database | Neon (PostgreSQL) |
| ORM | Drizzle ORM |
| Validation | Zod (client + server) |
| Monorepo | pnpm workspaces |

---

## Screens (8 total)

| # | Screen | Purpose |
|---|--------|---------|
| 1 | Auth / Onboarding | Clerk sign-up/login, family invite code join, 3-slide carousel |
| 2 | Home Dashboard | Upcoming events feed, quick-add grid, family greeting |
| 3 | Calendar | Month / Week / Agenda toggle, dot indicators, timeline |
| 4 | Event Detail | Full event info, RSVP (Going / Maybe / Skip), attendees |
| 5 | Create Event | 4-step wizard: Type → Details → Guests → Confirm |
| 6 | Browse / Categories | Search bar, category banners with upcoming counts |
| 7 | Family Group | Member list, roles (Admin/Member), shareable family code |
| 8 | Profile & Settings | Stats, notification toggles, Clerk-managed account |

---

## Event Categories

- 🍽️ **Eat-outs** — Restaurants, takeaways, food trips
- 🏖️ **Holidays** — Trips, getaways, vacations
- 🎉 **Celebrations** — Birthdays, anniversaries, milestones
- 🎯 **Activities** — Sports, games, nature, cinema
- ✈️ **Trips** — Multi-day travel
- 🎭 **Shows** — Theatre, concerts, events

---

## Monorepo Structure

```
family-things/
├── apps/
│   ├── mobile/                        # Expo + React Native + TypeScript
│   │   └── src/
│   │       ├── app/                   # Expo Router file-based routes
│   │       │   ├── (auth)/
│   │       │   │   ├── sign-in.tsx
│   │       │   │   └── onboarding.tsx
│   │       │   ├── (tabs)/
│   │       │   │   ├── index.tsx      # Home
│   │       │   │   ├── calendar.tsx
│   │       │   │   ├── browse.tsx
│   │       │   │   └── profile.tsx
│   │       │   └── events/
│   │       │       ├── [id].tsx       # Event Detail
│   │       │       └── create.tsx     # Create Wizard
│   │       ├── modules/
│   │       │   ├── auth/
│   │       │   ├── home/
│   │       │   ├── calendar/
│   │       │   ├── events/
│   │       │   ├── categories/
│   │       │   ├── family/
│   │       │   └── profile/
│   │       └── lib/                   # API client, Clerk config, constants
│   │
│   └── api/                           # Express.js + TypeScript
│       └── src/
│           ├── modules/
│           │   ├── auth/              # Clerk webhook + JWT middleware
│           │   ├── events/            # CRUD + RSVP endpoints
│           │   ├── family/            # Family group management
│           │   └── members/           # Roles + invites
│           ├── db/                    # Drizzle client + migrations
│           └── lib/                   # Middleware, error handling, logger
│
└── packages/
    ├── shared-types/                  # Zod schemas + shared TS interfaces/enums
    ├── ui/                            # Shared React Native components
    └── utils/                         # Date helpers, formatters, constants
```

Each API module follows the same internal structure:

```
events/
├── events.router.ts
├── events.controller.ts
├── events.service.ts
└── events.schema.ts        # Zod validation
```

---

## Database Schema (Neon / Drizzle)

### families
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | text | e.g. "The Banda Family" |
| code | varchar(8) | Unique invite code |
| created_at | timestamp | |

### users
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | Matches Clerk user ID |
| family_id | uuid FK | → families |
| name | text | |
| email | text | |
| role | enum | admin \| member |
| created_at | timestamp | |

### events
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| family_id | uuid FK | → families |
| created_by | uuid FK | → users |
| title | text | |
| category | enum | eat-out \| holiday \| celebration \| activity \| trip \| show |
| date | timestamp | |
| location | text | nullable |
| notes | text | nullable |
| created_at | timestamp | |

### rsvps
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| event_id | uuid FK | → events |
| user_id | uuid FK | → users |
| status | enum | going \| maybe \| skip |
| updated_at | timestamp | |

---

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/webhook` | Clerk webhook — sync user to DB |

### Family
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/families` | Create a new family |
| POST | `/families/join` | Join via invite code |
| GET | `/families/:id` | Get family details + members |
| DELETE | `/families/:id/members/:userId` | Remove a member |

### Events
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/events` | List family events (filterable by category, date) |
| POST | `/events` | Create an event |
| GET | `/events/:id` | Get event detail + attendees |
| PATCH | `/events/:id` | Update event |
| DELETE | `/events/:id` | Delete event |
| POST | `/events/:id/rsvp` | Submit RSVP (going / maybe / skip) |

---

## Auth Flow (Clerk)

1. User signs in via Google OAuth or email magic link (Clerk)
2. Clerk issues a JWT session token
3. Mobile app attaches the token to every API request (`Authorization: Bearer <token>`)
4. Express middleware verifies the token using the Clerk SDK
5. Clerk webhook (`/auth/webhook`) fires on user creation → syncs user record to Neon
6. New users are prompted to create a family or join one with an invite code

---

## Navigation Structure (Expo Router)

```
/                        → redirect to (auth) or (tabs)
(auth)/sign-in           → Onboarding / Auth screen
(auth)/onboarding        → Carousel slides + family join
(tabs)/                  → Home Dashboard
(tabs)/calendar          → Family Calendar
(tabs)/browse            → Browse / Categories
(tabs)/profile           → Profile & Settings
events/[id]              → Event Detail (modal or push)
events/create            → Create Event Wizard (modal)
family/                  → Family Group screen
```

---

## Module Responsibilities

| Module | Mobile | API |
|--------|--------|-----|
| **auth** | Clerk provider, sign-in screen, onboarding | JWT middleware, Clerk webhook |
| **home** | Dashboard feed, quick-add | Events list endpoint |
| **calendar** | Month/Week/Agenda views | Events by date range |
| **events** | Detail screen, Create wizard, RSVP | Events CRUD, RSVP endpoint |
| **categories** | Browse screen, search | Events filter by category |
| **family** | Members list, invite, code share | Family CRUD, member management |
| **profile** | Settings, notification prefs, sign-out | User update |

---

## Development Phases

### Phase 1 — Foundation
- Monorepo setup (pnpm workspaces)
- Expo project with Expo Router
- Express API with TypeScript
- Neon DB + Drizzle schema + migrations
- Clerk auth integration (mobile + API)

### Phase 2 — Core Features
- Family creation and invite code flow
- Events CRUD (create, list, detail, delete)
- RSVP system
- Home dashboard + calendar views

### Phase 3 — Polish
- Browse / categories screen
- Search functionality
- Push notifications (Expo Notifications)
- Profile & settings screen

### Phase 4 — Extras (optional)
- Event photo attachments
- Comments / chat per event
- AI-powered event suggestions
- Recurring events support