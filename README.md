# whoop-oauth-callback

Minimal Next.js service to capture WHOOP OAuth authorization codes.

## Routes

- `/` — health check
- `/api/whoop/callback` — API endpoint, returns JSON with `code`, `state`, `error`, `error_description`
- `/whoop/callback` — browser-friendly page rendering the same params

## Setup

```bash
cp .env.example .env.local
# fill in your WHOOP credentials
npm run dev
```

## Deploy

```bash
vercel --prod
```

Set your WHOOP redirect URI to `https://<your-domain>/api/whoop/callback`.
