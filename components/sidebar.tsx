"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/LOGO.png";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import FreeCounter from "./freeCounter";

import React from "react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
interface sidebarprops {
  apiLimitCount: Number;
  isPro: boolean;
  apiLimit: Number;
}

const Sidebar = ({ apiLimitCount, apiLimit, isPro }: sidebarprops) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image alt="logo" src={Logo} fill />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            KApp
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            return (
              <Link
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "bg-white/10 text-white"
                    : "text-zinc-400"
                )}
                href={route.href}
                key={route.href}
              >
                <div className="flex items-center flex-1">
                  {/* // one of the method to call mwthod from object */}
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />

                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <FreeCounter
        apiLimitCount={apiLimitCount}
        isPro={isPro}
        apiLimit={apiLimit}
      />
    </div>
  );
};

export default Sidebar;
