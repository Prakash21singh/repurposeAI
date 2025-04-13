import { usePathname } from "next/navigation";

export const usePaths = () => {
  const pathname = usePathname();

  const routes = pathname.split("/").slice(1);

  const route = pathname.split("/")[pathname.split("/").length - 1];

  return {
    pathname,
    routes,
    route,
  };
};
