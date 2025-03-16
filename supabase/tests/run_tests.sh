#!/bin/bash
# Script to run database function tests

# Get database URL from Supabase
DB_URL=$(supabase db connection-string 2>/dev/null)

if [ -z "$DB_URL" ]; then
  echo "Error: Could not get database connection string from Supabase."
  echo "Make sure you have Supabase CLI installed and configured."
  exit 1
fi

# Ensure pgTAP extension is installed
echo "Ensuring pgTAP extension is installed..."
psql "$DB_URL" -c "CREATE EXTENSION IF NOT EXISTS pgtap;"

# Run the tests
echo "Running database function tests..."
psql "$DB_URL" -f db_function_tests.sql

echo "Tests completed." 