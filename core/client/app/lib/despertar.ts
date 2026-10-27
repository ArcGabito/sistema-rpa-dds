import { sileo } from "sileo";

// The API runs on Azure Container Apps scaled to zero, and its Azure SQL
// database auto-pauses: after a few idle minutes the first request waits up
// to a minute while they start, or gets a 502/503/504. These helpers tell the
// user the server is waking up instead of leaving the page looking broken.

const AVISO_TEMPRANO_MS = 1500;
const REINTENTO_MS = 4000;
const LIMITE_MS = 120_000;
// The container scales to zero after about 5 idle minutes. Until then a slow
// request is just slow, not the server waking up.
const DORMIDO_TRAS_MS = 4.5 * 60_000;

// The server didn't answer: fetch failed (status 0) or a 502/503/504.
export class ServidorNoDisponible extends Error {
  constructor(
    readonly status: number,
    message = "El servidor no responde. Intenta de nuevo en unos segundos.",
  ) {
    super(message);
  }
}

// Page load counts as a response: it was rendered with data from the API.
let ultimaRespuesta = Date.now();

export function quizaDormido() {
  return Date.now() - ultimaRespuesta > DORMIDO_TRAS_MS;
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// One toast however many requests are waiting: the first to show it creates
// it, the rest only add a use, and the last to close it dismisses it.
let toast: { id: string; usos: number } | null = null;

function avisoDespertando() {
  // So the same caller never counts twice.
  let abierto = false;
  return {
    get abierto() {
      return abierto;
    },
    mostrar() {
      if (abierto) return;
      abierto = true;
      if (toast) {
        toast.usos++;
        return;
      }
      toast = {
        id: sileo.show({
          type: "loading",
          title: "Despertando servidor",
          description: "Estaba en reposo para ahorrar recursos. La primera vez puede tardar hasta un minuto.",
          duration: null,
        }),
        usos: 1,
      };
    },
    cerrar() {
      if (!abierto || !toast) return;
      abierto = false;
      if (--toast.usos === 0) {
        sileo.dismiss(toast.id);
        toast = null;
      }
    },
  };
}

// Runs the request, showing the toast if it takes long (Azure holds requests
// while the container starts) and retrying every few seconds, for up to two
// minutes, while it fails with an error puedeReintentar accepts. Any other
// error is thrown right away.
export async function conDespertar<T>(
  peticion: () => Promise<T>,
  puedeReintentar: (error: unknown) => boolean,
  { avisoTemprano = true }: { avisoTemprano?: boolean } = {},
): Promise<T> {
  const aviso = avisoDespertando();
  const temprano = avisoTemprano ? setTimeout(aviso.mostrar, AVISO_TEMPRANO_MS) : undefined;
  const limite = Date.now() + LIMITE_MS;

  try {
    for (;;) {
      try {
        const resultado = await peticion();
        ultimaRespuesta = Date.now();
        return resultado;
      } catch (error) {
        if (!puedeReintentar(error) || Date.now() + REINTENTO_MS > limite) throw error;
        aviso.mostrar();
        await esperar(REINTENTO_MS);
      }
    }
  } finally {
    clearTimeout(temprano);
    aviso.cerrar();
  }
}

async function estaListo() {
  try {
    const response = await fetch("/api/estado", { cache: "no-store" });
    const data = await response.json();
    return data?.listo === true;
  } catch {
    return false;
  }
}

let enCurso: Promise<void> | null = null;

// Pings /api/estado until the API and its database answer, so they start
// while the user is still typing. Only one ping runs at a time.
export function despertarServidor() {
  enCurso ??= (async () => {
    const aviso = avisoDespertando();
    const temprano = setTimeout(aviso.mostrar, AVISO_TEMPRANO_MS);
    const limite = Date.now() + LIMITE_MS;

    try {
      while (!(await estaListo())) {
        if (Date.now() + REINTENTO_MS > limite) {
          if (aviso.abierto) {
            sileo.error({ title: "El servidor no responde", description: "Intenta de nuevo en unos minutos." });
          }
          return;
        }
        aviso.mostrar();
        await esperar(REINTENTO_MS);
      }
      ultimaRespuesta = Date.now();
      // No "you can sign in now": the visitor may have already.
      if (aviso.abierto) sileo.success({ title: "Servidor listo" });
    } finally {
      clearTimeout(temprano);
      aviso.cerrar();
      enCurso = null;
    }
  })();
  return enCurso;
}
