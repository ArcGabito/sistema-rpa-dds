// Clients shown on the site and the sign-in page, best known first. Each
// logo is a 150×50 PNG in public/assets on an opaque white background (see
// components/ui/client-logo.tsx for how it sits on other backgrounds).
export const CLIENTS = [
  { name: "BCP", logo: "/assets/bcp.png" },
  { name: "BanBif", logo: "/assets/banbif.png" },
  { name: "AFP Integra", logo: "/assets/afp-integra.png" },
  { name: "AFP Habitat", logo: "/assets/habitat.png" },
  { name: "El Comercio", logo: "/assets/el-comercio.png" },
  { name: "Amcor", logo: "/assets/amcor.png" },
  { name: "Praxair", logo: "/assets/praxair.png" },
  { name: "Los Portales", logo: "/assets/los-portales.png" },
  { name: "Pandero", logo: "/assets/pandero.png" },
  { name: "La Calera", logo: "/assets/la-calera.png" },
  { name: "Lima Tours", logo: "/assets/lima-tours.png" },
  { name: "Innova Schools", logo: "/assets/innova-schools.png" },
  { name: "Invetsa", logo: "/assets/invetsa.png" },
  { name: "Colquisiri", logo: "/assets/colquisiri.png" },
  { name: "Crepier", logo: "/assets/crepier.png" },
  { name: "Frenosa", logo: "/assets/frenosa.png" },
  { name: "Miski Mayo", logo: "/assets/miski-mayo.png" },
  { name: "Las Palmas", logo: "/assets/palmas.png" },
] as const;

export type Client = (typeof CLIENTS)[number];

// The same logo in white on transparent, for dark and blue surfaces:
// public/assets/clientes-blanco, made from each PNG with the pixel's
// darkness as its opacity.
export function logoBlanco(client: Client) {
  return client.logo.replace("/assets/", "/assets/clientes-blanco/");
}
