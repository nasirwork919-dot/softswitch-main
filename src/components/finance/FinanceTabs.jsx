import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import WalletLogs from "./WalletLogs";
import RefundRequests from "./RefundRequests";
import RevenueReports from "./RevenueReports";


const FinanceTabs = () => {
  const [activeTab, setActiveTab] = useState("transactionslist");

  const tabs = [
    { id: "transactionslist", label: " Transactions List" },
    { id: "walletlogs", label: "Wallet Logs" },
    { id: "refundrequests", label: "Refund Requests" },
    { id: "revenuereports", label: "Revenue Reports" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "transactionslist":
        return <TransactionsList/>;
      case "walletlogs":
        return <WalletLogs />;
      case "refundrequests":
        return <RefundRequests />;
      case "revenuereports":
        return <RevenueReports />;
      default:
        return <TransactionsList/>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      {/* Tabs */}
      <div className="bg-gray-100 rounded-md p-1 inline-flex flex-wrap gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-teal-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default FinanceTabs;
