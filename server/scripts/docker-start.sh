#!/bin/sh

set -eu

echo "Bootstrapping Family Things API..."

attempt=1
max_attempts="${DB_BOOTSTRAP_MAX_ATTEMPTS:-30}"
sleep_seconds="${DB_BOOTSTRAP_SLEEP_SECONDS:-2}"

until npx prisma db push; do
  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "Prisma schema sync failed after ${max_attempts} attempts."
    exit 1
  fi

  echo "Database not ready yet. Retrying in ${sleep_seconds}s..."
  attempt=$((attempt + 1))
  sleep "$sleep_seconds"
done

if [ "${SEED_DATABASE:-true}" = "true" ]; then
  echo "Seeding demo data..."
  node dist/prisma/seed.js
fi

echo "Starting API server..."
exec node dist/src/server.js
