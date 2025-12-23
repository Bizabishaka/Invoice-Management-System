import { Moon, Sun, Bell, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen?: boolean;
  setSidebarOpen?: (v: boolean) => void;
}) {
  const [dark, setDark] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 shadow-md flex items-center px-4 md:px-6 z-50">
      {/* Mobile menu toggle */}
      {setSidebarOpen && (
        <button
          className="md:hidden mr-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* App title */}
      <h2 className="font-semibold text-lg flex-1 text-gray-900 dark:text-gray-100">
        Invoice App
      </h2>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <User size={18} />
          <span className="text-sm text-gray-900 dark:text-gray-100">Bizarez</span>
        </button>
      </div>
    </header>
  );
}
