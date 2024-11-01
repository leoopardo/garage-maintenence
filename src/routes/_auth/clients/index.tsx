import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/clients/")({
  component: Clients,
});

function Clients() {
  return (
    <div>
      <a href="https://res.cloudinary.com/dia52ris4/raw/upload/v1730493446/orders/ekf6ff7pyhslhmixraxe">
        arquivo
      </a>
    </div>
  );
}

export default Clients;
