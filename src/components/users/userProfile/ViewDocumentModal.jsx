import React from 'react'

const ViewDocumentModal = ({ isOpen, onClose, onApprove, onReject, document }) => {
  if (!isOpen || !document) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">View Identity Document</h3>

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Document Type</p>
            <p className="text-sm font-medium text-gray-900">{document.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Submitted</p>
            <p className="text-sm font-medium text-gray-900">{document.dateSubmitted}</p>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-center min-h-[300px]">
          <img
            src={document.previewUrl || "https://via.placeholder.com/500x300?text=Document+Preview"}
            alt="Document preview"
            className="max-w-full max-h-[300px] object-contain rounded-lg shadow-md"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onApprove}
            className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Reject Document
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewDocumentModal
