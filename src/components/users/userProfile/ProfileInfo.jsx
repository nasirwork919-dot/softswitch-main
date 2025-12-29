import React, { useState } from 'react'
import {
  Ban,
  CheckCircle,
  ShieldCheck,
  Monitor,
  Smartphone,
  FileText,
  Check,
  X,
  Pencil
} from 'lucide-react'
import SuspendUserModal from './SuspendUserModal'
import ViewDocumentModal from './ViewDocumentModal'
import ApproveVerificationModal from './ApproveVerificationModal'
import RejectVerificationModal from './RejectVerificationModal'

const ProfileInfo = () => {
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showViewDocumentModal, setShowViewDocumentModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  // Mock user data
  const initialUserData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    isActive: true,
    isVerified: true,
    phone: "+1 (555) 123-4567",
    gender: "Female",
    dateOfBirth: "March 15, 1992",
    city: "New York",
    community: "Tech Enthusiasts",
    joinedOn: "January 12, 2024",
  }

  const [userData, setUserData] = useState(initialUserData)
  const [editFormData, setEditFormData] = useState(initialUserData)

  const handleEditChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveEdit = () => {
    setUserData(editFormData)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditFormData(userData)
    setIsEditing(false)
  }

  const handleSuspendUser = (reason) => {
    // Handle suspension logic here
    console.log('User suspended with reason:', reason)
    setShowSuspendModal(false)
  }

  const activityData = {
    totalPosts: 247,
    eventsParticipated: 18,
    reportsFiled: 3,
    reportsReceived: 1,
    lastActive: "2 hours ago",
  }

  const loginHistory = [
    { device: "Desktop - Chrome", location: "New York, US", time: "2h ago", icon: Monitor },
    { device: "Mobile - Safari", location: "New York, US", time: "1d ago", icon: Smartphone },
    { device: "Desktop - Firefox", location: "New York, US", time: "3d ago", icon: Monitor },
  ]

  const [identityDocument, setIdentityDocument] = useState({
    type: "Driver's License",
    number: "DL123456789",
    status: "Pending Review",
    dateSubmitted: "Oct 18, 2025",
    previewUrl: "https://via.placeholder.com/500x300?text=Document+Preview",
    files: ["drivers_license_front.jpg", "drivers_license_back.jpg"],
  })

  const handleFileClick = (file) => {
    setSelectedDocument({
      ...identityDocument,
      fileName: file,
    })
    setShowViewDocumentModal(true)
  }

  const handleApproveFromView = () => {
    setShowViewDocumentModal(false)
    setShowApproveModal(true)
  }

  const handleRejectFromView = () => {
    setShowViewDocumentModal(false)
    setShowRejectModal(true)
  }

  const handleConfirmApprove = () => {
    setIdentityDocument(prev => ({ ...prev, status: "Approved" }))
    setShowApproveModal(false)
  }

  const handleConfirmReject = () => {
    setIdentityDocument(prev => ({ ...prev, status: "Rejected" }))
    setShowRejectModal(false)
  }

  return (
    <div className="p-6 space-y-6">
      {/* User Profile Header Card - Full Width */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
              <p className="text-sm text-gray-500">{userData.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-green-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Active
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-blue-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <button
              onClick={() => setShowSuspendModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Ban className="w-4 h-4" />
              Suspend User
            </button>
            <button
              onClick={() => {
                setEditFormData(userData)
                setIsEditing(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info & Identity Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => handleEditChange('phone', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.phone}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Gender</label>
                {isEditing ? (
                  <select
                    value={editFormData.gender}
                    onChange={(e) => handleEditChange('gender', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.gender}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.dateOfBirth}
                    onChange={(e) => handleEditChange('dateOfBirth', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.dateOfBirth}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) => handleEditChange('city', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.city}
                  </p>
                )}
              </div>

              {/* Community */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Community</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editFormData.community}
                    onChange={(e) => handleEditChange('community', e.target.value)}
                    className="w-full text-sm text-gray-900 py-2.5 px-3 bg-white rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.community}
                  </p>
                )}
              </div>

              {/* Joined On */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Joined On</label>
                <p className="text-sm text-gray-900 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.joinedOn}
                </p>
              </div>
            </div>
          </div>

          {/* Identity Documents Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Identity Documents</h2>

            {/* Document Table Header */}
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-500">Document Type</span>
              <span className="text-xs font-medium text-gray-500">Document Number</span>
              <span className="text-xs font-medium text-gray-500">Status</span>
            </div>

            {/* Document Row */}
            <div className="grid grid-cols-3 gap-4 py-4 items-center">
              <span className="text-sm text-gray-900">{identityDocument.type}</span>
              <span className="text-sm text-gray-900">{identityDocument.number}</span>
              <span className={`inline-flex items-center gap-1.5 text-sm ${
                identityDocument.status === "Approved"
                  ? "text-green-500"
                  : identityDocument.status === "Rejected"
                    ? "text-red-500"
                    : "text-orange-500"
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  identityDocument.status === "Approved"
                    ? "bg-green-500"
                    : identityDocument.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-orange-500"
                }`}></span>
                {identityDocument.status}
              </span>
            </div>

            {/* Uploaded Files */}
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-3">Uploaded Files</label>
              <div className="flex flex-wrap gap-4">
                {identityDocument.files.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => handleFileClick(file)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{file}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons - Only show when status is Pending Review */}
            {identityDocument.status === "Pending Review" && (
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Approve Document
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Reject Document
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Activity Overview & Login History */}
        <div className="space-y-6">
          {/* Activity Overview Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Total Posts</span>
                <span className="text-sm font-semibold text-gray-900">{activityData.totalPosts}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Events Participated</span>
                <span className="text-sm font-semibold text-gray-900">{activityData.eventsParticipated}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Reports Filed</span>
                <span className="text-sm font-semibold text-gray-900">{activityData.reportsFiled}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Reports Received</span>
                <span className="text-sm font-semibold text-red-500">{activityData.reportsReceived}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Last Active</span>
                <span className="text-sm font-semibold text-teal-500">{activityData.lastActive}</span>
              </div>
            </div>
          </div>

          {/* Recent Login History Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Login History</h2>

            <div className="space-y-4">
              {loginHistory.map((login, index) => {
                const IconComponent = login.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{login.device}</p>
                      <p className="text-xs text-gray-500">{login.location}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{login.time}</span>
                  </div>
                )
              })}
            </div>

            <button className="w-full mt-4 text-center text-sm text-teal-500 hover:text-teal-600 font-medium transition-colors">
              View Full History
            </button>
          </div>
        </div>
      </div>

      {/* Suspend User Modal */}
      <SuspendUserModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleSuspendUser}
      />

      {/* View Document Modal */}
      <ViewDocumentModal
        isOpen={showViewDocumentModal}
        onClose={() => setShowViewDocumentModal(false)}
        onApprove={handleApproveFromView}
        onReject={handleRejectFromView}
        document={selectedDocument}
      />

      {/* Approve Verification Modal */}
      <ApproveVerificationModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleConfirmApprove}
      />

      {/* Reject Verification Modal */}
      <RejectVerificationModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleConfirmReject}
      />
    </div>
  )
}

export default ProfileInfo
