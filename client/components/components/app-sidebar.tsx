"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@components/components/ui/sidebar";
import { usePaths } from "@components/hooks/use-pathname";
import { SIDEBAR_NAV } from "../../config";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { route } = usePaths();
  const user = useSelector((state: RootState) => state.user);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={"/logo.svg"}
                    alt="RepurposeAI"
                    width={40}
                    height={40}
                    className="bg-cream dark:bg-[#131313]"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Welcome</span>
                  <span className="text-xs text-white/50">
                    {user.name?.split(" ")[0] || user.email}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* WIP: Show a list of all the things here */}
            Here we'll show the actions
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
