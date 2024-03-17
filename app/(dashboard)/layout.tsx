import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

interface IDashboardProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: IDashboardProps) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[100] bg-gray-2000">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
