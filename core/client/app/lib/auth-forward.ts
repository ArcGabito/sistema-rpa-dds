import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/auth";
import { clientIpHeaders, tooManyRequests } from "@/lib/client-ip";

// Passes a signed-out request from the sign-in pages (forgotten password) on
// to the API with the visitor's signed IP, so its rate limits apply per
// visitor. Answers with the API's status and { message }.
export async function forwardAuth(request: Request, path: string) {
  const body = await request.text();
  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${getApiUrl()}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...clientIpHeaders(request) },
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ message: "No se pudo conectar con el servidor. Intenta de nuevo." }, { status: 502 });
  }

  if (backendResponse.status === 429) {
    const data = await tooManyRequests(backendResponse);
    return NextResponse.json(data, { status: 429, headers: { "Retry-After": String(data.retryAfterSeconds) } });
  }
  if (backendResponse.status === 204) return new NextResponse(null, { status: 204 });

  const data = await backendResponse.json().catch(() => null);
  const first = data?.errors && Object.values(data.errors as Record<string, string[]>).flat()[0];
  const message = typeof data?.message === "string" ? data.message : typeof first === "string" ? first : "No se pudo completar la acción.";
  return NextResponse.json({ message }, { status: backendResponse.status });
}
