import { AppSidebar, SidebarItems } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "@/config/api";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import secureLocalStorage from "react-secure-storage";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const token = secureLocalStorage.getItem("token");
    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => {
    const { pathname } = useLocation();
    const token = secureLocalStorage.getItem("token");
    const isMobile = useIsMobile();

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return (
      <SidebarProvider className={isMobile ? "w-[98vw]" : "w-[100vw]"}>
        <AppSidebar />
        <SidebarInset className="w-full">
          <header className="z-50 flex h-16 w-1/2 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {pathname.split("/").map((route) => {
                    let i: any;
                    if (!route) {
                      return undefined;
                    }
                    SidebarItems.navMain.forEach((element) => {
                      if (element.url === `/${route}`) {
                        i = element;
                      }
                    });
                    if (!i) {
                      SidebarItems.navMain.forEach((element) => {
                        element.items?.forEach((item) => {
                          if (item.url === pathname) {
                            i = item;
                          }
                        });
                      });
                    }

                    return (
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                          <Link to={i.url}>{i.title}</Link>
                        </BreadcrumbItem>
                      </>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex w-full flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  },
});
