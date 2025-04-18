"use client";
import { store } from "@/store/store";
import { AppSidebar } from "@components/components/app-sidebar";
import { Button } from "@components/components/ui/button";
import { Separator } from "@components/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/components/ui/sidebar";
import Breadcrumbs from "@components/custom/Breadcrumbs";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Provider } from "react-redux";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { setTheme, theme } = useTheme();
  return (
    <Provider store={store}>
      <SidebarProvider className="relative font-poppins">
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <header className="flex sticky top-0 bg-cream/70 dark:bg-black/50 backdrop-blur-md backdrop-saturate-150 border border-cream/20 dark:border-white/10  justify-between h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
            <div className="min-w-16">
              {theme === "dark" ? (
                <Button onClick={() => setTheme("light")}>
                  <SunMedium className="w-4" />
                </Button>
              ) : (
                <Button onClick={() => setTheme("dark")}>
                  <Moon className="w-4" />
                </Button>
              )}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </Provider>
  );
}
