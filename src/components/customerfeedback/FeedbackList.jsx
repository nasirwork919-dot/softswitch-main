import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import FeedbackDetailsModal from "./FeedbackDetailsModal";

const FeedbackList = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const feedbackData = [
    {
      id: "#433",
      userName: "Sana Malik",
      category: "Services",
      rating: 5,
      date: "02-02-2024",
      status: "New",
      message: "The new homepage feels clean and easy to navigate.",
    },
    {
      id: "#434",
      userName: "Ayesha Khan",
      category: "Services",
      rating: 3,
      date: "10 Jan 2025",
      status: "Assigned",
      message: "Good service but could improve response time.",
    },
    {
      id: "#435",
      userName: "Ahmed Ali",
      category: "Products",
      rating: 4,
      date: "10 Jan 2025",
      status: "Resolved",
      message: "Product quality is excellent.",
    },
    {
      id: "#436",
      userName: "Sara Ahmed",
      category: "Support",
      rating: 3,
      date: "10 Jan 2025",
      status: "New",
      message: "Support team was helpful.",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "bg-teal-500 text-white";
      case "Assigned":
        return "bg-yellow-400 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const clearFilters = () => {
    setSearch("");
    setSortBy("newest");
    setDateRange("");
    setCategory("");
  };

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="rating">Sort: Rating</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Category</option>
            <option value="Services">Services</option>
            <option value="Products">Products</option>
            <option value="Support">Support</option>
            <option value="General">General</option>
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

      {/* Feedback Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Feedback List</h2>
          <p className="text-sm text-gray-500">View and manage feedback submitted by all users.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border border-gray-200 text-gray-600">
                <th className="p-3 text-left font-medium whitespace-nowrap">Feedback ID</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">User Name</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Category</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Rating</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Date</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Status</th>
                <th className="p-3 text-left font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback, index) => (
                <tr key={index} className="border border-gray-200 hover:bg-gray-50">
                  <td className="p-3 text-gray-700 whitespace-nowrap">{feedback.id}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{feedback.userName}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{feedback.category}</td>
                  <td className="p-3">{renderStars(feedback.rating)}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{feedback.date}</td>
                  <td className="p-3">
                    <span className={`${getStatusBadge(feedback.status)} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(feedback)} className="p-2 hover:bg-gray-100 rounded-lg text-teal-600">
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
                  currentPage === page ? "bg-teal-600 text-white" : "border border-gray-300 hover:bg-gray-100"
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

      {/* Feedback Details Modal */}
      <FeedbackDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        feedback={selectedFeedback}
      />
    </>
  );
};

export default FeedbackList;
