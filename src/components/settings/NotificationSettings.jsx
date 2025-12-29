import React, { useState } from 'react';

const NotificationSettings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const ToggleSwitch = ({ enabled, onToggle }) => {
    return (
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
          enabled ? 'bg-teal-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    );
  };

  return (
    <div className=" pt-3">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          
          {/* Header */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Notification Settings
          </h1>

          {/* Notification Options */}
          <div className="space-y-1">
            
            {/* Push Notifications */}
            <div className="flex items-start justify-between p-5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex-1 pr-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Push Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Enable/disable push notifications for all users
                </p>
              </div>
              <div className="flex-shrink-0">
                <ToggleSwitch
                  enabled={pushNotifications}
                  onToggle={() => setPushNotifications(!pushNotifications)}
                />
              </div>
            </div>

            {/* Email Notifications */}
            <div className="flex items-start justify-between p-5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex-1 pr-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Enable system-wide email alerts
                </p>
              </div>
              <div className="flex-shrink-0">
                <ToggleSwitch
                  enabled={emailNotifications}
                  onToggle={() => setEmailNotifications(!emailNotifications)}
                />
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-start justify-between p-5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex-1 pr-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  SMS Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Requires SMS Gateway setup
                </p>
              </div>
              <div className="flex-shrink-0">
                <ToggleSwitch
                  enabled={smsNotifications}
                  onToggle={() => setSmsNotifications(!smsNotifications)}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;