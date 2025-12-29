import React, { useState } from "react";
import { Eye, Check, X, Search } from "lucide-react";
import ReviewActivity from "./ReviewActivity";
import Complaints from "./Complaints";

const VolunteerTeamsGroups = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const groupsData = [
    {
      id: "GRP1001",
      name: "Green Heroes",
      category: "Clean-Up",
      members: 45,
      city: "Lahore",
      status: "Active",
    },
    {
      id: "GRP1001",
      name: "Green Heroes",
      category: "Clean-Up",
      members: 45,
      city: "Lahore",
      status: "Active",
    },
    {
      id: "GRP1001",
      name: "Green Heroes",
      category: "Clean-Up",
      members: 45,
      city: "Lahore",
      status: "Active",
    },
    {
      id: "GRP1001",
      name: "Green Heroes",
      category: "Clean-Up",
      members: 45,
      city: "Lahore",
      status: "Active",
    },
  ];

  // Filter data based on search and filters
  const filteredData = groupsData.filter(group => {
    const matchesSearch = search === "" || 
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "" || group.status === status;
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearch("");
    setSortBy("Newest");
    setDateRange("");
    setStatus("");
  };

  const handleView = (id) => {
    console.log(`View: ${id}`);
  };

  const handleApprove = (id) => {
    console.log(`Approve: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Reject: ${id}`);
  };

  const totalPages = 2;

  return (
    <div className=" pt-4 ">
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-5">
        <h2 className="text-base font-semibold mb-4 text-gray-900">Search & Filters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search group name"
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
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
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

      {/* Volunteer Teams & Groups Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-900">Volunteer Teams & Groups</h2>
          <p className="text-sm text-gray-500 mt-1">Manage local volunteer groups, approve new teams, monitor activities, and handle complaints.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Group ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Group Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Members</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">City</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((group, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900 font-medium">{group.id}</td>
                  <td className="px-4 py-4 text-gray-700">{group.name}</td>
                  <td className="px-4 py-4 text-gray-700">{group.category}</td>
                  <td className="px-4 py-4 text-gray-700">{group.members}</td>
                  <td className="px-4 py-4 text-gray-700">{group.city}</td>
                  <td className="px-4 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium">
                      {group.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView(group.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-teal-600 transition"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleApprove(group.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-teal-600 transition"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleReject(group.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-teal-600 transition"
                      >
                        <X size={18} />
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
      <ReviewActivity />
      <Complaints/>
    </div>
  );
};

export default VolunteerTeamsGroups;