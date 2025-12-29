import React, { useState } from "react";
import { Eye, Check, Ban, Search } from "lucide-react";
import BookingOverview from "./BookingOverview";
import FraudReview from "./FraudReview";

const ProfessionalServices = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const providersData = [
    {
      id: "PRO5001",
      name: "Bilal Ahmed",
      category: "Plumber",
      rating: 3,
      jobs: 22,
      status: "Verified",
    },
    {
      id: "PRO5001",
      name: "Bilal Ahmed",
      category: "Plumber",
      rating: 2,
      jobs: 22,
      status: "Verified",
    },
    {
      id: "PRO5001",
      name: "Bilal Ahmed",
      category: "Plumber",
      rating: 3,
      jobs: 22,
      status: "Verified",
    },
    {
      id: "PRO5001",
      name: "Bilal Ahmed",
      category: "Plumber",
      rating: 3,
      jobs: 22,
      status: "Pending",
    },
  ];

  // Filter data based on search and filters
  const filteredData = providersData.filter(provider => {
    const matchesSearch = search === "" || 
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      provider.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "" || provider.status === status;
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearch("");
    setSortBy("Newest");
    setDateRange("");
    setStatus("");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const totalPages = 2;

  return (
    <div className=" pt-4 sm:p-6">
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-5">
        <h2 className="text-base font-semibold mb-4 text-gray-900">Search & Filters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by Provider Name / User / Booking ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
          >
            <option value="Newest">Sort: Newest</option>
            <option value="Oldest">Sort: Oldest</option>
            <option value="Name">Sort: Name</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
          >
            <option value="">Date Range</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
          >
            <option value="">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Professional Services Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-900">Professional Services</h2>
          <p className="text-sm text-gray-500 mt-1">Manage service providers, view bookings, and review potential fraudulent activity.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Provider ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Ratings</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs"># Jobs</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((provider, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900 font-medium">{provider.id}</td>
                  <td className="px-4 py-4 text-gray-700">{provider.name}</td>
                  <td className="px-4 py-4 text-gray-700">{provider.category}</td>
                  <td className="px-4 py-4">{renderStars(provider.rating)}</td>
                  <td className="px-4 py-4 text-gray-700">{provider.jobs}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                      provider.status === "Verified" 
                        ? "bg-teal-100 text-teal-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-teal-600 transition">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-green-600 transition">
                        <Check size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-red-600 transition">
                        <Ban size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 1 to 2 of 1,247 results</p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <BookingOverview />
      <FraudReview />
    </div>
  );
};

export default ProfessionalServices;