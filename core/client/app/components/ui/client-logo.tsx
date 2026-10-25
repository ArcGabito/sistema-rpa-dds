import Image from "next/image";
import type { Client } from "@/lib/clients";

// A client's logo. The files have an opaque white background: on light
// surfaces `multiply` drops the white so the logo sits on the page's own
// grey; on dark ones the logo goes on a white tile instead.
export function ClientLogo({ client, className = "h-10", tile = false }: { client: Client; className?: string; tile?: boolean }) {
  const logo = <Image src={client.logo} alt={client.name} width={150} height={50} className={`w-auto ${tile ? "h-full" : `${className} mix-blend-multiply`}`} />;
  if (!tile) return logo;
  return <span className={`flex items-center justify-center rounded-md bg-white px-2 ${className}`}>{logo}</span>;
}
