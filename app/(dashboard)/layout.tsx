import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import apiCount from "@/helpers/getApiNumber";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { apiLimitCount, isPro, apiLimit }: any = await apiCount();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar
          apiLimitCount={apiLimitCount}
          isPro={isPro}
          apiLimit={apiLimit}
        />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
