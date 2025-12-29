import React, { useState } from 'react';
import AddSuperAdminModal from './AddSuperAdminModal';

const LanguageLocalization = () => {
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [multiLanguageEnabled, setMultiLanguageEnabled] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  const [admins, setAdmins] = useState([
    {
      id: 'ADM-001',
      name: 'John Smith',
      email: 'john@admin.com',
      role: 'Owner',
      status: 'Active',
      avatar: 'JS'
    }
  ]);

  const handleAddSuperAdmin = () => {
    setIsAddAdminModalOpen(true);
  };

  const handleAddNewAdmin = (adminData) => {
    const newAdmin = {
      id: `ADM-${String(admins.length + 1).padStart(3, '0')}`,
      name: adminData.fullName,
      email: adminData.email,
      role: adminData.role,
      status: adminData.status,
      avatar: adminData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setAdmins([...admins, newAdmin]);
  };

  const handleEdit = (adminId) => {
    console.log('Editing admin:', adminId);
    alert(`Editing admin ${adminId}`);
  };

  const handleSuspend = (adminId) => {
    console.log('Suspending admin:', adminId);
    if (window.confirm(`Are you sure you want to suspend admin ${adminId}?`)) {
      alert(`Admin ${adminId} suspended`);
    }
  };

  const handleDelete = (adminId) => {
    console.log('Deleting admin:', adminId);
    if (window.confirm(`Are you sure you want to delete admin ${adminId}?`)) {
      setAdmins(admins.filter(admin => admin.id !== adminId));
      alert(`Admin ${adminId} deleted`);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full pt-4 space-y-6">
      {/* Language & Localization Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Language & Localization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Default Language */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Default Language
            </label>
            <select
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center'
              }}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
              <option>Japanese</option>
              <option>Arabic</option>
            </select>
          </div>

          {/* Multiple Languages Toggle */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Multiple Languages
            </label>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={multiLanguageEnabled}
                  onChange={() => setMultiLanguageEnabled(!multiLanguageEnabled)}
                  className="sr-only"
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${
                  multiLanguageEnabled ? 'bg-teal-600' : 'bg-gray-300'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                  multiLanguageEnabled ? 'transform translate-x-6' : ''
                }`}></div>
              </div>
              <span className="ml-3 text-sm text-gray-600">
                Enable multi-language support
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Super Admin Accounts Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Super Admin Accounts
          </h2>
          <button
            onClick={handleAddSuperAdmin}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
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
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Add Super Admin
          </button>
        </div>

        {/* Table with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {getInitials(admin.name)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {admin.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(admin.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleSuspend(admin.id)}
                        className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                        title="Suspend"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Super Admin Modal */}
      <AddSuperAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        onAdd={handleAddNewAdmin}
      />
    </div>
  );
};

export default LanguageLocalization;