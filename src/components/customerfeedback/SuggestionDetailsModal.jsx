import React, { useState } from "react";
import { X } from "lucide-react";

const SuggestionDetailsModal = ({ isOpen, onClose, suggestion }) => {
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("New");
  const [adminNotes, setAdminNotes] = useState("");

  if (!isOpen || !suggestion) return null;

  const handleSave = () => {
    // Handle save logic here
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
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-6">Suggestion Details</h2>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div>
            <p className="text-sm text-teal-600 mb-1">Suggestion ID</p>
            <p className="font-medium text-gray-900">{suggestion.id}</p>
          </div>
          <div>
            <p className="text-sm text-teal-600 mb-1">User Name</p>
            <p className="font-medium text-gray-900">{suggestion.userName}</p>
          </div>
          <div>
            <p className="text-sm text-teal-600 mb-1">Votes</p>
            <p className="font-medium text-gray-900">{suggestion.votes || "345"}</p>
          </div>
        </div>

        {/* Suggestion Text */}
        <div className="mb-6">
          <p className="text-sm text-teal-600 mb-1">Suggestion</p>
          <p className="text-gray-900">"{suggestion.suggestionText || "Please add dark mode for better readability at night."}"</p>
        </div>

        {/* Admin Controls */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Admin Controls</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Assign To</label>
              <select
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Team Member Dropdown</option>
                <option value="member1">John Doe</option>
                <option value="member2">Jane Smith</option>
                <option value="member3">Mike Johnson</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Planned">Planned</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Admin Notes</label>
            <input
              type="text"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Save
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

export default SuggestionDetailsModal;
