import React, { useState } from "react";
import MarketplaceListings from "./MarketplaceListings";
import HomeFoodMarket from "./HomeFoodMarket";
import RentalProperties from "./RentalProperties";
import LendingBorrowing from "./LendingBorrowing";


const MarketplaceTabs = () => {
  const [activeTab, setActiveTab] = useState("marketplacelistings");

  const tabs = [
    { id: "marketplacelistings", label: " Marketplace Listings" },
    { id: "homefoodmarket", label: "Home Food Market" },
    { id: "rentalproperties", label: "Rental Properties" },
    { id: "lendingborrowing", label: "Lending & Borrowing" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "marketplacelistings":
        return <MarketplaceListings/>;
      case "homefoodmarket":
        return <HomeFoodMarket />;
      case "rentalproperties":
        return <RentalProperties />;
      case "lendingborrowing":
        return <LendingBorrowing />;
      default:
        return <MarketplaceListings/>;
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

export default MarketplaceTabs;
