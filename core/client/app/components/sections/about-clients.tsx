import { ClientLogo } from "@/components/ui/client-logo";
import { Container } from "@/components/ui/container";
import { CLIENTS } from "@/lib/clients";

export function AboutClients() {
  return (
    <section className="bg-brand-50 py-16">
      <Container>
        <p className="text-sm text-ink-700">
          Empresas que ya confían en Data Discovery Solutions
        </p>
        <ul className="mt-6 grid grid-cols-3 items-center gap-x-6 gap-y-4 sm:grid-cols-6">
          {CLIENTS.map((client) => (
            <li key={client.name} className="flex justify-center">
              <ClientLogo client={client} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
