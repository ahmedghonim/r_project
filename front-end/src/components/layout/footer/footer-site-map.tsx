"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { tabs } from "../chared";

import { usePathname } from "next/navigation";

function FooterSiteMap() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center justify-between w-full md:text-base text-xs font-bold text-dark">
      {tabs.map((tab) => (
        <li key={tab.name}>
          <Link
            className={cn(" transition hover:text-primary", {
              "text-primary": pathname === tab.href,
            })}
            href={tab.href}
          >
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default FooterSiteMap;
