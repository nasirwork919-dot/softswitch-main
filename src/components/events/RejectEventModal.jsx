import React, { useState } from "react";
import { X } from "lucide-react";
import reject from "../../assets/reject.png";
const RejectEventModal = ({ isOpen, onClose, event }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleReject = () => {
    console.log("Rejecting event:", event, "Reason:", reason);
    setReason("");
    onClose();
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
         <img src={reject} alt="" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          Reject Event
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to reject this event?
          <br />
          The organizer will be notified to review and resubmit.
        </p>

        {/* Reason Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Reason for Rejection (optional)
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for rejection..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-sm font-medium transition"
          >
            Reject
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectEventModal;
