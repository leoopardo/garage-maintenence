import { DataTableDemo } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDebounce from "@/hooks/useDebounce";
import { baseRequestI } from "@/services/__interfaces/baseRequest.interface";
import { ClientI } from "@/services/clients/listClients";
import {
  useListVehicles,
  VehicleI,
} from "@/services/clients/vehicles/listClients";
import { createFileRoute } from "@tanstack/react-router";
import { Ellipsis, Pencil, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateClient } from "../_components/create";

export const Route = createFileRoute("/_auth/clients/vehicles/")({
  component: Vehicles,
});

function Vehicles() {
  const [params, setParams] = useState<baseRequestI>({
    limit: 15,
    page: 1,
    search: "",
  });
  const [debouncedParams, setDebouncedParams] = useState<baseRequestI>(params);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const debounceSearch = useDebounce((value) => {
    if (value) {
      setDebouncedParams({ ...params, search: "" });
    }

    setDebouncedParams({ ...params, search: value });
  }, 500);

  useEffect(() => {
    debounceSearch(params.search);
  }, [params]);

  const { data } = useListVehicles(debouncedParams);

  return (
    <Drawer
      direction="right"
      open={isCreateOpen}
      onOpenChange={setIsCreateOpen}
    >
      <div className="mb-[-16px] mt-[-50px] flex w-full justify-end gap-2">
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon />
          Cadastrar veículo
        </Button>
      </div>

      <DataTableDemo<VehicleI>
        tableName="Veículo"
        setParams={setParams}
        params={params}
        columns={[
          {
            id: "_id",
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
          {
            accessorKey: "owner",
            header: "Dono",
            cell: ({ row }) => (row?.getValue("owner") as ClientI)?.name,
          },

          {
            accessorKey: "brand",
            header: "Marca",
          },
          {
            accessorKey: "carModel",
            header: "Modelo",
          },
          {
            accessorKey: "year",
            header: "Ano",
          },
          {
            accessorKey: "createdAt",
            header: "Criado em",
            cell: ({ row }) =>
              new Date(row.getValue("createdAt")).toLocaleDateString(),
          },
          {
            accessorKey: "_id",
            header: "Ações",
            cell: () => (
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Pencil />
                      Editar dados
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash />
                      Excluir{" "}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ),
          },
        ]}
        data={!Array.isArray(data) ? data?.data || [] : []}
      />
      <CreateClient open={isCreateOpen} setOpen={setIsCreateOpen} />
    </Drawer>
  );
}
