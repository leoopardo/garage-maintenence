import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/services/")({
  component: Services,
});

function Services() {
  const [params, setParams] = useState<baseRequestI>({
    limit: 15,
    page: 1,
    search: "",
  });
  const [search, setSearch] = useState("");
  const mechanicals = useListMechanicals(params);
  const boards = useListBoards();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full w-full flex-col gap-4 pt-0 marker:flex-1">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          AddonAfter={<Search width={16} />}
        />
        <div className="flex">
          {mechanicals.data?.data?.map((mechanical, index) => {
            if (index === 3)
              return (
                <Avatar
                  className={`z-[${index}] ml-[-8px] border-orange-400 border-opacity-50 transition-all duration-200 hover:z-50 hover:border-4`}
                >
                  <AvatarFallback className="bg-neutral-300">
                    +{(mechanicals?.data?.data.length || 0) - 3}
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
      </div>
      <div
        style={{
          maxWidth: `calc(100vw - ${isMobile ? "0px" : "310px"})`,
          gridTemplateColumns: `repeat(${isMobile ? 1 : boards?.data?.length || 1}, minmax(238px, 1fr))`,
        }}
        className="grid gap-2 overflow-auto rounded-xl"
      >
        {boards?.data?.map((board, index) => (
          <div
            key={index}
            style={{
              height: "calc(100vh - 164px)",
            }}
            className="flex max-h-full flex-col overflow-auto rounded-lg bg-neutral-100"
          >
            <Badge
              className="text-neutral-60 flex h-14 justify-between bg-neutral-100 text-sm hover:bg-neutral-100"
              style={{ fontWeight: 400 }}
            >
              {board.name}: {board.services.length}
              <div
                style={{ backgroundColor: board.statusColor }}
                className="h-3 w-3 rounded-3xl"
              ></div>
            </Badge>
            {board.services.map((service, index) => (
              <div key={index} className="flex flex-col gap-2"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
