# Family Things API

Express.js + TypeScript backend for the Family Things mobile app.

## Stack

- Express.js modular monolith
- TypeScript
- PostgreSQL + Prisma
- Redis + BullMQ-ready job layer
- JWT authentication
- Zod request validation
- Pino logging
- Prometheus metrics
- Vitest + Supertest
- Docker and infrastructure scaffolding

## Local Setup

```bash
docker compose up --build
```

That single command now:

- builds the API image
- starts PostgreSQL, Redis, MailHog, and the API
- waits for PostgreSQL to become ready
- runs `prisma db push`
- seeds demo data idempotently

The API runs at `http://localhost:8080/api`.

Run it from the repository root. If you prefer working inside `server/`, `docker compose up --build` works there too.

If you want to override any local defaults, create `server/.env` from [server/.env.example](/Users/bernardboateng/Desktop/Projects/mobile/family-things-mobile/server/.env.example) and Docker Compose will pick those values up automatically.

## MVP Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `POST /api/families`
- `POST /api/families/join`
- `GET /api/families/me`
- `GET /api/events`
- `POST /api/events`
- `GET /api/reminders`
- `POST /api/reminders`
- `GET /api/suggestions`
- `POST /api/suggestions/:id/vote`
- `GET /api/wishes`
- `POST /api/wishes`
- `GET /api/notifications`

Authenticated requests need:

```txt
Authorization: Bearer <token>
```

## Health

- `GET /health`
- `GET /ready`
- `GET /metrics`
- `GET /api/docs`

## Structure

```txt
src/
  app.ts
  server.ts
  routes.ts
  common/
  config/
  db/
  docs/
  events/
  integrations/
  jobs/
  modules/
prisma/
tests/
docs/
infrastructure/
```
