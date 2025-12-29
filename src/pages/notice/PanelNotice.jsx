import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Plus, Activity } from 'lucide-react';
import Table from '../../components/common/Table';

const PanelNotice = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const columns = [
        { header: "Title", accessor: "title" },
        {
            header: "Type",
            accessor: "type",
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${row.type === 'Alert' ? 'bg-red-100 text-red-700' :
                        row.type === 'Warning' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {row.type}
                </span>
            )
        },
        { header: "Date", accessor: "date" },
    ];
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* HERO SECTION - MATCHING SERVER STYLE */}
            <div className="rounded-[2rem] mt-8 bg-gradient-to-br from-indigo-800 via-purple-700 to-indigo-900 px-6 sm:px-10 lg:px-12 py-8 sm:py-12 flex items-center min-h-[160px] sm:min-h-[200px] shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl" />
                <div className="text-left text-white max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        Communication
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Panel Notifications</h1>
                    <p className="text-sm sm:text-base text-purple-100/90 font-medium max-w-lg leading-relaxed">
                        Broadcast important updates, maintenance alerts, and news to all panel users.
                    </p>
                </div>
            </div>

            {/* STATUS LEGEND - MATCHING SERVER STYLE */}
            <div className="mt-8 mb-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Notice Types:</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">ALERT</span>
                            <span>- Critical issues/Downtime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">WARNING</span>
                            <span>- Scheduled maintenance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">INFO</span>
                            <span>- General updates</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH & FILTER CARD */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Notification History</h2>
                    <button
                        onClick={() => navigate('/panel-notice/add')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        <Plus className="h-5 w-5" />
                        New Notification
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search titles..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 overflow-hidden">
                <Table
                    title=""
                    columns={columns}
                    data={[]}
                    actions={() => { }}
                />
                <div className="text-center py-12 text-gray-400 text-sm italic">
                    No notifications published.
                </div>
            </div>
        </div>
    );
};
export default PanelNotice;
