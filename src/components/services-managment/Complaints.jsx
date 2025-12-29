import React from "react";

const complaints = [
  {
    id: "CMP8001",
    group: "Green Heroes",
    reportedBy: "Sana Tariq",
    issue: "Misconduct",
    date: "08 Dec 2025",
    status: "Pending",
  },
  {
    id: "CMP8001",
    group: "Green Heroes",
    reportedBy: "Sana Tariq",
    issue: "Misconduct",
    date: "08 Dec 2025",
    status: "Resolved",
  },
  {
    id: "CMP8001",
    group: "Green Heroes",
    reportedBy: "Sana Tariq",
    issue: "Misconduct",
    date: "08 Dec 2025",
    status: "Pending",
  },
  {
    id: "CMP8001",
    group: "Green Heroes",
    reportedBy: "Sana Tariq",
    issue: "Misconduct",
    date: "08 Dec 2025",
    status: "Pending",
  },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Resolved: "bg-blue-100 text-blue-600",
};

const Complaints = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 mt-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Complaints
        </h2>
        <p className="mt-1 text-sm text-gray-500 max-w-3xl">
          Manage local volunteer groups, approve new teams, monitor activities,
          and handle complaints.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
              <th className="py-3 pr-6 font-medium">Complaint ID</th>
              <th className="py-3 pr-6 font-medium">Group</th>
              <th className="py-3 pr-6 font-medium">Reported By</th>
              <th className="py-3 pr-6 font-medium">Issue Type</th>
              <th className="py-3 pr-6 font-medium">Date</th>
              <th className="py-3 pr-6 font-medium">Status</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {complaints.map((item, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-4 pr-6 font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="py-4 pr-6">{item.group}</td>
                <td className="py-4 pr-6 text-teal-600 font-medium">
                  {item.reportedBy}
                </td>
                <td className="py-4 pr-6">{item.issue}</td>
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
                  <button className="px-4 py-1.5 text-xs font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition">
                    Resolve
                  </button>
                  <button className="px-4 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                    Remove
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

export default Complaints;
