# Docker Infrastructure

The root `server/docker-compose.yml` is the local development stack.

Recommended production shape:

- one API image
- managed PostgreSQL
- managed Redis
- external SMTP/push providers
- secrets supplied by the host platform
