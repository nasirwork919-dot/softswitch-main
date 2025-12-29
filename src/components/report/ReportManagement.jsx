import React, { useState } from "react";
import { MoreVertical, AlertTriangle, Ban, Trash2, CheckCircle } from "lucide-react";
import RemoveContentModal from "./RemoveContentModal";
import WarnUserModal from "./WarnUserModal";
import MarkAsResolvedModal from "./MarkAsResolvedModal";

const ReportManagement = () => {
  const [search, setSearch] = useState("");
  const [reportType, setReportType] = useState("");
  const [violationType, setViolationType] = useState("");
  const [status, setStatus] = useState("");
  const [verification, setVerification] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  // Modal states
  const [selectedReport, setSelectedReport] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isWarnModalOpen, setIsWarnModalOpen] = useState(false);
  const [isResolvedModalOpen, setIsResolvedModalOpen] = useState(false);

  const reports = [
    {
      id: "#1001",
      reportedItem: "User Profile",
      reportedUser: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=1",
      reporter: "Sana Khan",
      submittedOn: "2-2-2024",
      violationType: "Harassment",
      status: "Resolved",
    },
    {
      id: "#1001",
      reportedItem: "User Profile",
      reportedUser: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=2",
      reporter: "Sana Khan",
      submittedOn: "2-2-2024",
      violationType: "Harassment",
      status: "Under Review",
    },
    {
      id: "#1001",
      reportedItem: "User Profile",
      reportedUser: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=3",
      reporter: "Sana Khan",
      submittedOn: "2-2-2024",
      violationType: "Harassment",
      status: "Pending",
    },
    {
      id: "#1001",
      reportedItem: "User Profile",
      reportedUser: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=4",
      reporter: "Sana Khan",
      submittedOn: "2-2-2024",
      violationType: "Harassment",
      status: "Resolved",
    },
  ];

  const toggleMenu = (id, index) => {
    const key = `${id}-${index}`;
    setOpenMenu(openMenu === key ? null : key);
  };

  const openRemoveModal = (report) => {
    setSelectedReport(report);
    setIsRemoveModalOpen(true);
    setOpenMenu(null);
  };

  const openWarnModal = (report) => {
    setSelectedReport(report);
    setIsWarnModalOpen(true);
    setOpenMenu(null);
  };

  const openResolvedModal = (report) => {
    setSelectedReport(report);
    setIsResolvedModalOpen(true);
    setOpenMenu(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-600";
      case "Under Review":
        return "bg-orange-100 text-orange-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredReports = reports.filter((r) => {
    return (
      (r.reportedUser.toLowerCase().includes(search.toLowerCase()) ||
        r.reporter.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase())) &&
      (reportType ? r.reportedItem === reportType : true) &&
      (violationType ? r.violationType === violationType : true) &&
      (status ? r.status === status : true)
    );
  });

  const clearFilters = () => {
    setSearch("");
    setReportType("");
    setViolationType("");
    setStatus("");
    setVerification("");
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      {/* SEARCH & FILTERS CARD */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Search & Filters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by report ID, reporter, or violation type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Report Type</option>
            <option value="User Profile">User Profile</option>
            <option value="Post">Post</option>
            <option value="Comment">Comment</option>
          </select>

          <select
            value={violationType}
            onChange={(e) => setViolationType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Violation Type</option>
            <option value="Harassment">Harassment</option>
            <option value="Spam">Spam</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">By Status</option>
            <option value="Resolved">Resolved</option>
            <option value="Under Review">Under Review</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
          <select
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm sm:w-56 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">All Verification</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="flex gap-3">
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
      </div>

      {/* REPORTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6">
        <div className="mb-2">
          <h2 className="text-lg sm:text-xl font-semibold">All Reports</h2>
          <p className="text-sm text-gray-500">View and manage all user violations.</p>
        </div>

        {/* RESPONSIVE TABLE */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border border-gray-200 text-gray-600">
                <th className="p-3 text-left font-medium">Report ID</th>
                <th className="p-3 text-left font-medium">Reported Item</th>
                <th className="p-3 text-left font-medium">Reported User</th>
                <th className="p-3 text-left font-medium">Reporter</th>
                <th className="p-3 text-left font-medium">Submitted On</th>
                <th className="p-3 text-left font-medium">Violation Type</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={`${report.id}-${index}`} className="border border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{report.id}</td>
                  <td className="p-3">{report.reportedItem}</td>

                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={report.avatar}
                        className="w-9 h-9 rounded-full object-cover"
                        alt="user"
                      />
                      <span className="font-medium">{report.reportedUser}</span>
                    </div>
                  </td>

                  <td className="p-3">{report.reporter}</td>
                  <td className="p-3">{report.submittedOn}</td>
                  <td className="p-3">{report.violationType}</td>

                  <td className="p-3">
                    <span className={`${getStatusBadge(report.status)} px-3 py-1 rounded-full text-xs font-medium`}>
                      {report.status}
                    </span>
                  </td>

                  <td className="p-3 relative">
                    <button
                      onClick={() => toggleMenu(report.id, index)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === `${report.id}-${index}` && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-lg z-20">
                        <button
                          onClick={() => openWarnModal(report)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          <AlertTriangle size={16} /> Warn User
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
                          <Ban size={16} /> Suspend User
                        </button>

                        <button
                          onClick={() => openRemoveModal(report)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          <Trash2 size={16} /> Remove Content
                        </button>

                        <button
                          onClick={() => openResolvedModal(report)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          <CheckCircle size={16} /> Mark as Resolved
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Showing 1 to {filteredReports.length} of 1,247 results
        </p>
      </div>

      {/* MODALS */}
      <RemoveContentModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        report={selectedReport}
      />

      <WarnUserModal
        isOpen={isWarnModalOpen}
        onClose={() => setIsWarnModalOpen(false)}
        report={selectedReport}
      />

      <MarkAsResolvedModal
        isOpen={isResolvedModalOpen}
        onClose={() => setIsResolvedModalOpen(false)}
        report={selectedReport}
      />
    </div>
  );
};

export default ReportManagement;
