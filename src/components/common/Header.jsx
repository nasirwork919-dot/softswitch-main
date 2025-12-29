import React from "react";
import { Menu, Bell, ChevronLeft, ChevronRight, Search } from "lucide-react";

const Header = ({ toggleSidebar, toggleCollapse, isCollapsed }) => {
  return (
    <header className="h-16 bg-[var(--color-header-bg)] border-b border-[var(--color-border)] flex items-center justify-between px-4 sm:px-6 z-40 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Hamburger Icon for small screens */}
        <button
          className="sm:hidden text-[var(--color-primary)] p-2 hover:bg-[var(--color-button-secondary-hover-bg)] rounded-lg transition-colors focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Collapse toggle for desktop */}
        <button
          className="hidden sm:flex items-center justify-center text-[var(--color-primary)] p-2 hover:bg-[var(--color-button-secondary-hover-bg)] rounded-lg transition-colors focus:outline-none"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
        </button>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-xl font-bold text-[var(--color-text)]">
            Softswitch
          </span>
          <span className="px-2 py-0.5 bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] text-[10px] font-bold rounded uppercase">
            Admin
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center bg-[var(--color-button-secondary-bg)] px-3 py-1.5 rounded-lg border border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-[var(--color-card-background)] transition-all w-64">
          <Search className="h-4 w-4 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none text-[var(--color-text)]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <button className="text-[var(--color-text-secondary)] p-2 hover:bg-[var(--color-button-secondary-hover-bg)] rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-[var(--color-card-background)]">
              3
            </span>
          </div>

          <div className="h-8 w-px bg-[var(--color-border)] mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-2 cursor-pointer hover:bg-[var(--color-button-secondary-hover-bg)] p-1.5 rounded-lg transition-colors">
            <div className="h-8 w-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-200">
              JA
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[var(--color-text)] leading-tight">John Anderson</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;