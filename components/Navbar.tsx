import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import apiCount from "@/helpers/getApiNumber";

const Navbar = async () => {
  const { apiLimitCount, isPro, apiLimit }: any = await apiCount();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar
        apiLimitCount={apiLimitCount}
        isPro={isPro}
        apiLimit={apiLimit}
      />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
