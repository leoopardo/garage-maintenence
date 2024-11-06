import { DataTableDemo } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/ui/drawer";
import useDebounce from "@/hooks/useDebounce";
import { baseRequestI } from "@/services/__interfaces/baseRequest.interface";
import {
  MechanicalI,
  useListMechanicals,
} from "@/services/mechanicals/lisMechanicals";
import { formatter } from "@/utils/formatter";
import { PlusIcon } from "@heroicons/react/24/solid";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CreateMechanical } from "./_components/create";

export const Route = createFileRoute("/_auth/mechanicals/")({
  component: Mechanicals,
});

function Mechanicals() {
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

  const { data } = useListMechanicals(debouncedParams);

  return (
    <Drawer
      direction="right"
      open={isCreateOpen}
      onOpenChange={setIsCreateOpen}
    >
      <div className="mt-[-50px] flex w-full justify-end gap-2">
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon />
          Cadastrar mecânico
        </Button>
      </div>

      <DataTableDemo<MechanicalI>
        tableName="Mecânico"
        setParams={setParams}
        params={params}
        columns={[
          {
            id: "select",
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
            accessorKey: "firstname",
            header: "Nome",
          },
          {
            accessorKey: "lastname",
            header: "Nome",
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
        ]}
        data={!Array.isArray(data) ? data?.data || [] : []}
      />
      <CreateMechanical open={isCreateOpen} setOpen={setIsCreateOpen} />
    </Drawer>
  );
}
