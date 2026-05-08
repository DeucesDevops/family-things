# Architecture

Family Things uses a modular Express.js monolith. The backend deploys as one application, but each business capability owns its own route, controller, service, repository, schema, mapper, and types.

```txt
Mobile App
  -> Express API
    -> Module service
      -> Repository
        -> Prisma
          -> PostgreSQL
```

Redis is included for queues and future caching. BullMQ workers are disabled by default and can be enabled with `ENABLE_WORKERS=true`.

## Module Boundaries

- `auth`: registration, login, tokens, password hashing
- `users`: profile reads and edits
- `families`: family creation, joining, invite codes, membership context
- `events`: shared calendar events
- `reminders`: grooming, health, birthday, errand, holiday reminders
- `suggestions`: outing and activity suggestions with votes
- `wishes`: generated or manually written family wish drafts
- `notifications`: in-app notification records and event-driven messages

## Request Flow

```txt
route -> auth middleware -> validation -> controller -> service -> repository -> Prisma
```

Services may emit internal events through `events/event-bus.ts`. Event handlers create notifications without requiring external message brokers at MVP stage.
