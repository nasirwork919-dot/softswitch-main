import React from "react";
import { X, Trash2 } from "lucide-react";
import deleteIcon from "../../assets/delete.png";
const DeleteEventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    console.log("Deleting event:", event);
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
          <img src={deleteIcon} alt="" className="h-16 w-16 object-contain"/>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          Delete / Block Event
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-2">
          This action will permanently remove the event and all
          <br />
          related activity from the platform.
        </p>
        <p className="text-sm text-gray-500 text-center mb-8">
          This cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-sm font-medium transition"
          >
            Delete
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

export default DeleteEventModal;
