import React from "react";
import { X } from "lucide-react";
import approve from "../../assets/approve.png";
const ApproveEventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  const handleApprove = () => {
    console.log("Approving event:", event);
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
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
         <img src={approve} alt="" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          Approve Event
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-8">
          Are you sure you want to approve this event?
          <br />
          It will become visible to all users in the selected community.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-sm font-medium transition"
          >
            Approve
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveEventModal;
