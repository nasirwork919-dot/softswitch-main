import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import IssueDetailsModal from "./IssueDetailsModal";

const CustomerIssues = () => {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [module, setModule] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const issuesData = [
    {
      id: "IS-04521",
      userName: "Ayesha Khan",
      module: "Marketplace",
      severity: "High",
      date: "09 Jan 2025",
      status: "Open",
      reportedIssue: "Payment stuck on checkout and keeps loading.",
    },
    {
      id: "IS-04521",
      userName: "Ayesha Khan",
      module: "Marketplace",
      severity: "High",
      date: "09 Jan 2025",
      status: "Under Review",
      reportedIssue: "Payment stuck on checkout and keeps loading.",
    },
    {
      id: "IS-04521",
      userName: "Ayesha Khan",
      module: "Marketplace",
      severity: "High",
      date: "09 Jan 2025",
      status: "Closed",
      reportedIssue: "Payment stuck on checkout and keeps loading.",
    },
    {
      id: "IS-04521",
      userName: "Ayesha Khan",
      module: "Marketplace",
      severity: "High",
      date: "09 Jan 2025",
      status: "Open",
      reportedIssue: "Payment stuck on checkout and keeps loading.",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-teal-500 text-white";
      case "Under Review":
        return "bg-yellow-400 text-white";
      case "Closed":
        return "bg-pink-500 text-white";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSeverity("");
    setStatus("");
    setModule("");
  };

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
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
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Status</option>
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Module</option>
            <option value="Marketplace">Marketplace</option>
            <option value="Payment">Payment</option>
            <option value="Authentication">Authentication</option>
            <option value="Profile">Profile</option>
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

      {/* Issues Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Customer Issues & Complaints</h2>
          <p className="text-sm text-gray-500">Track technical problems, app bugs, and reported issues.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border border-gray-200 text-gray-600">
                <th className="p-3 text-left font-medium whitespace-nowrap">Issue ID</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">User Name</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Module</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Severity</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Date</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issuesData.map((issue, index) => (
                <tr key={index} className="border border-gray-200 hover:bg-gray-50">
                  <td className="p-3 text-gray-700 whitespace-nowrap">{issue.id}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{issue.userName}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{issue.module}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{issue.severity}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{issue.date}</td>
                  <td className="p-3">
                    <span className={`${getStatusBadge(issue.status)} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(issue)} className="p-2 hover:bg-gray-100 rounded-lg text-teal-600">
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

      {/* Issue Details Modal */}
      <IssueDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        issue={selectedIssue}
      />
    </>
  );
};

export default CustomerIssues;
