import React, { useState } from 'react';

const CreateBackupModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    backupName: '',
    backupType: 'Full Backup',
    storageLocation: 'Local Server',
    encryptionEnabled: true,
    encryptionPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (onCreate) {
      onCreate(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      backupName: '',
      backupType: 'Full Backup',
      storageLocation: 'Local Server',
      encryptionEnabled: true,
      encryptionPassword: ''
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
                Create New Backup
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Select backup type and create a secure system backup. You can download or restore this backup anytime.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Backup Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Backup Name
                </label>
                <input
                  type="text"
                  name="backupName"
                  value={formData.backupName}
                  onChange={handleInputChange}
                  placeholder="Enter backup name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Backup Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Backup Type
                </label>
                <div className="relative">
                  <select
                    name="backupType"
                    value={formData.backupType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer text-sm"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center'
                    }}
                  >
                    <option value="Full Backup">Full Backup</option>
                    <option value="Database Backup">Database Backup</option>
                    <option value="Files Backup">Files Backup</option>
                    <option value="Configuration Backup">Configuration Backup</option>
                  </select>
                </div>
              </div>

              {/* Storage Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Storage Location
                </label>
                <div className="relative">
                  <select
                    name="storageLocation"
                    value={formData.storageLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer text-sm"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center'
                    }}
                  >
                    <option value="Local Server">Local Server</option>
                    <option value="Cloud Storage">Cloud Storage</option>
                    <option value="External Drive">External Drive</option>
                  </select>
                </div>
              </div>

              {/* Encryption Toggle */}
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700">Encryption (Optional)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.encryptionEnabled}
                    onChange={() => setFormData(prev => ({
                      ...prev,
                      encryptionEnabled: !prev.encryptionEnabled
                    }))}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    formData.encryptionEnabled ? 'bg-teal-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      formData.encryptionEnabled ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </label>
              </div>

              {/* Encryption Password */}
              {formData.encryptionEnabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Encryption Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="encryptionPassword"
                      value={formData.encryptionPassword}
                      onChange={handleInputChange}
                      placeholder="Enter encryption password"
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
                </div>
              )}

              {/* Warning Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Warning</p>
                    <p className="text-sm text-amber-700 mt-0.5">
                      Creating a backup may take a few minutes. Please do not close the browser or refresh the page
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors text-sm"
              >
                Create Backup
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

export default CreateBackupModal;
