import React, { useState } from 'react';

const BookingOverview = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsData = [
    {
      id: "REP2001",
      serviceProvider: "Bilal Ahmed",
      user: "Ali Raza",
      category: "Plumber",
      date: "08 Dec 2025",
      status: "Pending",
    },
    {
      id: "REP2001",
      serviceProvider: "Bilal Ahmed",
      user: "Ali Raza",
      category: "Plumber",
      date: "08 Dec 2025",
      status: "Pending",
    },
    {
      id: "REP2001",
      serviceProvider: "Bilal Ahmed",
      user: "Ali Raza",
      category: "Plumber",
      date: "08 Dec 2025",
      status: "Pending",
    },
    {
      id: "REP2001",
      serviceProvider: "Bilal Ahmed",
      user: "Ali Raza",
      category: "Plumber",
      date: "08 Dec 2025",
      status: "Pending",
    },
  ];

  const handleMarkComplete = (id) => {
    console.log(`Mark as Complete: ${id}`);
  };

  const handleRefund = (id) => {
    console.log(`Refund: ${id}`);
  };

  const handleCancel = (id) => {
    console.log(`Cancel: ${id}`);
  };

  const totalPages = 2;

  return (
    <div className=" pt-4 ">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-900">Booking Overview</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage service providers, view bookings, and review potential fraudulent activity.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Booking ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Service Provider
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  User
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900 font-medium">{booking.id}</td>
                  <td className="px-4 py-4 text-gray-700">{booking.serviceProvider}</td>
                  <td className="px-4 py-4 text-gray-700">{booking.user}</td>
                  <td className="px-4 py-4 text-teal-600 font-medium">
                    {booking.category}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{booking.date}</td>
                  <td className="px-4 py-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-xs font-medium">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMarkComplete(booking.id)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded text-xs font-medium transition whitespace-nowrap"
                      >
                        Mark as Complete
                      </button>
                      <button
                        onClick={() => handleRefund(booking.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                      >
                        Refund
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                      >
                        Cancel
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
          <p className="text-sm text-gray-600">Showing 1 to 4 of 1,247 results</p>

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
    </div>
  );
};

export default BookingOverview;