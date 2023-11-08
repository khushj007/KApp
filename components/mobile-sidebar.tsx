"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileSidebarprops {
  apiLimitCount: number;
  isPro: boolean;
  apiLimit: number;
}

const MobileSidebar = ({
  apiLimitCount,
  isPro,
  apiLimit,
}: MobileSidebarprops) => {
  // to fix hydration error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar
          apiLimitCount={apiLimitCount}
          isPro={isPro}
          apiLimit={apiLimit}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
