import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import { Network, Activity, Globe, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDNS = () => {
    const navigate = useNavigate();

    return (
        <ModulePage
            title="Create DNS Record"
            description="Add new hostnames or manage existing DNS configurations."
            icon={Network}
        >
            <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">

                {/* CREATE DNS FORM */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">New A-Record</h3>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hostname</label>
                                <input
                                    type="text"
                                    placeholder="e.g. vpn.mysite.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition-all text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">IP Address</label>
                                <input
                                    type="text"
                                    placeholder="X.X.X.X"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition-all text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-200 hover:bg-cyan-700 transition-all active:scale-95">
                                Create Record
                            </button>
                            <button
                                onClick={() => navigate('/dns')}
                                className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* UTILITIES / OPTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                            <Activity className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">HTTP Check</h4>
                        <p className="text-xs text-gray-500">Verify server connectivity</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                            <Globe className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">DNS to IP</h4>
                        <p className="text-xs text-gray-500">Resolve hostname to IP</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Fix Records</h4>
                        <p className="text-xs text-gray-500">Auto-repair common issues</p>
                    </div>
                </div>

            </div>
        </ModulePage>
    );
};

export default AddDNS;
