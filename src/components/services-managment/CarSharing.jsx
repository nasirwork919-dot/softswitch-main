import React, { useState } from "react";
import { Eye, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CarSharing = () => {
  // FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [community, setCommunity] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [verification, setVerification] = useState("");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // SAMPLE CAR RIDES (Car Sharing)
  const carRides = [
    {
      rideId: "#1001",
      driverName: "Omar Ali",
      driverPhone: "+1 234 567 8901",
      pickupDropoff: "DHA Phase 6 - Gulberg",
      dateTime: "08 Dec 2025, 10:00 AM",
      status: "Completed",
      fare: 500,
    },
    {
      rideId: "#1002",
      driverName: "Bilal Ahmed",
      driverPhone: "+1 234 567 8902",
      pickupDropoff: "DHA Phase 6 - Gulberg",
      dateTime: "08 Dec 2025, 10:30 AM",
      status: "Ongoing",
      fare: 500,
    },
    {
      rideId: "#1003",
      driverName: "Omar Ali",
      driverPhone: "+1 234 567 8901",
      pickupDropoff: "DHA Phase 6 - Gulberg",
      dateTime: "08 Dec 2025, 10:45 AM",
      status: "Cancelled",
      fare: 500,
    },
  ];

  // SAMPLE FLAGGED ITEMS
  const flaggedItems = [
    {
      reportId: "REP2001",
      reportedUser: "Bilal Ahmed",
      issueType: "Fake ride",
      evidence: "Screenshot.png",
      status: "Pending",
    },
    {
      reportId: "REP2002",
      reportedUser: "Omar Ali",
      issueType: "Suspicious ride",
      evidence: "Screenshot.png",
      status: "Reviewed",
    },
  ];

  // FILTERED CAR RIDES BASED ON SEARCH AND FILTERS
  const filteredRides = carRides.filter((ride) => {
    const matchesSearch =
      ride.driverName.toLowerCase().includes(searchText.toLowerCase()) ||
      ride.driverPhone.includes(searchText);

    const matchesStatus = status === "" || ride.status === status;
    return matchesSearch && matchesStatus;
  });

  // FILTERED FLAGGED ITEMS BASED ON SEARCH AND FILTERS
  const filteredFlaggedItems = flaggedItems.filter((item) => {
    const matchesSearch =
      item.reportId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.reportedUser.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = status === "" || item.status === status;
    return matchesSearch && matchesStatus;
  });

  // PAGINATION LOGIC FOR CAR RIDES
  const totalPagesRides = Math.ceil(filteredRides.length / itemsPerPage);
  const startIndexRides = (currentPage - 1) * itemsPerPage;
  const endIndexRides = startIndexRides + itemsPerPage;
  const currentRides = filteredRides.slice(startIndexRides, endIndexRides);

  // PAGINATION LOGIC FOR FLAGGED ITEMS
  const totalPagesFlagged = Math.ceil(filteredFlaggedItems.length / itemsPerPage);
  const startIndexFlagged = (currentPage - 1) * itemsPerPage;
  const endIndexFlagged = startIndexFlagged + itemsPerPage;
  const currentFlaggedItems = filteredFlaggedItems.slice(startIndexFlagged, endIndexFlagged);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearchText("");
    setCommunity("");
    setCity("");
    setStatus("");
    setVerification("");
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
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6"> <h2 className="text-xl font-semibold mb-6">Search & Filters</h2> <div className="grid grid-cols-1 gap-4"> {/* First Row: Search, Community, City, Status */} <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Search */} <input type="text" placeholder="Search by name, email or phone..." className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500" value={searchText} onChange={(e) => setSearchText(e.target.value)} /> {/* Community */} <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500" value={community} onChange={(e) => setCommunity(e.target.value)} > <option value="">Select Community</option> <option value="Downtown">Downtown</option> <option value="Suburb">Suburb</option> </select> {/* City */} <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500" value={city} onChange={(e) => setCity(e.target.value)} > <option value="">Select City</option> <option value="NY">New York</option> <option value="LA">Los Angeles</option> </select> {/* Status */} <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500" value={status} onChange={(e) => setStatus(e.target.value)} > <option value="">All Status</option> <option value="Active">Active</option> <option value="Inactive">Inactive</option> <option value="Ongoing">Ongoing</option> <option value="Completed">Completed</option> <option value="Cancelled">Cancelled</option> </select> </div> {/* Second Row: Verification and Buttons */} <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"> {/* Verification */} <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500" value={verification} onChange={(e) => setVerification(e.target.value)} > <option value="">All Verification</option> <option value="Verified">Verified</option> <option value="Pending">Pending</option> </select> {/* Buttons */} <div className="flex flex-wrap gap-3 w-full sm:w-auto"> <button onClick={applyFilters} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap" > Apply Filters </button> <button onClick={clearFilters} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap" > Clear Filters </button> </div> </div> </div> </div>

      {/* CAR SHARING TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Car Sharing / Rides</h2>
        <p className="text-sm text-gray-500 mt-1"> Manage all ride listings, including driver details, pickup and dropoff locations. </p>
        {/* TABLE WRAPPER FOR MOBILE RESPONSIVENESS */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Ride ID</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Driver Name</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Pickup / Dropoff</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Date & Time</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Fare</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRides.length > 0 ? (
                currentRides.map((ride, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{ride.rideId}</td>
                    <td className="p-3 text-gray-700">{ride.driverName}</td>
                    <td className="p-3 text-gray-700">{ride.pickupDropoff}</td>
                    <td className="p-3 text-gray-700">{ride.dateTime}</td>
                    <td className="p-3 text-gray-700">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${ride.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : ride.status === "Ongoing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {ride.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{ride.fare}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button className="cursor-pointer bg-[#16A34A] hover:bg-transparent hover:border-[#16A34A] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#16A34A] text-white">Remove</button>
                        <button onClick={() => handleBlockClick(ride)} className="cursor-pointer bg-[#DC2626] hover:bg-transparent hover:border-[#DC2626] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#DC2626] text-white">Block</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No rides found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FLAGGED ITEMS TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Flagged Items</h2>
        {/* Your flagged items table JSX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Report ID</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Reported User</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Issue Type</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Evidence</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentFlaggedItems.length > 0 ? (
                currentFlaggedItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{item.reportId}</td>
                    <td className="p-3 text-gray-700">{item.reportedUser}</td>
                    <td className="p-3 text-gray-700">{item.issueType}</td>
                    <td className="p-3 text-gray-700">{item.evidence}</td>
                    <td className="p-3 text-gray-700">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button className="cursor-pointer bg-[#03989E] hover:bg-transparent hover:border-[#03989E] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#03989E] text-white whitespace-nowrap">Mark as Reviewed</button>
                        <button className="cursor-pointer bg-[#16A34A] hover:bg-transparent hover:border-[#16A34A] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#16A34A] text-white whitespace-nowrap">Remove</button>
                        <button
                          onClick={() => handleBlockClick(item)} // Fix: handleBlockClick(item)
                          className="cursor-pointer bg-[#DC2626] hover:bg-transparent hover:border-[#DC2626] hover:border border border-transparent btn-sm px-3 py-1 rounded hover:text-[#DC2626] text-white whitespace-nowrap"
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No flagged items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Blocking User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center">
                <div className="w-10 h-1 bg-teal-500 transform rotate-45 absolute"></div>
              </div>
            </div>
            <h3 className="text-center text-xl font-semibold mb-2">
              Reported User Name
            </h3>
            <p className="text-center text-sm text-gray-600 mb-1">
              Are you sure you want to block this ride listing?
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="mb-6">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-900 mb-2">
                Reason for Suspension (optional)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows="3"
                placeholder="Please specify a reason"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBlockUser}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-2.5 rounded-md text-sm font-medium border border-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarSharing;
