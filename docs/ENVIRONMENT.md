# Environment

## Web
Copy root .env.example to apps/web/.env.local.

- NEXT_PUBLIC_APP_NAME
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- API_INTERNAL_URL (server only)

## API
Copy apps/api/.env.example to apps/api/.env.

- APP_NAME, APP_ENV, APP_DEBUG, API_HOST, API_PORT
- WEB_ORIGIN, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, LOG_LEVEL

No service-role or model-provider secret is required in Stage 1.
