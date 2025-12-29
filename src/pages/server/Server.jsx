import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server as ServerIcon, RefreshCw, Trash2, Plus, Search, Activity, Power } from 'lucide-react';
import Table from '../../components/common/Table';

const Server = () => {
    const navigate = useNavigate();
    const [servers, setServers] = useState([]);
    const [searchText, setSearchText] = useState("");

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Service", accessor: "service" },
        {
            header: "Status",
            accessor: "status",
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${row.status === 'Active' ? 'bg-green-100 text-green-700' :
                        row.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: "Location", accessor: "location" },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">

            {/* HERO SECTION */}
            <div className="rounded-[2rem] mt-8 bg-gradient-to-br from-indigo-800 via-purple-700 to-indigo-900 px-6 sm:px-10 lg:px-12 py-8 sm:py-12 flex items-center min-h-[160px] sm:min-h-[200px] shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl" />

                <div className="text-left text-white max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Infrastructure
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Server Management</h1>
                    <p className="text-sm sm:text-base text-purple-100/90 font-medium max-w-lg leading-relaxed">
                        Deploy, monitor, and manage your VPS instances and connection nodes.
                    </p>
                </div>
            </div>

            {/* STATUS LEGEND RANK */}
            <div className="mt-8 mb-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Status Indicator:</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">ACTIVE</span>
                            <span>- All services operational</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">INACTIVE</span>
                            <span>- Service capability degraded</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-500" />
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">OFFLINE</span>
                            <span>- Server unreachable</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH & FILTER CARD */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Search Servers</h2>
                    <button
                        onClick={() => navigate('/server/add')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        <Plus className="h-5 w-5" />
                        Add Server
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, location or IP..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

            {/* SERVER LIST TABLE */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 overflow-hidden">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Server Instances</h2>
                <Table
                    title=""
                    columns={columns}
                    data={servers}
                    actions={() => (
                        <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><RefreshCw className="h-4 w-4" /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                    )}
                />
                {servers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ServerIcon className="h-8 w-8 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Servers Found</h3>
                        <p className="text-gray-500 text-sm mt-1">Get started by adding a new server instance.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Server;
