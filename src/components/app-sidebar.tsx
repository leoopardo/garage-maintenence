import { CarIcon, LifeBuoy, Send } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetMe } from "@/services/auth/getMe";
import { useGetConfig } from "@/services/subdomain/getConfigs";
import { DashboardOutlined } from "@ant-design/icons";
import {
  FolderOpenIcon,
  NewspaperIcon,
  UserCircleIcon,
  UsersIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";

export const SidebarItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardOutlined,
      items: [
        {
          title: "Serviços",
          url: "/dashboard/reports-services",
        },
        {
          title: "Mecânicos",
          url: "/dashboard/reports-mechanicals",
        },
        {
          title: "Operacional",
          url: "/dashboard/reports-operation",
        },
      ],
    },
    {
      title: "Serviços",
      url: "/services",
      icon: NewspaperIcon,
      items: [
        {
          title: "Em andamento",
          url: "/services/ongoing",
        },
        {
          title: "Histórico",
          url: "/services/history",
        },
        {
          title: "Orçamentos",
          url: "/services/quotes",
        },
        {
          title: "Tipos de serviço",
          url: "/services/types",
        },
      ],
    },
    {
      title: "Mecânicos",
      url: "/mechanicals",
      icon: WrenchIcon,
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: UsersIcon,
      items: [{ title: "Veículos", url: "/clients/vehicles", icon: CarIcon }],
    },
    {
      title: "Estoque",
      url: "/stock",
      icon: FolderOpenIcon,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useGetConfig();
  const Me = useGetMe();
  return (
    <Sidebar variant="inset" style={{ backgroundColor: "#f0f0f0" }} {...props}>
      <SidebarHeader className="bg-[#f0f0f0]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 text-sidebar-primary-foreground">
                  <img src="/logo.svg" alt="garage-logo" className="w-[85%]" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.workshopName}
                  </span>
                  <span className="truncate text-xs">{data?.plan}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#f0f0f0]">
        <NavMain items={SidebarItems.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={SidebarItems.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-[#f0f0f0]">
        <NavUser
          user={{
            avatar: <UserCircleIcon width={24} />,
            email: Me?.data?.email,
            name: Me?.data?.name,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
