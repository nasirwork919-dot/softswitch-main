import React, { useState } from "react";
import FeedbackList from "./FeedbackList";
import CustomerSuggestions from "./CustomerSuggestions";
import CustomerIssues from "./CustomerIssues";

const FeedbackTabs = () => {
  const [activeTab, setActiveTab] = useState("feedback");

  const tabs = [
    { id: "feedback", label: "Feedback List" },
    { id: "suggestions", label: "Customer Suggestions" },
    { id: "issues", label: "Customer Issues / Complaints" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "feedback":
        return <FeedbackList />;
      case "suggestions":
        return <CustomerSuggestions />;
      case "issues":
        return <CustomerIssues />;
      default:
        return <FeedbackList />;
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

export default FeedbackTabs;
