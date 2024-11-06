import { DataTableDemo } from "@/components/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDebounce from "@/hooks/useDebounce";
import { baseRequestI } from "@/services/__interfaces/baseRequest.interface";
import { ClientI, useListClients } from "@/services/clients/listClients";
import { VehicleI } from "@/services/clients/vehicles/listClients";
import { formatter } from "@/utils/formatter";
import { createFileRoute } from "@tanstack/react-router";
import { ColorPicker } from "antd";
import { Ellipsis, Pencil, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateClient } from "./_components/create";

export const Route = createFileRoute("/_auth/clients/")({
  component: Clients,
});

function Clients() {
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

  const { data } = useListClients(debouncedParams);

  return (
    <Drawer
      direction="right"
      open={isCreateOpen}
      onOpenChange={setIsCreateOpen}
    >
      <div className="mb-[-16px] mt-[-50px] flex w-full justify-end gap-2">
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon />
          Cadastrar cliente
        </Button>
      </div>

      <DataTableDemo<ClientI>
        tableName="Cliente"
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
            accessorKey: "name",
            header: "Nome",
          },
          {
            accessorKey: "vehicles",
            header: "Veículos",
            cell: ({ row }) => (
              <Drawer direction="right">
                <DrawerTrigger>
                  <p className="cursor-pointer text-blue-500 transition-all hover:text-blue-400">
                    Visualizar
                  </p>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      Veículos de {row.getValue("name")}
                    </DrawerTitle>
                    <DrawerDescription>
                      Visualize todos os veículos do cliente.
                    </DrawerDescription>
                  </DrawerHeader>

                  <Accordion type="multiple" className="p-2">
                    {(row?.getValue("vehicles") as any)?.length >= 1 ? (
                      (row?.getValue("vehicles") as any)?.map(
                        (vehicle: VehicleI) => (
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              {vehicle.brand} {vehicle.carModel} -{" "}
                              {vehicle.year}
                            </AccordionTrigger>
                            <AccordionContent className="rounded-md bg-neutral-50 p-4">
                              <ul className="flex flex-col gap-2">
                                <li className="flex items-center gap-2">
                                  Placa <hr className="w-3/12" />{" "}
                                  {vehicle.licensePlate}
                                </li>
                                {vehicle.kilometers && (
                                  <li className="flex items-center gap-2">
                                    Quilometragem <hr className="w-3/12" />{" "}
                                    {vehicle.kilometers} km
                                  </li>
                                )}
                                <li className="flex items-center gap-2">
                                  Cor <hr className="w-3/12" />{" "}
                                  <ColorPicker value={vehicle.color} />
                                </li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ),
                      )
                    ) : (
                      <div className="flex h-[60vh] items-center justify-center">
                        <p
                          style={{ textAlign: "center" }}
                          className="w-[80%] text-neutral-400"
                        >
                          Cliente ainda não possui veículos cadastrados.
                        </p>
                      </div>
                    )}
                  </Accordion>

                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </Drawer>
            ),
          },
          {
            accessorKey: "cellphone",
            header: "Telefone",
            cell: ({ row }) => formatter.cellphone(row.getValue("cellphone")),
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

export default Clients;
