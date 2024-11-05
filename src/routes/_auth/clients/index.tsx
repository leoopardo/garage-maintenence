import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/clients/")({
  component: Clients,
});

function Clients() {
  return (
    <div>
      <a href="https://res.cloudinary.com/dia52ris4/raw/upload/v1730731387/orders/order_1730731387623.pdf">
        arquivo
      </a>
    </div>
  );
}

export default Clients;
