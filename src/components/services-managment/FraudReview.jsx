import React, { useState } from 'react';

const FraudReview = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fraudData = [
    {
      userProvider: "Bilal Ahmed",
      activityType: "Fake bookings",
      incidents: 6,
      lastIncidentDate: "08 Dec 2025",
      status: "Pending",
    },
    {
      userProvider: "Bilal Ahmed",
      activityType: "Payment manipulation",
      incidents: 6,
      lastIncidentDate: "08 Dec 2025",
      status: "Cleared",
    },
    {
      userProvider: "Bilal Ahmed",
      activityType: "Fake bookings",
      incidents: 6,
      lastIncidentDate: "08 Dec 2025",
      status: "Pending",
    },
    {
      userProvider: "Bilal Ahmed",
      activityType: "Fake bookings",
      incidents: 6,
      lastIncidentDate: "08 Dec 2025",
      status: "Pending",
    },
  ];

  const handleMarkSafe = (user, activity) => {
    console.log(`Mark Safe: ${user} - ${activity}`);
  };

  const handleBlock = (user, activity) => {
    console.log(`Block: ${user} - ${activity}`);
  };

  const totalPages = 2;

  return (
    <div className=" pt-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-900">Fraud Review</h2>
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
                  User / Provider
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Activity Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  # Incidents
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 text-xs">
                  Last Incident Date
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
              {fraudData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-900">{item.userProvider}</td>
                  <td className="px-4 py-4 text-gray-700">{item.activityType}</td>
                  <td className="px-4 py-4 text-teal-600 font-medium">{item.incidents}</td>
                  <td className="px-4 py-4 text-gray-700">{item.lastIncidentDate}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMarkSafe(item.userProvider, item.activityType)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                      >
                        Mark Safe
                      </button>
                      <button
                        onClick={() => handleBlock(item.userProvider, item.activityType)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                      >
                        Block
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

export default FraudReview;