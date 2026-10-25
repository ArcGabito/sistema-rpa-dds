import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Your account and the users moved under Configuración.
  async redirects() {
    return [
      { source: "/dashboard/cuenta", destination: "/dashboard/configuracion", permanent: true },
      { source: "/dashboard/usuarios/:path*", destination: "/dashboard/configuracion/usuarios/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
