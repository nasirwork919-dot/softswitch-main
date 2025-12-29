import React, { useState } from "react";
import { Eye, Edit2, Trash2, Ban, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SearchFilters = () => {
  const navigate = useNavigate();
  // FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [community, setCommunity] = useState("");
  const [status, setStatus] = useState("");

  // Paginaton
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // SAMPLE USERS
  const [users, setUsers] = useState([
    { id: "#1001", name: "Sarah Johnson", email: "sarah.j@email.com", community: "Downtown", status: "Active", joined: "Oct 24, 2024" },
    { id: "#1002", name: "Michael Chen", email: "m.chen@email.com", community: "Suburb", status: "Active", joined: "Nov 12, 2024" },
    { id: "#1003", name: "Emma Wilson", email: "emma.w@email.com", community: "Downtown", status: "Suspended", joined: "Dec 01, 2024" },
    { id: "#1004", name: "James Brown", email: "james.b@email.com", community: "Suburb", status: "Active", joined: "Dec 05, 2024" },
    { id: "#1005", name: "Olivia Davis", email: "olivia.d@email.com", community: "Downtown", status: "Active", joined: "Jan 03, 2025" },
    { id: "#1006", name: "Robert Fox", email: "robert.f@email.com", community: "Suburb", status: "Active", joined: "Jan 10, 2025" },
  ]);

  // Actions
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSuspend = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
  };

  // FILTER LOGIC
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesCommunity = community === "" || user.community === community;
    const matchesStatus = status === "" || user.status === status;
    return matchesSearch && matchesCommunity && matchesStatus;
  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchText("");
    setCommunity("");
    setStatus("");
    setCurrentPage(1);
  };

  return (
    <div className="pt-8 space-y-8">
      {/* SEARCH & FILTERS CARD */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Search & Filters</h2>
          <button
            onClick={() => navigate('/users/add')}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Add User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <select
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 appearance-none"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          >
            <option value="">All Communities</option>
            <option value="Downtown">Downtown</option>
            <option value="Suburb">Suburb</option>
          </select>

          <select
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 appearance-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>

          <button
            onClick={clearFilters}
            className="w-full px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 overflow-hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Registered Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">User Info</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Community</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{user.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.community}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSuspend(user.id)}
                        className={`p-2 rounded-lg transition-colors ${user.status === 'Suspended' ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'
                          }`}
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;