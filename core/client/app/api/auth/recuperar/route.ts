import { forwardAuth } from "@/lib/auth-forward";

export function POST(request: Request) {
  return forwardAuth(request, "recuperar");
}
