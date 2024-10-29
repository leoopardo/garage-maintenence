import { baseRequestI } from "@/services/__interfaces/baseRequest.interface";
import { useListMechanicals } from "@/services/mechanicals/listUsers";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/mechanicals/")({
  component: Mechanicals,
});

function Mechanicals() {
  const [params] = useState<baseRequestI>({
    limit: 15,
    page: 1,
    search: "",
  });
  const {} = useListMechanicals(params);
  return (
    <div>
      <h1>Mechanicals</h1>
    </div>
  );
}
