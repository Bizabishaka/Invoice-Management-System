import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function AppLayout() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex mb-1">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-56">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <div className="pt-14 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
