import {
  BookOpen,
  Bot,
  Command,
  LifeBuoy,
  Send,
  Settings2,
} from "lucide-react";
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
import { DashboardOutlined } from "@ant-design/icons";
import { useGetConfig } from "@/services/subdomain/getConfigs";

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
      icon: Bot,
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
      ],
    },
    {
      title: "Mecânicos",
      url: "/mechanicals",
      icon: BookOpen,
      // items: [
      //   {
      //     title: "Introduction",
      //     url: "",
      //   },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: Settings2,
    },
    {
      title: "Veículos",
      url: "/vehicles",
      icon: Settings2,
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
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useGetConfig();
  return (
    <Sidebar
      variant="inset"
      style={{ backgroundColor: "rgb(245 245 245)" }}
      {...props}
    >
      <SidebarHeader className="bg-neutral-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500">
                  <Command className="size-4" />
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
      <SidebarContent className="bg-neutral-100">
        <NavMain items={SidebarItems.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={SidebarItems.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-neutral-100">
        <NavUser user={SidebarItems.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
