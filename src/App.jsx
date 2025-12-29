import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/dashBoard/DashBoard";

// Dynamic Page Imports
import Websites from "./pages/websites/Websites";
import AddWebsite from "./pages/websites/AddWebsite";
import SobAdmin from "./pages/sobAdmin/SobAdmin";
import AddSobAdmin from "./pages/sobAdmin/AddSobAdmin";
import {
  Account, ProxyVPN, Payload, Domain,
  AppNotice, AppAds, EShop, Licence, Json,
  Email, Gateway, PanelAPI, OrderReport, PrivacyPolicy, Settings
} from "./pages/modules";
import Users from "./pages/user/Users";
import AddUser from "./pages/user/AddUser";
import Reseller from "./pages/reseller/Reseller";
import AddReseller from "./pages/reseller/AddReseller";
import Server from "./pages/server/Server";
import AddServer from "./pages/server/AddServer";
import DNS from "./pages/dns/DNS";
import AddDNS from "./pages/dns/AddDNS";
import Application from "./pages/application/Application";
import AddApplication from "./pages/application/AddApplication";
import PanelNotice from "./pages/notice/PanelNotice";
import AddPanelNotice from "./pages/notice/AddPanelNotice";
import Theme from "./pages/theme/Theme"; // New import for the dedicated Theme page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* DEFAULT ROUTE WHEN USER HITS "/" */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Core Management */}
          <Route path="websites" element={<Websites />} />
          <Route path="websites/add" element={<AddWebsite />} />
          <Route path="sob-admin" element={<SobAdmin />} />
          <Route path="sob-admin/add" element={<AddSobAdmin />} />

          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="account" element={<Account />} />
          <Route path="reseller" element={<Reseller />} />
          <Route path="reseller/add" element={<AddReseller />} />

          {/* Infrastructure */}
          <Route path="server" element={<Server />} />
          <Route path="server/add" element={<AddServer />} />
          <Route path="proxy-vpn" element={<ProxyVPN />} />
          <Route path="payload" element={<Payload />} />
          <Route path="domain" element={<Domain />} />
          <Route path="dns" element={<DNS />} />
          <Route path="dns/add" element={<AddDNS />} />

          {/* Application */}
          <Route path="application" element={<Application />} />
          <Route path="application/add" element={<AddApplication />} />
          <Route path="panel-notice" element={<PanelNotice />} />
          <Route path="panel-notice/add" element={<AddPanelNotice />} />
          <Route path="app-notice" element={<AppNotice />} />
          <Route path="app-ads" element={<AppAds />} />

          {/* Management */}
          <Route path="e-shop" element={<EShop />} />
          <Route path="licence" element={<Licence />} />
          <Route path="json" element={<Json />} />
          <Route path="theme" element={<Theme />} /> {/* Updated to use the new Theme component */}

          {/* System */}
          <Route path="email" element={<Email />} />
          <Route path="gateway" element={<Gateway />} />
          <Route path="panel-api" element={<PanelAPI />} />
          <Route path="order-report" element={<OrderReport />} />

          {/* Settings */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="settings" element={<Settings />} />

          {/* Fallback to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;