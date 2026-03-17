import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://api.prod.whoop.com/oauth/oauth2/token";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  console.log("[WHOOP Callback]", {
    code: code ?? undefined,
    state: state ?? undefined,
    error: error ?? undefined,
    error_description: errorDescription ?? undefined,
    timestamp: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error, error_description: errorDescription }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json(
      { error: "missing_code", message: "No 'code' parameter received." },
      { status: 400 }
    );
  }

  const clientId = process.env.WHOOP_CLIENT_ID;
  const clientSecret = process.env.WHOOP_CLIENT_SECRET;
  const redirectUri = process.env.WHOOP_REDIRECT_URI;

  console.log("[WHOOP Debug]", {
    clientId_prefix: clientId?.slice(0, 8),
    secret_len: clientSecret?.length,
    redirectUri,
  });

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "server_config", message: "Missing WHOOP_CLIENT_ID, WHOOP_CLIENT_SECRET, or WHOOP_REDIRECT_URI env vars." },
      { status: 500 }
    );
  }

  // Try JSON body — some WHOOP docs suggest this format
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }).toString(),
  });

  const tokenData = await tokenRes.json();

  console.log("[WHOOP Token Exchange]", {
    status: tokenRes.status,
    has_access_token: !!tokenData.access_token,
    timestamp: new Date().toISOString(),
  });

  if (!tokenRes.ok) {
    return NextResponse.json(
      {
        error: "token_exchange_failed",
        status: tokenRes.status,
        details: tokenData,
        debug: {
          clientId_prefix: clientId.slice(0, 8),
          secret_length: clientSecret.length,
          redirect_uri: redirectUri,
        },
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token ?? null,
    expires_in: tokenData.expires_in ?? null,
    token_type: tokenData.token_type ?? null,
    scope: tokenData.scope ?? null,
    state: state ?? null,
  });
}
