import React from 'react'
import { ClipboardCheck } from 'lucide-react'

const ActivateCommunityModal = ({ isOpen, onClose, onConfirm, communityName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          {/* Activate Icon */}
          <div className="relative w-16 h-16 mb-4">
            <ClipboardCheck className="w-16 h-16 text-teal-600" strokeWidth={1.5} />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Activate Community</h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            This community will become active and visible to all<br />
            users.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors min-w-[120px]"
          >
            Activate
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors min-w-[120px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActivateCommunityModal
