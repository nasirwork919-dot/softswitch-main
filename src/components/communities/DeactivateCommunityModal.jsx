import React from 'react'
import { ListX } from 'lucide-react'

const DeactivateCommunityModal = ({ isOpen, onClose, onConfirm, communityName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          {/* Deactivate Icon */}
          <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <ListX className="w-10 h-10 text-teal-600" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Deactivate Community</h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Are you sure you want to deactivate this community?<br />
            It will no longer be visible or accessible to users until<br />
            reactivated.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors min-w-[120px]"
          >
            Deactivate
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

export default DeactivateCommunityModal
