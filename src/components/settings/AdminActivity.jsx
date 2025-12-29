import React, { useState } from 'react';
import CreateBackupModal from './CreateBackupModal';

const AdminActivity = () => {
  const [backupType, setBackupType] = useState('Full System Backup');
  const [isCreateBackupModalOpen, setIsCreateBackupModalOpen] = useState(false);
  
  const activityLogs = [
    {
      id: 'ACT-2091',
      adminName: 'Ali Admin',
      action: 'Deleted user',
      module: 'User Module',
      ipAddress: '192.168.0.12',
      dateTime: '13 Jul 2025, 11:22 PM'
    },
    {
      id: 'ACT-2090',
      adminName: 'Sarah Admin',
      action: 'Updated settings',
      module: 'System Module',
      ipAddress: '192.168.0.15',
      dateTime: '13 Jul 2025, 10:45 PM'
    }
  ];

  const [recentBackups, setRecentBackups] = useState([
    {
      id: 'BKP-001',
      type: 'Full System',
      size: '2.3 GB',
      date: 'Jul 13, 2025'
    }
  ]);

  const handleExportLogs = () => {
    console.log('Exporting logs...');
    alert('Activity logs exported successfully!');
  };

  const handleCreateBackup = () => {
    setIsCreateBackupModalOpen(true);
  };

  const handleCreateNewBackup = (backupData) => {
    const newBackup = {
      id: `BKP-${String(recentBackups.length + 1).padStart(3, '0')}`,
      type: backupData.backupType.replace(' Backup', ''),
      size: '0 KB',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setRecentBackups([newBackup, ...recentBackups]);
    alert('Backup created successfully!');
  };

  const handleDownloadBackup = (backupId) => {
    console.log('Downloading backup:', backupId);
    alert(`Downloading backup ${backupId}...`);
  };

  const handleRestoreBackup = (backupId) => {
    console.log('Restoring backup:', backupId);
    if (window.confirm(`Are you sure you want to restore backup ${backupId}?`)) {
      alert(`Restoring backup ${backupId}...`);
    }
  };

  return (
    <div className="w-full pt-4 space-y-6">
      {/* Admin Activity Logs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Admin Activity Logs
          </h2>
          <button
            onClick={handleExportLogs}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
            Export Logs
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {log.adminName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {log.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {log.dateTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden p-4 space-y-4">
          {activityLogs.map((log) => (
            <div key={log.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-900">{log.id}</span>
                <span className="text-xs text-gray-500">{log.dateTime}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Admin: </span>
                <span className="text-gray-900">{log.adminName}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Action: </span>
                <span className="text-gray-900">{log.action}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Module: </span>
                <span className="text-gray-900">{log.module}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">IP: </span>
                <span className="text-gray-900">{log.ipAddress}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup & Restore Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Backup & Restore
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Backup */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Create Backup
            </h3>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Backup Type
              </label>
              <select
                value={backupType}
                onChange={(e) => setBackupType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer mb-4"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center'
                }}
              >
                <option>Full System Backup</option>
                <option>Database Backup</option>
                <option>Files Backup</option>
                <option>Configuration Backup</option>
              </select>

              <button
                onClick={handleCreateBackup}
                className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                Create New Backup
              </button>
            </div>
          </div>

          {/* Recent Backups */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Recent Backups
            </h3>
            
            <div className="space-y-3">
              {recentBackups.map((backup) => (
                <div 
                  key={backup.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{backup.id}</div>
                    <div className="text-sm text-gray-600">
                      {backup.type} - {backup.size}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{backup.date}</div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleDownloadBackup(backup.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Download"
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                        />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleRestoreBackup(backup.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Restore"
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Create Backup Modal */}
      <CreateBackupModal
        isOpen={isCreateBackupModalOpen}
        onClose={() => setIsCreateBackupModalOpen(false)}
        onCreate={handleCreateNewBackup}
      />
    </div>
  );
};

export default AdminActivity;