import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import { Server, Zap } from 'lucide-react';

const AddServer = () => {
    return (
        <ModulePage
            title="Deploy New Server"
            description="Configure and install a new VPS instance."
            icon={Server}
        >
            <div className="max-w-3xl mx-auto p-6 sm:p-10">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">Server Configuration</h3>
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Zap className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Server Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. US-East-Primary"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Host / IP Address</label>
                                <input
                                    type="text"
                                    placeholder="192.168.x.x"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Root Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Protocol Type</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700 appearance-none">
                                    <option>DEFAULT V1</option>
                                    <option>V2</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Server Service</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700 appearance-none">
                                    <option>OPENVPN (HTTP)</option>
                                    <option>SSH / DIRECT</option>
                                    <option>UDP HYSTERIA</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.01] transition-all active:scale-95">
                                Install Server
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModulePage>
    );
};

export default AddServer;
