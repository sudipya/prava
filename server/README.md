# PRAVA API

PostgreSQL-backed API for wallets, payment requests, and server-side live FX rates.

```sh
cp .env.example .env
createdb prava
psql "$DATABASE_URL" -c 'create extension if not exists pgcrypto;'
psql "$DATABASE_URL" -f schema.sql
npm install
npm start
```

Set the mobile app's `EXPO_PUBLIC_API_URL` to the deployed API URL. Never ship `DATABASE_URL` or provider credentials in the app.
