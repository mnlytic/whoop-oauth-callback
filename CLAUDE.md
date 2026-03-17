# whoop-oauth-callback

Minimal Next.js (App Router) service that acts as a WHOOP OAuth2 redirect target.

## Architecture

- `/app/page.tsx` — health check page
- `/app/api/whoop/callback/route.ts` — receives OAuth callback, exchanges `code` for tokens via Basic Auth against `https://api.prod.whoop.com/oauth/oauth2/token`
- `/app/whoop/callback/page.tsx` — browser-friendly callback view

## Environment Variables (Vercel)

- `WHOOP_CLIENT_ID`
- `WHOOP_CLIENT_SECRET`
- `WHOOP_REDIRECT_URI` — must match what's registered in WHOOP developer portal

## WHOOP API

- OpenAPI spec: `docs/openapi.json`
- Token endpoint: `https://api.prod.whoop.com/oauth/oauth2/token`
- Auth method: Basic Auth (`client_id:client_secret` base64-encoded)

## Deployment

- Hosted on Vercel (team: cirith)
- GitHub repo: `mnlytic/whoop-oauth-callback`
- Auto-deploys on push to `main`
- Production URL: `https://whoop-oauth-callback-omega.vercel.app`
