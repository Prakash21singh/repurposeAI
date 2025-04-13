"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/components/ui/breadcrumb";
import { usePaths } from "@components/hooks/use-pathname";

function Breadcrumbs() {
  const { routes } = usePaths();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink className="cursor-pointer">App</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />

        {routes.map((route, index, arr) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize cursor-pointer">
                {route}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {index !== arr.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
