import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { loadThemeFromLocalStorage } from '../../utils/themeUtils'; // Import theme utility

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadThemeFromLocalStorage(); // Load theme on initial render
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)] overflow-hidden font-sans text-[var(--color-text)]">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} toggleCollapse={toggleCollapse} isCollapsed={isCollapsed} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out bg-[var(--color-background)]">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;