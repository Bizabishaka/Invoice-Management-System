import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  HelpCircle,
  LogOut,
  
} from "lucide-react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-10 left-0 h-screen w-56 bg-white dark:bg-gray-900 shadow-md
          flex flex-col justify-between p-4 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Top section */}
        <div>
          {/* Mobile header */}
          

          {/* Menu links */}
          <nav className="space-y-2">
            <Link to="/" className={linkClass("/")} onClick={() => setOpen(false)}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link to="/create" className={linkClass("/create")} onClick={() => setOpen(false)}>
              <FilePlus size={18} /> Create Invoice
            </Link>

            <Link to="/invoices" className={linkClass("/invoices")} onClick={() => setOpen(false)}>
              <FileText size={18} /> Invoices
            </Link>

            <Link to="/query" className={linkClass("/query")} onClick={() => setOpen(false)}>
              <HelpCircle size={18} /> Query
            </Link>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mb-10">
          <button
            className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg w-full transition"
            onClick={() => setOpen(false)}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
