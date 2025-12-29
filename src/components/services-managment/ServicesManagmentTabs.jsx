import React, { useState } from "react";
import CarSharing from "./CarSharing";
import DeliveryServices from "./DeliveryServices";
import ProfessionalServices from "./ProfessionalServices";
import VolunteerTeamsGroups from "./VolunteerTeamsGroups";


const ServicesManagmentTabs = () => {
  const [activeTab, setActiveTab] = useState("carsharing");

  const tabs = [
    { id: "carsharing", label: " Car Sharing" },
    { id: "deliveryservices", label: "Delivery Services" },
    { id: "professionalservices", label: "Professional Services" },
    { id: "VolunteerTeamsGroups", label: "Volunteer Teams & Groups" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "carsharing":
        return <CarSharing />;
      case "deliveryservices":
        return <DeliveryServices />;
      case "professionalservices":
        return <ProfessionalServices />;
      case "VolunteerTeamsGroups":
        return <VolunteerTeamsGroups />;
      default:
        return <CarSharing />;
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

export default ServicesManagmentTabs;
