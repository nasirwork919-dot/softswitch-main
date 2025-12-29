import React, { useState } from "react";
import { MoreVertical, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react";
import RejectEventModal from "./RejectEventModal";
import ApproveEventModal from "./ApproveEventModal";
import DeleteEventModal from "./DeleteEventModal";
import ViewComplaintsModal from "./ViewComplaintsModal";

const EventManagement = () => {
  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [verification, setVerification] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  // Modal states
  const [rejectModal, setRejectModal] = useState({ open: false, event: null });
  const [approveModal, setApproveModal] = useState({ open: false, event: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, event: null });
  const [complaintsModal, setComplaintsModal] = useState({ open: false, event: null });

  const events = [
    {
      id: "#1001",
      eventName: "Promotion Event",
      organizer: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=1",
      date: "2-2-2024",
      status: "Approved",
    },
    {
      id: "#1001",
      eventName: "Promotion Event",
      organizer: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=2",
      date: "2-2-2024",
      status: "Rejected",
    },
    {
      id: "#1001",
      eventName: "Promotion Event",
      organizer: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=3",
      date: "2-2-2024",
      status: "Pending",
    },
    {
      id: "#1001",
      eventName: "Promotion Event",
      organizer: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40?img=4",
      date: "2-2-2024",
      status: "Approved",
    },
  ];

  const toggleMenu = (id, index) => {
    const menuId = `${id}-${index}`;
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const handleApprove = (event) => {
    setApproveModal({ open: true, event });
    setOpenMenu(null);
  };

  const handleReject = (event) => {
    setRejectModal({ open: true, event });
    setOpenMenu(null);
  };

  const handleViewComplaints = (event) => {
    setComplaintsModal({ open: true, event });
    setOpenMenu(null);
  };

  const handleDelete = (event) => {
    setDeleteModal({ open: true, event });
    setOpenMenu(null);
  };

  const filteredEvents = events.filter((e) => {
    return (
      (e.eventName.toLowerCase().includes(search.toLowerCase()) ||
        e.organizer.toLowerCase().includes(search.toLowerCase())) &&
      (status ? e.status === status : true)
    );
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      {/* SEARCH & FILTERS CARD */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Search & Filters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by event name, organizer, or community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <select
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none text-gray-500"
          >
            <option value="">Select Community</option>
            <option value="Fitness & health">Fitness & health</option>
            <option value="Technology">Technology</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none text-gray-500"
          >
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none text-gray-500"
          >
            <option value="">By Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
          <select
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:w-56 focus:ring-2 focus:ring-teal-500 outline-none text-gray-500"
          >
            <option value="">All Verification</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="flex gap-3">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
              Apply Filters
            </button>
            <button
              onClick={() => {
                setSearch("");
                setCommunity("");
                setDateRange("");
                setStatus("");
                setVerification("");
              }}
              className="bg-white border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* EVENTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">All Events</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage all user-created events.</p>
        </div>

        {/* RESPONSIVE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase">
                <th className="p-3 text-left font-medium">Event ID</th>
                <th className="p-3 text-left font-medium">Event Name</th>
                <th className="p-3 text-left font-medium">Organizer</th>
                <th className="p-3 text-left font-medium">Event Date</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={`${event.id}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-gray-600">{event.id}</td>
                  <td className="p-3 font-medium text-gray-800">{event.eventName}</td>

                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={event.avatar}
                        className="w-8 h-8 rounded-full object-cover"
                        alt="organizer"
                      />
                      <span className="text-gray-700">{event.organizer}</span>
                    </div>
                  </td>

                  <td className="p-3 text-gray-600">{event.date}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td className="p-3 relative">
                    <button
                      onClick={() => toggleMenu(event.id, index)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>

                    {openMenu === `${event.id}-${index}` && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-lg z-20 py-1">
                        <button
                          onClick={() => handleApprove(event)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 w-full text-left"
                        >
                          <CheckCircle size={18} className="text-teal-600" />
                          <span>Approve Event</span>
                        </button>

                        <button
                          onClick={() => handleReject(event)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 w-full text-left"
                        >
                          <XCircle size={18} className="text-gray-600" />
                          <span>Reject Event</span>
                        </button>

                        <button
                          onClick={() => handleViewComplaints(event)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 w-full text-left"
                        >
                          <Eye size={18} className="text-gray-600" />
                          <span>View Complaints</span>
                        </button>

                        <button
                          onClick={() => handleDelete(event)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 w-full text-left text-red-600"
                        >
                          <Trash2 size={18} />
                          <span>Delete Event</span>
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
          Showing 1 to {filteredEvents.length} of 1,247 results
        </p>
      </div>

      {/* Modals */}
      <RejectEventModal
        isOpen={rejectModal.open}
        onClose={() => setRejectModal({ open: false, event: null })}
        event={rejectModal.event}
      />

      <ApproveEventModal
        isOpen={approveModal.open}
        onClose={() => setApproveModal({ open: false, event: null })}
        event={approveModal.event}
      />

      <DeleteEventModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, event: null })}
        event={deleteModal.event}
      />

      <ViewComplaintsModal
        isOpen={complaintsModal.open}
        onClose={() => setComplaintsModal({ open: false, event: null })}
        event={complaintsModal.event}
      />
    </div>
  );
};

export default EventManagement;
