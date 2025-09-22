#!/bin/bash
set -e

echo "🔄 Starting PostgreSQL..."

# Start PostgreSQL in background
docker-entrypoint.sh postgres &

# Wait for PostgreSQL to be ready
until pg_isready -U admin -d todolist; do
  echo "⏳ Waiting for PostgreSQL to become ready..."
  sleep 3
done

# Apply collation fix
echo "🔧 Applying collation fix..."
psql -U admin -d todolist -c "ALTER DATABASE todolist REFRESH COLLATION VERSION;" && echo "✅ Collation refreshed"

# Wait for postgres to stay in foreground
wait
