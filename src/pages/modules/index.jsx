import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import {
    Globe, UserCircle, Users, Server as ServerIcon, ShieldCheck, Box, HardDrive, Network,
    AppWindow, BellRing, Smartphone, Megaphone, ShoppingCart, Key, FileCode,
    Palette, Mail, CreditCard, Code2, FileBarChart, ShieldAlert, Settings as SettingsIcon
} from 'lucide-react';
import EmailSettingsForm from '../email/EmailSettingsForm'; // Import the new component
import GatewaySettingsForm from '../gateway/GatewaySettingsForm'; // Import the new Gateway component

const TablePlaceholder = () => (
    <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
            <Globe className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">No data available yet</h3>
        <p className="text-sm text-gray-400 mt-1">This module is correctly configured and ready for data integration.</p>
    </div>
);

// Generic creation helper to keep it "pretty" and consistent
const createModule = (title, description, icon, stats, contentComponent = TablePlaceholder) => () => (
    <ModulePage title={title} description={description} icon={icon} stats={stats}>
        {React.createElement(contentComponent)}
    </ModulePage>
);

export const WebSites = createModule("Web Sites", "Manage and monitor all connected websites and domains.", Globe, [
    { label: "Active Sites", value: "124", trend: "up", change: "12%" },
    { label: "Offline Sites", value: "2", trend: "down", change: "1%" }
]);

export const Account = createModule("Account", "Manage super admin and staff account settings.", UserCircle, [
    { label: "Total Staff", value: "12", trend: "up", change: "2" }
]);

export const Reseller = createModule("Reseller", "Monitor and manage reseller accounts and credits.", Users, [
    { label: "Active Resellers", value: "852", trend: "up", change: "45" },
    { label: "Total Credits", value: "1.2M", trend: "up", change: "15%" }
]);

export const Server = createModule("Server", "Real-time monitoring of server health and performance.", ServerIcon, [
    { label: "Uptime", value: "99.9%", trend: "up", change: "0.1%" },
    { label: "Load Avg", value: "0.45", trend: "down", change: "0.05" }
]);

export const ProxyVPN = createModule("Proxy VPN", "Configure and manage proxy and VPN endpoints.", ShieldCheck, [
    { label: "Active Tunnels", value: "4,251", trend: "up", change: "210" }
]);

export const Payload = createModule("Payload", "Manage data payloads and configuration strings.", Box, [
    { label: "Total Payloads", value: "156", trend: "up", change: "5" }
]);

export const Domain = createModule("Domain", "Control domain registration and renewal processes.", HardDrive, [
    { label: "Registered", value: "1,245", trend: "up", change: "15" },
    { label: "Expiring Soon", value: "12", trend: "down", change: "2" }
]);

export const DNS = createModule("DNS", "Manage zone files and DNS record configurations.", Network, [
    { label: "Queries/sec", value: "12.5k", trend: "up", change: "1.2k" }
]);

export const Application = createModule("Application", "Configure core application behavior and features.", AppWindow, [
    { label: "App Version", value: "v4.2.0", trend: "up", change: "Stable" }
]);

export const PanelNotice = createModule("Panel Notice", "Manage notifications displayed on the admin panel.", BellRing, [
    { label: "Active Notices", value: "3", trend: "up", change: "1" }
]);

export const AppNotice = createModule("App Notice", "Manage push notifications and in-app messages.", Smartphone, [
    { label: "Delivered", value: "854k", trend: "up", change: "15k" }
]);

export const AppAds = createModule("App Ads", "Configure and monitor in-app advertisement campaigns.", Megaphone, [
    { label: "CTR", value: "2.4%", trend: "up", change: "0.2%" }
]);

export const EShop = createModule("E Shop", "Manage digital products, pricing, and shop settings.", ShoppingCart, [
    { label: "Daily Sales", value: "$12,450", trend: "up", change: "15%" }
]);

export const Licence = createModule("Licence", "Track and manage application licenses and activations.", Key, [
    { label: "Active Licences", value: "15,842", trend: "up", change: "450" }
]);

export const Json = createModule("JSON Configuration", "Directly manage system JSON configuration files.", FileCode, [
    { label: "Total Files", value: "42", trend: "up", change: "Stable" }
]);

export const Theme = createModule("Theme", "Customize the visual appearance and branding of the panel.", Palette, [
    { label: "Active Theme", value: "Premium Blue", trend: "up", change: "Modern" }
]);

export const Email = createModule("Email", "Configure SMTP settings and monitor outgoing mail.", Mail, [
    { label: "Delivery Rate", value: "98.5%", trend: "up", change: "0.5%" }
], EmailSettingsForm); // Pass EmailSettingsForm as the content component

export const Gateway = createModule("Gateway", "Manage payment gateways and transaction processing.", CreditCard, [
    { label: "Successful Trans", value: "95.2%", trend: "up", change: "1.2%" }
], GatewaySettingsForm); // Pass GatewaySettingsForm as the content component

export const PanelAPI = createModule("Panel API", "Manage API keys and external integration settings.", Code2, [
    { label: "Daily Requests", value: "2.5M", trend: "up", change: "0.2M" }
]);

export const OrderReport = createModule("Order Report", "Detailed reporting and analytics for all system orders.", FileBarChart, [
    { label: "Monthly Rev", value: "$452k", trend: "up", change: "12%" }
]);

export const PrivacyPolicy = createModule("Privacy Policy", "Edit and manage system privacy and legal documents.", ShieldAlert, [
    { label: "Last Updated", value: "2 Days ago", trend: "up", change: "v1.4" }
]);

export const Settings = createModule("Settings", "Configure global system preferences and panel behavior.", SettingsIcon, [
    { label: "Configuration", value: "Active", trend: "up", change: "Stable" }
]);