# Database

The app uses a single PostgreSQL database with Prisma.

Core tables:

- `app_users`
- `refresh_tokens`
- `families`
- `family_members`
- `family_events`
- `reminders`
- `suggestions`
- `votes`
- `wish_drafts`
- `notifications`

The Prisma schema maps to snake_case table and column names so the database remains conventional while TypeScript code uses camelCase.

Local commands:

```bash
npm run db:generate
npm run db:push
npm run db:seed
npm run db:studio
```
