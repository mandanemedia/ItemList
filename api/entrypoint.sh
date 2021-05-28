#!/bin/bash
sleep 5
dsn=${POSTGRES_DSN?POSTGRES_DSN environment variable must be set}

/migrate -verbose \
  -database "$dsn" \
  -path /db/migrations \
  up

# run dev
npm run dev