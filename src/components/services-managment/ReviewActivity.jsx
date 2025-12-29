import React from "react";

const activities = [
  {
    id: "ACT4001",
    group: "Green Heroes",
    title: "Park Cleanup",
    participants: 44,
    date: "08 Dec 2025",
    status: "Pending",
  },
  {
    id: "ACT4001",
    group: "Green Heroes",
    title: "Park Cleanup",
    participants: 44,
    date: "08 Dec 2025",
    status: "Pending",
  },
  {
    id: "ACT4001",
    group: "Green Heroes",
    title: "Park Cleanup",
    participants: 44,
    date: "08 Dec 2025",
    status: "Completed",
  },
  {
    id: "ACT4001",
    group: "Green Heroes",
    title: "Park Cleanup",
    participants: 44,
    date: "08 Dec 2025",
    status: "Cancelled",
  },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

const ReviewActivity = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-6 mt-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Review Activity
        </h2>
        <p className="mt-1 text-sm text-gray-500 max-w-3xl">
          Manage local volunteer groups, approve new teams, monitor activities,
          and handle complaints.
        </p>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
              <th className="py-3 pr-6 font-medium">Activity ID</th>
              <th className="py-3 pr-6 font-medium">Group</th>
              <th className="py-3 pr-6 font-medium">Activity Title</th>
              <th className="py-3 pr-6 font-medium">Participants</th>
              <th className="py-3 pr-6 font-medium">Date</th>
              <th className="py-3 pr-6 font-medium">Status</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {activities.map((item, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-4 pr-6 font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="py-4 pr-6">{item.group}</td>
                <td className="py-4 pr-6">{item.title}</td>
                <td className="py-4 pr-6 text-teal-600 font-medium">
                  {item.participants}
                </td>
                <td className="py-4 pr-6 text-gray-500">
                  {item.date}
                </td>
                <td className="py-4 pr-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 flex items-center gap-3">
                  <button className="px-4 py-1.5 text-xs font-medium rounded-md bg-teal-600 text-white hover:bg-teal-700 transition">
                    Mark as Complete
                  </button>
                  <button className="px-4 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewActivity;
