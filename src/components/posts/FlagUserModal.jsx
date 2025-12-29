import React, { useState } from "react";
import { Flag, X } from "lucide-react";

const FlagUserModal = ({ open, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Flag size={40} className="text-teal-600 mb-3" />
          <h2 className="text-xl font-semibold">Flag User for Violation</h2>
          <p className="text-gray-600 text-sm mt-2">
            Are you sure you want to flag this user for violating community guidelines?
          </p>
        </div>

        {/* Input */}
        <div className="mt-6">
          <label className="text-sm font-semibold">Reason for Flagging</label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for flagging this user..."
            className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={() => onSubmit(reason)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
          >
            Confirm
          </button>

          <button
            onClick={onClose}
            className="border border-gray-200 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlagUserModal;
