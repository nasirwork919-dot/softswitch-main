import React from "react";
import { X } from "lucide-react";

const ViewComplaintsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  // Sample complaint data
  const complaint = {
    id: "#433",
    submittedBy: "Sana Malik",
    type: "Scam / Fraud",
    status: "Pending / Reviewed",
    submittedOn: "02-02-2024",
    message:
      '"Organizer collected registration fees online but never shared entry passes."',
  };

  const handleMarkAsReviewed = () => {
    console.log("Marking complaint as reviewed for event:", event);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          View Complaints
        </h2>

        {/* Complaint Details Grid */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mb-6">
          {/* Complaint ID */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Complaint ID</p>
            <p className="text-sm font-medium text-gray-900">{complaint.id}</p>
          </div>

          {/* Submitted By */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Submitted By</p>
            <p className="text-sm font-medium text-gray-900">{complaint.submittedBy}</p>
          </div>

          {/* Complaint Type */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Complaint Type</p>
            <p className="text-sm font-medium text-gray-900">{complaint.type}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className="text-sm font-medium text-gray-900">{complaint.status}</p>
          </div>

          {/* Submitted On */}
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-1">Submitted On</p>
            <p className="text-sm font-medium text-gray-900">{complaint.submittedOn}</p>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Message</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {complaint.message}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleMarkAsReviewed}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
          >
            Mark as Reviewed
          </button>
          <button
            onClick={onClose}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaintsModal;
