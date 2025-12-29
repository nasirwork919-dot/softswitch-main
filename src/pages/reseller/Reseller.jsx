import React, { useState } from 'react';
import { Search, Edit2, Trash2, Ban, Plus, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/users/HeroSection'; // Reuse Hero for consistency

const Reseller = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [status, setStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [resellers, setResellers] = useState([
        { id: 1, name: "Cloud Solutions Inc", email: "contact@cloudsol.com", credits: 5000, users: 124, status: "Active" },
        { id: 2, name: "FastNet Services", email: "admin@fastnet.io", credits: 250, users: 45, status: "Active" },
        { id: 3, name: "Global Systems", email: "support@globalsys.net", credits: 0, users: 12, status: "Suspended" },
        { id: 4, name: "Alpha Tech", email: "sales@alphatech.com", credits: 1200, users: 89, status: "Active" },
        { id: 5, name: "Beta Networks", email: "info@betanet.org", credits: 50, users: 5, status: "Active" },
    ]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this reseller?")) {
            setResellers(resellers.filter(r => r.id !== id));
        }
    };

    const handleSuspend = (id) => {
        setResellers(resellers.map(r => r.id === id ? { ...r, status: r.status === "Suspended" ? "Active" : "Suspended" } : r));
    };

    const filteredResellers = resellers.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchText.toLowerCase()) || r.email.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = status === "" || r.status === status;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredResellers.length / itemsPerPage);
    const currentResellers = filteredResellers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* CUSTOM HERO FOR RESELLER */}
            <div className="rounded-[2rem] mt-8 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-800 px-6 sm:px-10 lg:px-12 py-8 sm:py-12 flex items-center min-h-[160px] sm:min-h-[200px] shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
                <div className="text-left text-white max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-indigo-200 animate-pulse" />
                        Partner Portal
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Reseller Management</h1>
                    <p className="text-sm sm:text-base text-indigo-100/90 font-medium max-w-lg leading-relaxed">
                        Monitor reseller accounts, manage credit allocations, and track partner performance.
                    </p>
                </div>
            </div>

            {/* SEARCH & FILTER CARD */}
            <div className="pt-8 space-y-8">
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Search & Actions</h2>
                        <button
                            onClick={() => navigate('/reseller/add')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                        >
                            <Plus className="h-5 w-5" />
                            Add Reseller
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search resellers..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 appearance-none"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                        <button
                            onClick={() => { setSearchText(""); setStatus(""); }}
                            className="w-full px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 overflow-hidden">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Partner List</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Reseller Info</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Credits</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Users</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {currentResellers.map(row => (
                                    <tr key={row.id} className="group hover:bg-indigo-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{row.name}</h4>
                                                <p className="text-xs text-gray-400 font-medium">{row.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${row.credits < 500 ? 'text-orange-500' : 'text-gray-700'}`}>
                                                {row.credits.toLocaleString()} CR
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600">{row.users}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Manage Credits">
                                                    <DollarSign className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleSuspend(row.id)}
                                                    className={`p-2 rounded-lg transition-colors ${row.status === 'Suspended' ? 'text-green-600 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'
                                                        }`}
                                                >
                                                    <Ban className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(row.id)}
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
                </div>
            </div>
        </div>
    );
};

export default Reseller;
