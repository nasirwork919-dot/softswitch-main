import React, { useState } from 'react';

const AddSuperAdminModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    status: '',
    permissions: {
      userManagement: true,
      marketplaceManagement: true,
      reportsComplaints: true,
      systemSettings: true,
      financePayments: true
    }
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const handleSubmit = () => {
    if (onAdd) {
      onAdd(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: '',
      status: '',
      permissions: {
        userManagement: true,
        marketplaceManagement: true,
        reportsComplaints: true,
        systemSettings: true,
        financePayments: true
      }
    });
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all">
          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Super Admin
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Create a new super admin account with full or limited system access.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  Minimum 8 characters, include number & special character.
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer text-sm"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center'
                    }}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="Owner">Owner</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer text-sm"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center'
                    }}
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* User Management */}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.userManagement}
                      onChange={() => handlePermissionChange('userManagement')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 transition-colors ${
                      formData.permissions.userManagement ? 'bg-teal-600' : 'bg-gray-200'
                    }`}>
                      {formData.permissions.userManagement && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">User Management</span>
                  </label>

                  {/* System Settings */}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.systemSettings}
                      onChange={() => handlePermissionChange('systemSettings')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 transition-colors ${
                      formData.permissions.systemSettings ? 'bg-teal-600' : 'bg-gray-200'
                    }`}>
                      {formData.permissions.systemSettings && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">System Settings</span>
                  </label>

                  {/* Marketplace Management */}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.marketplaceManagement}
                      onChange={() => handlePermissionChange('marketplaceManagement')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 transition-colors ${
                      formData.permissions.marketplaceManagement ? 'bg-teal-600' : 'bg-gray-200'
                    }`}>
                      {formData.permissions.marketplaceManagement && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">Marketplace Management</span>
                  </label>

                  {/* Finance & Payments */}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.financePayments}
                      onChange={() => handlePermissionChange('financePayments')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 transition-colors ${
                      formData.permissions.financePayments ? 'bg-teal-600' : 'bg-gray-200'
                    }`}>
                      {formData.permissions.financePayments && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">Finance & Payments</span>
                  </label>

                  {/* Reports & Complaints */}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.reportsComplaints}
                      onChange={() => handlePermissionChange('reportsComplaints')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 transition-colors ${
                      formData.permissions.reportsComplaints ? 'bg-teal-600' : 'bg-gray-200'
                    }`}>
                      {formData.permissions.reportsComplaints && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">Reports & Complaints</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors text-sm"
              >
                Add
              </button>
              <button
                onClick={handleClose}
                className="px-8 py-2.5 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSuperAdminModal;
