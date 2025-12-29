import React from 'react'
import { Phone, Mail, MapPin, Calendar, ArrowLeft } from 'lucide-react'

const ViewProfilePanel = ({ customer, isVisible, onClose, isMobile }) => {
  if (!isVisible || !customer) return null

  return (
    <div className={`
      ${isMobile
        ? 'fixed inset-0 z-30 bg-white'
        : 'hidden lg:flex w-72 xl:w-80 border-l border-gray-200 bg-white'
      }
      flex-col
    `}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Back button - Mobile only */}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">View Profile</h3>
        </div>
        <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          Active
        </span>
      </div>

      {/* Profile Info */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {/* Avatar & Name */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl sm:text-2xl font-medium mx-auto mb-2 sm:mb-3">
            {customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900">{customer.name}</h4>
          <p className="text-xs sm:text-sm text-gray-500">({customer.userId})</p>
        </div>

        {/* Contact Details */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 truncate">{customer.phone || '+92 3465545'}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 truncate">{customer.email || 'Email@gmail.com'}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">{customer.location || 'Karachi'}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">{customer.joinDate || '12 Feb 2024'}</span>
          </div>
        </div>

        {/* User Activity Summary */}
        <div>
          <h5 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">User Activity Summary</h5>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Total Reports</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{customer.totalReports || 12}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Total Orders</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{customer.totalOrders || 15}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProfilePanel
