import React, { useState } from "react";
import { Eye, XCircle } from "lucide-react";

const DeliveryServices = () => {
  // FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState("");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // SAMPLE DATA (Delivery Services, Complaints, and Fraud Review)
  const deliveryServices = [
    {
      requestId: "#1001",
      senderName: "Omar Ali",
      receiverName: "Bilal Ahmed",
      pickupDropoff: "DHA Phase 6 - Gulberg",
      date: "08 Dec 2025, 10:00 AM",
      packageType: "Standard",
      status: "Completed",
      riderAssigned: "Sara Iqbal",
    },
    {
      requestId: "#1002",
      senderName: "Omar Ali",
      receiverName: "Bilal Ahmed",
      pickupDropoff: "DHA Phase 6 - Gulberg",
      date: "08 Dec 2025, 10:30 AM",
      packageType: "Standard",
      status: "Pending",
      riderAssigned: "Sara Iqbal",
    },
    {
      requestId: "#1003",
      senderName: "Omar Ali",
      receiverName: "Bilal Ahmed",
      pickupDropoff: "DHA Phase 6 - Gulberg",
      date: "08 Dec 2025, 11:00 AM",
      packageType: "Express",
      status: "Completed",
      riderAssigned: "Sara Iqbal",
    },
  ];

  const complaints = [
    {
      complaintId: "REP2001",
      reportedUser: "Bilal Ahmed",
      issueType: "Late delivery",
      relatedDelivery: "DEL3001",
      date: "08 Dec 2025",
      status: "Pending",
    },
    {
      complaintId: "REP2002",
      reportedUser: "Omar Ali",
      issueType: "Suspicious ride",
      relatedDelivery: "DEL3002",
      date: "08 Dec 2025",
      status: "Resolved",
    },
  ];

  const fraudReview = [
    {
      user: "Bilal Ahmed",
      activityType: "Multiple cancellations",
      incidents: 6,
      lastIncidentDate: "08 Dec 2025",
      status: "Pending",
    },
    {
      user: "Omar Ali",
      activityType: "Multiple cancellations",
      incidents: 6,
      lastIncidentDate: "08 Dec 2025",
      status: "Cleared",
    },
  ];

  // FILTERED DELIVERY SERVICES BASED ON SEARCH AND FILTERS
  const filteredDeliveryServices = deliveryServices.filter((service) => {
    const matchesSearch =
      service.requestId.toLowerCase().includes(searchText.toLowerCase()) ||
      service.senderName.toLowerCase().includes(searchText.toLowerCase()) ||
      service.receiverName.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = status === "" || service.status === status;
    return matchesSearch && matchesStatus;
  });

  // FILTERED COMPLAINTS BASED ON SEARCH AND FILTERS
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.complaintId.toLowerCase().includes(searchText.toLowerCase()) ||
      complaint.reportedUser.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = status === "" || complaint.status === status;
    return matchesSearch && matchesStatus;
  });

  // FILTERED FRAUD REVIEW BASED ON SEARCH AND FILTERS
  const filteredFraudReview = fraudReview.filter((review) => {
    const matchesSearch =
      review.user.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = status === "" || review.status === status;
    return matchesSearch && matchesStatus;
  });

  // PAGINATION LOGIC FOR DELIVERY SERVICES
  const totalPagesDelivery = Math.ceil(filteredDeliveryServices.length / itemsPerPage);
  const startIndexDelivery = (currentPage - 1) * itemsPerPage;
  const endIndexDelivery = startIndexDelivery + itemsPerPage;
  const currentDeliveryServices = filteredDeliveryServices.slice(startIndexDelivery, endIndexDelivery);

  // PAGINATION LOGIC FOR COMPLAINTS
  const totalPagesComplaints = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndexComplaints = (currentPage - 1) * itemsPerPage;
  const endIndexComplaints = startIndexComplaints + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndexComplaints, endIndexComplaints);

  // PAGINATION LOGIC FOR FRAUD REVIEW
  const totalPagesFraudReview = Math.ceil(filteredFraudReview.length / itemsPerPage);
  const startIndexFraudReview = (currentPage - 1) * itemsPerPage;
  const endIndexFraudReview = startIndexFraudReview + itemsPerPage;
  const currentFraudReview = filteredFraudReview.slice(startIndexFraudReview, endIndexFraudReview);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearchText("");
    setStatus("");
    setDateRange("");
    setCurrentPage(1);
  };

  // Apply Filters for Reset Page
  const applyFilters = () => {
    setCurrentPage(1);
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState(""); // Added state for reason input

  // Function to handle block button click
  const handleBlockClick = (user) => {
    setSelectedUser(user); // Set selected user details
    setIsModalOpen(true); // Open modal
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setReason(""); // Reset reason input when modal is closed
  };

  // Handle blocking user
  const handleBlockUser = () => {
    // Logic to block user goes here
    console.log(`Blocked user: ${selectedUser.driverName}, Reason: ${reason}`);
    closeModal(); // Close modal after blocking
  };

  return (
    <div className="pt-5">
      {/* SEARCH & FILTERS CARD */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Search & Filters</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* First Row: Search, Status, Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by Request ID / Sender / Receiver"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Status */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Resolved">Resolved</option>
              <option value="Cleared">Cleared</option>
            </select>

            {/* Date Range */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="">Date Range</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={applyFilters}
              className="bg-teal-600 text-[12px] hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-200 text-[12px] hover:bg-gray-300 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* DELIVERY SERVICES TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Delivery Services</h2>
        <p className="text-sm text-gray-500 mt-1">View all delivery requests, complaints, and review potential fraudulent activity.</p>
        {/* TABLE WRAPPER FOR MOBILE RESPONSIVENESS */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Request ID</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Sender</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Receiver</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Pickup / Dropoff</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Package Type</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Rider Assigned</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentDeliveryServices.length > 0 ? (
                currentDeliveryServices.map((service, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{service.requestId}</td>
                    <td className="p-3 text-gray-700 whitespace-nowrap">{service.senderName}</td>
                    <td className="p-3 text-gray-700 whitespace-nowrap">{service.receiverName}</td>
                    <td className="p-3 text-gray-700 whitespace-nowrap">{service.pickupDropoff}</td>
                    <td className="p-3 text-gray-700">{service.packageType}</td>
                    <td className="p-3 text-gray-700">{service.status}</td>
                    <td className="p-3 text-gray-700">{service.riderAssigned}</td>
                    <td className="p-3">
                      <div className="flex gap-3 p-3">
                        <button className="cursor-pointer whitespace-nowrap bg-[#16A34A] hover:bg-transparent hover:border-[#16A34A] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#16A34A] text-white">Mark Completed</button>
                        <button className="cursor-pointer whitespace-nowrap bg-[#DC2626] hover:bg-transparent hover:border-[#DC2626] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#DC2626] text-white">Cancel</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    No delivery services found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPLAINTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Complaints</h2>
        <p className="text-sm text-gray-500 mt-1">View all complaints about the delivery services and take action accordingly.</p>
        {/* TABLE WRAPPER FOR MOBILE RESPONSIVENESS */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Complaint ID</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Reported User</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Issue Type</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Related Delivery</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Date</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentComplaints.length > 0 ? (
                currentComplaints.map((complaint, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{complaint.complaintId}</td>
                    <td className="p-3 text-gray-700">{complaint.reportedUser}</td>
                    <td className="p-3 text-gray-700">{complaint.issueType}</td>
                    <td className="p-3 text-gray-700">{complaint.relatedDelivery}</td>
                    <td className="p-3 text-gray-700">{complaint.date}</td>
                    <td className="p-3 text-gray-700">{complaint.status}</td>
                    <td className="flex gap-3 p-3">
                      <button className="cursor-pointer bg-[#03989E] hover:bg-transparent hover:border-[#03989E] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#03989E] text-white">Resolve</button>
                      <button className="cursor-pointer bg-[#DC2626] hover:bg-transparent hover:border-[#DC2626] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#DC2626] text-white">Block</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No complaints found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FRAUD REVIEW TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Fraud Review</h2>
        <p className="text-sm text-gray-500 mt-1">View all delivery requests, complaints, and review potential fraudulent activity.</p>
        {/* TABLE WRAPPER FOR MOBILE RESPONSIVENESS */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">User</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Activity Type</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap"># Incidents</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Last Incident Date</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentFraudReview.length > 0 ? (
                currentFraudReview.map((review, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{review.user}</td>
                    <td className="p-3 text-gray-700">{review.activityType}</td>
                    <td className="p-3 text-gray-700">{review.incidents}</td>
                    <td className="p-3 text-gray-700">{review.lastIncidentDate}</td>
                    <td className="p-3 text-gray-700">{review.status}</td>
                    <td className="flex gap-3 p-3">
                      <button className="cursor-pointer bg-[#03989E] hover:bg-transparent hover:border-[#03989E] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#03989E] text-white">Mark Safe</button>
                      <button className="cursor-pointer bg-[#DC2626] hover:bg-transparent hover:border-[#DC2626] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#DC2626] text-white">Block</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No fraud review items found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div>
          Showing {startIndexDelivery + 1} to {Math.min(endIndexDelivery, filteredDeliveryServices.length)} of{" "}
          {filteredDeliveryServices.length} results
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPagesDelivery}
            className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryServices;
