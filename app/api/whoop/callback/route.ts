import { NextRequest, NextResponse } from "next/server";

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

  if (!code && !error) {
    return NextResponse.json(
      { error: "missing_code", message: "No 'code' or 'error' parameter received." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    code: code ?? null,
    state: state ?? null,
    error: error ?? null,
    error_description: errorDescription ?? null,
  });
}
