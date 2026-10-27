import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/auth";

// Whether the API and its database are up, for the wake-up ping in
// lib/despertar.ts. Always 200: "not ready yet" is an answer, not an error.
export const maxDuration = 30;

export async function GET() {
  try {
    const response = await fetch(`${getApiUrl()}/health/db`, {
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    });
    const data = await response.json().catch(() => null);
    return NextResponse.json({ listo: response.ok && data?.listo === true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ listo: false }, { headers: { "Cache-Control": "no-store" } });
  }
}
