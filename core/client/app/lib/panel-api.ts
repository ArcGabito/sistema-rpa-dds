import { conDespertar, quizaDormido, ServidorNoDisponible } from "@/lib/despertar";

// For client components: call the API through the authenticated proxy in
// app/api/panel. Never throws; `message` is ready to show in a toast.
export type PanelResult<T> = { ok: true; data: T } | { ok: false; status: number; message: string };

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function pedir<T>(path: string, method: Method, body: unknown): Promise<PanelResult<T>> {
  let response: Response;
  try {
    response = await fetch(`/api/panel/${path}`, {
      method,
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ServidorNoDisponible(0, "Ocurrió un error de conexión.");
  }
  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (response.status >= 502 && response.status <= 504) {
    throw new ServidorNoDisponible(response.status, data?.message);
  }
  if (!response.ok) {
    return { ok: false, status: response.status, message: data?.message ?? "Intenta de nuevo." };
  }
  return { ok: true, data: data as T };
}

export async function panelFetch<T = unknown>(
  path: string,
  init?: { method?: Method; body?: unknown },
): Promise<PanelResult<T>> {
  const method = init?.method ?? "GET";
  try {
    return await conDespertar(
      () => pedir<T>(path, method, init?.body),
      // A 502/504 on a write may arrive after the API already did it, so
      // repeating it could do it twice. A 503 means it never got there.
      (error) => error instanceof ServidorNoDisponible && (method === "GET" || error.status === 503),
      { avisoTemprano: quizaDormido() },
    );
  } catch (error) {
    if (error instanceof ServidorNoDisponible) return { ok: false, status: error.status, message: error.message };
    return { ok: false, status: 0, message: "Ocurrió un error de conexión." };
  }
}
