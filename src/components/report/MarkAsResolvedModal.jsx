import React, { useState } from "react";
import {  X } from "lucide-react";
import approve from "../../assets/approve.png";
const MarkAsResolvedModal = ({ isOpen, onClose, report }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleResolve = () => {
    // Handle mark as resolved logic here
    console.log("Marking report as resolved:", report, "Reason:", reason);
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
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={approve} alt="" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">Mark as Resolved</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Mark this report as resolved after taking appropriate action.
        </p>

        {/* Resolution Notes Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution Notes
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Add notes about the resolution..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleResolve}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Mark as Resolved
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAsResolvedModal;
