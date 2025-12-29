import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard, // Changed to LayoutDashboard
    Globe,
    UserCircle, // Changed to UserCircle
    Users,
    Server,
    ShieldCheck,
    Box,
    HardDrive,
    Network,
    AppWindow,
    BellRing,
    Smartphone,
    Megaphone,
    ShoppingCart,
    Key,
    FileCode,
    Palette,
    Mail,
    CreditCard,
    Code2,
    FileBarChart,
    ShieldAlert,
    Settings,
    ChevronDown,
    LogOut,
    X
} from "lucide-react";

const SidebarItem = ({ item, isCollapsed, currentPath, toggleSidebar }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const isSubItemActive = hasSubItems && item.subItems.some(sub =>
        currentPath === sub.path || currentPath.startsWith(sub.path)
    );

    const isActive = currentPath === item.path ||
        (item.path !== "/dashboard" && currentPath.startsWith(item.path) && !hasSubItems) ||
        isSubItemActive;

    const Icon = item.icon;

    useEffect(() => {
        if (isSubItemActive) {
            setIsOpen(true);
        }
    }, [isSubItemActive]);

    const handleClick = (e) => {
        if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (toggleSidebar) {
            toggleSidebar();
        }
    };

    return (
        <div className="mb-0.5">
            <Link
                to={item.path}
                onClick={handleClick}
                className={`flex items-center justify-between px-3 py-4 rounded-xl transition-all duration-200 group ${isActive
                    ? "bg-[var(--color-sidebar-active-bg)] text-[var(--color-sidebar-active-text)] shadow-lg shadow-blue-200"
                    : "text-[var(--color-sidebar-text)] hover:bg-[var(--color-button-secondary-hover-bg)] hover:text-[var(--color-primary)]"
                    }`}
            >
                <div className="flex items-center min-w-0">
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-[var(--color-sidebar-active-text)]" : "group-hover:text-[var(--color-primary)]"}`} />
                    {!isCollapsed && (
                        <span className="ml-3 text-sm font-bold truncate">{item.name}</span>
                    )}
                </div>
                {!isCollapsed && hasSubItems && (
                    <div className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className={`h-4 w-4 ${isActive ? "text-[var(--color-sidebar-active-text)]" : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]"}`} />
                    </div>
                )}
            </Link>

            {!isCollapsed && hasSubItems && isOpen && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-[var(--color-border)] flex flex-col gap-1">
                    {item.subItems.map((subItem) => (
                        <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={toggleSidebar}
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors block ${currentPath === subItem.path
                                ? "text-[var(--color-primary)] bg-[var(--color-button-secondary-bg)]" // Using a lighter background for active sub-item
                                : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-button-secondary-hover-bg)]"
                                }`}
                        >
                            {subItem.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar, isCollapsed }) => {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Web Sites", icon: Globe, path: "/websites" },
        { name: "Sob Admin", icon: UserCircle, path: "/sob-admin" },
        { name: "Account", icon: UserCircle, path: "/account" },
        { name: "Users", icon: Users, path: "/users" },
        { name: "Reseller", icon: Users, path: "/reseller" },
        { name: "Server", icon: Server, path: "/server" },
        { name: "Proxy VPN", icon: ShieldCheck, path: "/proxy-vpn" },
        { name: "Payload", icon: Box, path: "/payload" },
        { name: "DNS", icon: Network, path: "/dns" },
        { name: "App Store", icon: AppWindow, path: "/app-store" },
        { name: "Panel Notice", icon: BellRing, path: "/panel-notice" },
        { name: "App Notice", icon: Smartphone, path: "/app-notice" },
        { name: "App Ads", icon: Megaphone, path: "/app-ads" },
        { name: "E Shop", icon: ShoppingCart, path: "/e-shop" },
        { name: "Licence", icon: Key, path: "/licence" },
        { name: "Json", icon: FileCode, path: "/json" },
        { name: "Theme", icon: Palette, path: "/theme" },
        { name: "Email", icon: Mail, path: "/email" },
        { name: "Gateway", icon: CreditCard, path: "/gateway" },
        { name: "Panel API", icon: Code2, path: "/panel-api" },
        { name: "Config Version", icon: HardDrive, path: "/config-version" },
        { name: "Order Report", icon: FileBarChart, path: "/order-report" },
        { name: "Privacy Policy", icon: ShieldAlert, path: "/privacy-policy" },
        { name: "Setting", icon: Settings, path: "/settings" },
    ];

    const sidebarWidth = isCollapsed ? "w-23" : "w-64";

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 sm:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border)]
                    transition-all duration-300 ease-in-out sm:static
                    ${sidebarWidth}
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Brand / Logo Section */}
                    <div className="h-16 flex items-center justify-between px-6 shrink-0 border-b border-[var(--color-border)]">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
                                S
                            </div>
                            {!isCollapsed && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-[var(--color-text)] tracking-tight leading-none uppercase">Super Admin</span>
                                    <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest">Software Panel</span>
                                </div>
                            )}
                        </div>
                        <button className="sm:hidden p-2 text-[var(--color-text-secondary)]" onClick={toggleSidebar}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
                        <div className="flex flex-col gap-1">
                            {menuItems.map((item) => (
                                <SidebarItem
                                    key={item.name}
                                    item={item}
                                    isCollapsed={isCollapsed}
                                    currentPath={location.pathname}
                                    toggleSidebar={window.innerWidth < 640 ? toggleSidebar : null}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-[var(--color-border)]">
                        <button className={`
                            flex items-center px-4 py-3 rounded-xl w-full
                            text-[var(--color-text-secondary)] hover:text-red-600 hover:bg-red-50 transition-all duration-200
                            ${isCollapsed ? "justify-center px-0" : ""}
                        `}>
                            <LogOut className="h-5 w-5" />
                            {!isCollapsed && <span className="ml-3 text-sm font-bold">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;