import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import SuggestionDetailsModal from "./SuggestionDetailsModal";

const CustomerSuggestions = () => {
  const [search, setSearch] = useState("");
  const [popularity, setPopularity] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const suggestionsData = [
    {
      id: "SG-00210",
      userName: "Ayesha Khan",
      suggestion: "Add dark mode",
      votes: "345 votes",
      status: "Completed",
      suggestionText: "Please add dark mode for better readability at night.",
    },
    {
      id: "SG-00210",
      userName: "Ayesha Khan",
      suggestion: "Add dark mode",
      votes: "345 votes",
      status: "Under Review",
      suggestionText: "Please add dark mode for better readability at night.",
    },
    {
      id: "SG-00210",
      userName: "Ayesha Khan",
      suggestion: "Add dark mode",
      votes: "345 votes",
      status: "Planned",
      suggestionText: "Please add dark mode for better readability at night.",
    },
    {
      id: "SG-00210",
      userName: "Ayesha Khan",
      suggestion: "Add dark mode",
      votes: "345 votes",
      status: "Completed",
      suggestionText: "Please add dark mode for better readability at night.",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "Under Review":
        return "bg-yellow-400 text-white";
      case "Planned":
        return "bg-teal-500 text-white";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const clearFilters = () => {
    setSearch("");
    setPopularity("");
    setStatus("");
    setCategory("");
  };

  const openModal = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSuggestion(null);
  };

  const totalPages = 2;

  return (
    <>
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Search & Filters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search group name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <select
            value={popularity}
            onChange={(e) => setPopularity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Popularity</option>
            <option value="most">Most Popular</option>
            <option value="least">Least Popular</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Status</option>
            <option value="Completed">Completed</option>
            <option value="Under Review">Under Review</option>
            <option value="Planned">Planned</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Category</option>
            <option value="Feature Request">Feature Request</option>
            <option value="UI Improvement">UI Improvement</option>
            <option value="Performance">Performance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm transition">
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg text-sm transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Suggestions Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Customer Suggestions</h2>
          <p className="text-sm text-gray-500">Feature requests and improvement ideas submitted by users.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[650px]">
            <thead>
              <tr className="bg-gray-50 border border-gray-200 text-gray-600">
                <th className="p-3 text-left font-medium whitespace-nowrap">Suggestion ID</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">User Name</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Suggestion</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Popularity</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suggestionsData.map((suggestion, index) => (
                <tr key={index} className="border border-gray-200 hover:bg-gray-50">
                  <td className="p-3 text-gray-700 whitespace-nowrap">{suggestion.id}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{suggestion.userName}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{suggestion.suggestion}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{suggestion.votes}</td>
                  <td className="p-3">
                    <span className={`${getStatusBadge(suggestion.status)} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
                      {suggestion.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(suggestion)} className="p-2 hover:bg-gray-100 rounded-lg text-teal-600">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <p className="text-sm text-gray-500">Showing 1 to 2 of 1,247 results</p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>

            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Details Modal */}
      <SuggestionDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        suggestion={selectedSuggestion}
      />
    </>
  );
};

export default CustomerSuggestions;
