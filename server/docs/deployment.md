# Deployment

## Docker

```bash
docker compose up --build
```

The compose stack includes:

- API
- PostgreSQL
- Redis
- MailHog

## Production Checklist

- Set a strong `JWT_SECRET`
- Set `DATABASE_URL`
- Set `REDIS_URL` when workers are enabled
- Restrict `CORS_ALLOWED_ORIGINS`
- Run `npm run db:deploy`
- Expose `/health`, `/ready`, and `/metrics`
- Ship logs to a centralized log platform

## Infrastructure

The `infrastructure/` directory includes starter Kubernetes, Terraform, GitHub Actions, Prometheus, and Grafana files. Treat them as environment-specific templates rather than final cloud credentials.
