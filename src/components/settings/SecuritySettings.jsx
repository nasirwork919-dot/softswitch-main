import React, { useState } from 'react';

const SecuritySettings = () => {
  const [retentionPeriod, setRetentionPeriod] = useState('30 Days');
  const [minPasswordLength, setMinPasswordLength] = useState('6 characters');
  const [requirements, setRequirements] = useState({
    uppercase: true,
    numbers: true,
    specialChars: true
  });

  const handleCheckboxChange = (key) => {
    setRequirements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    console.log('Security settings saved:', {
      retentionPeriod,
      minPasswordLength,
      requirements
    });
    alert('Security Settings saved successfully!');
  };

  return (
    <div className="w-full pt-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Privacy & Security Settings
        </h2>
        
        {/* Data Retention Section */}
        <div className="mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Data Retention
          </h3>
          
          <div className="flex flex-col max-w-md">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Retention Period
            </label>
            <select
              value={retentionPeriod}
              onChange={(e) => setRetentionPeriod(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center'
              }}
            >
              <option>30 Days</option>
              <option>60 Days</option>
              <option>90 Days</option>
              <option>180 Days</option>
              <option>1 Year</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Old logs and deleted items will be removed automatically
            </p>
          </div>
        </div>

        {/* Password Policy Section */}
        <div className="mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Password Policy
          </h3>
          
          <div className="flex flex-col max-w-md mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Minimum Password Length
            </label>
            <select
              value={minPasswordLength}
              onChange={(e) => setMinPasswordLength(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center'
              }}
            >
              <option>6 characters</option>
              <option>8 characters</option>
              <option>10 characters</option>
              <option>12 characters</option>
              <option>16 characters</option>
            </select>
          </div>

          {/* Password Requirements Checkboxes */}
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password Requirements
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={requirements.uppercase}
                  onChange={() => handleCheckboxChange('uppercase')}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all ${
                  requirements.uppercase 
                    ? 'bg-teal-600 border-teal-600' 
                    : 'bg-white border-gray-300 group-hover:border-teal-400'
                }`}>
                  {requirements.uppercase && (
                    <svg
                      className="w-full h-full text-white p-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-700">
                Must include uppercase letters
              </span>
            </label>

            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={requirements.numbers}
                  onChange={() => handleCheckboxChange('numbers')}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all ${
                  requirements.numbers 
                    ? 'bg-teal-600 border-teal-600' 
                    : 'bg-white border-gray-300 group-hover:border-teal-400'
                }`}>
                  {requirements.numbers && (
                    <svg
                      className="w-full h-full text-white p-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-700">
                Must include numbers
              </span>
            </label>

            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={requirements.specialChars}
                  onChange={() => handleCheckboxChange('specialChars')}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all ${
                  requirements.specialChars 
                    ? 'bg-teal-600 border-teal-600' 
                    : 'bg-white border-gray-300 group-hover:border-teal-400'
                }`}>
                  {requirements.specialChars && (
                    <svg
                      className="w-full h-full text-white p-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-700">
                Must include special characters
              </span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
          >
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;