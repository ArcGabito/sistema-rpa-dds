import Image from "next/image";
import { Band, H3, HAIRLINE, MonoLabel } from "@/components/ui/band";
import { CLIENTS, logoBlanco } from "@/lib/clients";

const GLOW =
  "radial-gradient(60% 100% at 50% 100%, rgb(91 149 247 / 0.55) 0%, rgb(37 99 235 / 0.2) 45%, rgb(19 19 21 / 0) 78%)";

// The clients' logos in white, in a hairline grid on a dark band.
export function AboutClients() {
  return (
    <Band
      tone="night"
      backdrop={<div className="pointer-events-none absolute inset-x-0 bottom-0 h-56" style={{ backgroundImage: GLOW }} aria-hidden="true" />}
    >
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <h2 className={`max-w-lg ${H3}`}>Empresas que ya confían en Data Discovery Solutions.</h2>
        <MonoLabel tone="night" className="lg:text-right">Más de 30 clientes.</MonoLabel>
      </div>
      <ul className={`mt-12 grid grid-cols-2 border-t sm:grid-cols-3 lg:grid-cols-6 ${HAIRLINE.night}`}>
        {CLIENTS.map((client) => (
          <li key={client.name} className={`-mr-px -mb-px flex h-24 items-center justify-center border-r border-b px-4 ${HAIRLINE.night}`}>
            <Image src={logoBlanco(client)} alt={client.name} width={150} height={50} className="h-9 w-auto opacity-85" />
          </li>
        ))}
      </ul>
      <div className="h-16 sm:h-20" />
    </Band>
  );
}
