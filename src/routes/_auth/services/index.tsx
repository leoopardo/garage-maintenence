import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/routes/_components/Input";
import { baseRequestI } from "@/services/__interfaces/baseRequest.interface";
import { useListBoards } from "@/services/boards/listBoards";
import { useListMechanicals } from "@/services/mechanicals/lisMechanicals";
import { useChangeServiceBoard } from "@/services/services/changeServiceBoard";
import { useChangeServiceStepStatus } from "@/services/services/changeStepStatus";
import { useDeleteService } from "@/services/services/deleteService";
import { useUpdateService } from "@/services/services/updateService";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Route = createFileRoute("/_auth/services/")({
  component: Services,
});

const ItemType = {
  SERVICE: "service",
};

function ServiceCard({ service, boardId }: any) {
  const [{}, drag] = useDrag({
    type: ItemType.SERVICE,
    item: { service, boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { mutate } = useChangeServiceStepStatus();
  const deleteService = useDeleteService();
  const [showSteps, setShowSteps] = useState(false);
  const mechanicals = useListMechanicals();
  const updateService = useUpdateService();

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-[100%]">
        <div
          ref={drag}
          className="ml-[3.5%] flex w-[93%] flex-col gap-2 rounded-lg bg-white p-2 pl-4 outline outline-1 outline-neutral-300 transition-all hover:scale-[1.03]"
          style={{ cursor: "move" }}
        >
          <ul className="gap4 flex flex-col gap-1">
            <li className="text-xs text-neutral-500">
              <Avatar className="h-6 w-6">
                <AvatarFallback
                  style={{
                    backgroundColor: service?.mechanical?.profileColor,
                  }}
                >
                  {service?.mechanical?.firstname[0]}
                  {service?.mechanical?.lastname[0]}
                </AvatarFallback>{" "}
              </Avatar>
            </li>
            <li className="text-xs text-neutral-500">
              Cliente:{" "}
              <span className="text-xs text-neutral-900">
                {service.clientId.name}
              </span>
            </li>
            <li className="text-xs text-neutral-500">
              Veículo:{" "}
              <span className="text-xs text-neutral-900">
                {service.vehicleId.brand} ({service.vehicleId.carModel})
              </span>
            </li>

            <li className="text-xs text-neutral-500">
              <div className="mb-2 flex justify-between text-xs text-neutral-500">
                Etapas{" "}
                <Button onClick={() => setShowSteps((prev) => !prev)} size="xs">
                  <ChevronDownIcon
                    width={14}
                    className={`${showSteps ? "rotate-180" : ""} transition-all`}
                  />
                </Button>
              </div>
              <motion.span
                animate={{
                  maxHeight: showSteps ? "300px" : "0px",
                  overflow: "hidden",
                }}
                className="text-md flex flex-col justify-center gap-1 text-neutral-900"
              >
                {service.steps.map((step: any) => (
                  <p className="flex items-center justify-between">
                    {step.statusId.name}

                    <Checkbox
                      checked={step.done}
                      onClick={() =>
                        mutate({
                          serviceId: service._id,
                          stepId: step.statusId._id,
                        })
                      }
                    />
                  </p>
                ))}
              </motion.span>
            </li>
          </ul>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Avançar etapa
          <ContextMenuShortcut>
            <ChevronDoubleRightIcon width={14} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Cancelar serviço
          <ContextMenuShortcut>
            <CloseOutlined width={14} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => deleteService.mutate({ serviceId: service._id })}
        >
          Excluir serviço
          <ContextMenuShortcut>
            <TrashIcon width={14} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        {/* <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub> */}
        <ContextMenuSeparator />
        <a href={service.quote.serviceOrderDocument} target="_blank">
          <ContextMenuItem inset>
            Visualizar orçamento{" "}
            <ContextMenuShortcut>
              <FilePdfOutlined />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </a>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={service?.mechanical?._id}>
          <ContextMenuLabel inset>Mecânico responsável</ContextMenuLabel>
          <ContextMenuSeparator />
          {Array.isArray(mechanicals?.data) &&
            mechanicals?.data?.map((mechanical) => (
              <ContextMenuRadioItem
                value={mechanical?._id}
                onClick={() =>
                  updateService.mutate({
                    serviceId: service._id,
                    body: { mechanical: mechanical._id },
                  })
                }
                style={{
                  backgroundColor:
                    service?.mechanical?._id === mechanical._id
                      ? mechanical.profileColor
                      : undefined,
                }}
              >
                {mechanical?.firstname} {mechanical?.lastname}
              </ContextMenuRadioItem>
            ))}
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function BoardColumn({ board, onDropService, boards }: any) {
  const [, drop] = useDrop({
    accept: ItemType.SERVICE,
    drop: (item: any) => {
      if (item.boardId !== board._id) {
        onDropService(item.service, item.boardId, board._id);
      }
    },
  });

  return (
    <div
      ref={drop}
      style={{
        height: "calc(100vh - 164px)",
      }}
      className="flex max-h-full flex-col overflow-auto rounded-lg bg-neutral-100"
    >
      <Badge
        className="text-neutral-60 sticky top-0 z-50 flex h-14 min-h-16 justify-between bg-neutral-100 text-sm hover:bg-neutral-100"
        style={{
          fontWeight: 400,
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        {board.name}: {board.services.length}
        <div
          style={{ backgroundColor: board.statusColor }}
          className="h-3 w-3 rounded-3xl"
        ></div>
      </Badge>
      <div className="mt-2 flex h-full w-full flex-col items-center gap-2">
        {board.services.map((service: any, index: any) => (
          <ServiceCard
            key={index}
            service={service}
            boardId={board._id}
            moveService={onDropService}
            boards={boards} // Passe todos os boards para checar a posição
          />
        ))}
      </div>
    </div>
  );
}

function Services() {
  const { open } = useSidebar();
  const [params] = useState<baseRequestI>({
    limit: 15,
    page: 1,
    search: "",
  });
  const [search, setSearch] = useState("");
  const mechanicals = useListMechanicals(params);
  const boards = useListBoards();
  const isMobile = useIsMobile();
  const changeBoard = useChangeServiceBoard();

  // Função para mover um serviço de um board para outro
  const moveService = (
    service: any,
    fromBoardId: string,
    toBoardId: string,
  ) => {
    changeBoard.mutate({ newBoardId: toBoardId, serviceId: service._id });
    console.log(`Movendo serviço de ${fromBoardId} para ${toBoardId}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full w-full flex-col gap-4 pt-0 marker:flex-1">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            AddonAfter={<Search width={16} />}
          />
          <div className="flex">
            {!Array.isArray(mechanicals?.data) &&
              mechanicals.data?.data?.map((mechanical, index) => {
                if (index === 3)
                  return (
                    <Avatar
                      className={`z-[${index}] ml-[-8px] border-orange-400 border-opacity-50 transition-all duration-200 hover:z-50 hover:border-4`}
                    >
                      <AvatarFallback className="bg-neutral-300">
                        +
                        {!Array.isArray(mechanicals?.data) &&
                          (mechanicals?.data?.data.length || 0) - 3}
                      </AvatarFallback>
                    </Avatar>
                  );
                return (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Avatar
                          className={`z-[${index}] ml-[${index !== 0 ? "-8px" : ""}] border-orange-400 border-opacity-80 transition-all duration-200 hover:z-50 hover:border-2`}
                        >
                          <AvatarImage src={mechanical.profilePicture} />
                          <AvatarFallback
                            style={{
                              backgroundColor: mechanical.profileColor,
                            }}
                          >
                            {mechanical.firstname[0]}
                            {mechanical.lastname[0]}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="flex flex-col gap-1">
                          <span>
                            {mechanical.firstname} {mechanical.lastname}
                          </span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            <Avatar
              className={
                "ml-[-8px] border-orange-400 border-opacity-50 transition-all duration-200 hover:z-50 hover:border-4"
              }
            >
              <AvatarFallback className="cursor-pointer bg-orange-400">
                +
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <Button>
              <PlusIcon width={18} />
              Novo orçamento
            </Button>
          </div>
        </div>
        <div
          style={{
            maxWidth: `calc(100vw - ${isMobile ? "0px" : open ? "310px" : "0px"})`,
            gridTemplateColumns: `repeat(${isMobile ? 1 : boards?.data?.length || 1}, minmax(238px, 1fr))`,
          }}
          className="duration-[350ms] grid gap-2 overflow-auto rounded-xl transition-all"
        >
          {boards?.data?.map((board, index) => (
            <BoardColumn
              key={index}
              board={board}
              onDropService={moveService}
              boards={boards?.data}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
