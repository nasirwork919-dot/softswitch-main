import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import { UserPlus, RefreshCw, Zap } from 'lucide-react';

const AddUser = () => {
    return (
        <ModulePage
            title="Create New User"
            description="Add a single user or generate bulk users instantly."
            icon={UserPlus}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">

                {/* CREATE USER [SINGLE] */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-8 h-1 bg-blue-600 rounded-full" />
                        <h3 className="text-lg font-bold text-gray-900">Create User [Single]</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Username</label>
                            <input
                                type="text"
                                defaultValue="53293"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                            <input
                                type="text"
                                defaultValue="45246"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Subscription</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700 appearance-none">
                                <option>Normal (1 Month)</option>
                                <option>Premium (3 Months)</option>
                                <option>VIP (12 Months)</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button className="px-8 py-3 bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all active:scale-95">
                                Create
                            </button>
                            <button className="px-6 py-3 bg-sky-400 text-white font-bold rounded-xl hover:bg-sky-500 transition-all active:scale-95 flex items-center gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Regenerate
                            </button>
                        </div>
                    </div>
                </div>

                {/* CREATE USER [BULK] */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-8 h-1 bg-blue-600 rounded-full" />
                        <h3 className="text-lg font-bold text-gray-900">Create User [Bulk]</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Credit Balance</label>
                            <input
                                type="text"
                                defaultValue="99999"
                                disabled
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Prefix</label>
                            <input
                                type="text"
                                defaultValue="p0h1"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Amount</label>
                            <input
                                type="number"
                                defaultValue="0"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button className="px-8 py-3 bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all active:scale-95 flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Generate
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </ModulePage>
    );
};

export default AddUser;
