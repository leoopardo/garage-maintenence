import { createFileRoute } from "@tanstack/react-router";
import { RegisterSubDomain } from "./_register/registerSubdomain";
import { RegisterAccount } from "./_register/registerAccount";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const subdomain = window.location.hostname.split(".")[0];

  if (window.location.hostname.split(".").length >= 2 && subdomain) {
    return <RegisterAccount />;
  }

  return <RegisterSubDomain />;
}
