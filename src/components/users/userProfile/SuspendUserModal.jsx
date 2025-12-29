import React, { useState } from 'react'
import { Ban } from 'lucide-react'

const SuspendUserModal = ({ isOpen, onClose, onConfirm }) => {
  const [suspendReason, setSuspendReason] = useState('')

  const handleConfirm = () => {
    onConfirm(suspendReason)
    setSuspendReason('')
  }

  const handleClose = () => {
    onClose()
    setSuspendReason('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full border-2 border-teal-500 flex items-center justify-center mb-4">
            <Ban className="w-8 h-8 text-teal-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Suspend User Account</h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to suspend this user?<br />
            The user will lose access to their account until the suspension is lifted.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Reason for Suspension (optional)
          </label>
          <input
            type="text"
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            placeholder="Please specify a reason"
            className="w-full py-3 px-4 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleConfirm}
            className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={handleClose}
            className="px-8 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuspendUserModal
