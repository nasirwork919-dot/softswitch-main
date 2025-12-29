import React from 'react'
import  approveImg from "../../../assets/approve.png"
const ApproveVerificationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 h-16 w-16">
            <img src={approveImg} alt=""  />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Approve Verification</h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to approve this user's identity verification? Once approved, the user will be marked as verified.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Confirm
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

export default ApproveVerificationModal
