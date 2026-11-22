import { IngresarForm } from "@/components/auth/ingresar-form";

// Public demo with fictitious data: the form shows the demo account's
// credentials (a user with a limited role that the API seeds from Demo:Email /
// Demo:Password). Without DEMO_LOGIN_EMAIL and DEMO_LOGIN_PASSWORD nothing is
// shown; the page is prerendered, so changing them takes a redeploy.
export default function IngresarPage() {
  const demo =
    process.env.DEMO_LOGIN_EMAIL && process.env.DEMO_LOGIN_PASSWORD
      ? { email: process.env.DEMO_LOGIN_EMAIL, password: process.env.DEMO_LOGIN_PASSWORD }
      : undefined;

  return <IngresarForm demo={demo} />;
}
