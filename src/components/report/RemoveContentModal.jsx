import React from "react";
import { Trash2, X } from "lucide-react";

const RemoveContentModal = ({ isOpen, onClose, report }) => {
  if (!isOpen) return null;

  const handleRemove = () => {
    // Handle remove content logic here
    console.log("Removing content for report:", report);
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
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center">
            <Trash2 size={48} className="text-teal-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">Remove Content</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Delete or hide the reported content from the platform.
        </p>

        {/* Content Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            A post description (or caption) is the text accompanying an image, video, or article on social media or blogs
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRemove}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Remove
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveContentModal;
