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
cd server
cp .env.example .env
npm install
npm run db:generate
docker compose up -d postgres redis mailhog
npm run db:push
npm run db:seed
npm run dev
```

The API runs at `http://localhost:8080/api`.

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
