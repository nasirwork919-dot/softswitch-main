import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import { UserPlus, ArrowRightLeft } from 'lucide-react';

const AddReseller = () => {
    return (
        <ModulePage
            title="Manage Reseller"
            description="Create new reseller accounts or transfer credits."
            icon={UserPlus}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">

                {/* CREATE RESELLER */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-8 h-1 bg-blue-600 rounded-full" />
                        <h3 className="text-lg font-bold text-gray-900">Create Reseller</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Username</label>
                            <input
                                type="text"
                                placeholder=""
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                            <input
                                type="password"
                                placeholder=""
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Credits</label>
                            <input
                                type="number"
                                defaultValue="0"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>

                        <div className="pt-4">
                            <button className="w-full py-3 bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all active:scale-95">
                                Create
                            </button>
                        </div>
                    </div>
                </div>

                {/* TRANSFER CREDIT */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-8 h-1 bg-blue-600 rounded-full" />
                        <h3 className="text-lg font-bold text-gray-900">Transfer Credit</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Credits</label>
                            <input
                                type="number"
                                defaultValue="0"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
                            />
                        </div>

                        <div className="flex items-center gap-3 py-2">
                            <input type="checkbox" id="auth" className="w-5 h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500" />
                            <label htmlFor="auth" className="text-sm font-medium text-gray-500 select-none cursor-pointer">I authorized this transfer</label>
                        </div>

                        <div className="pt-2">
                            <button className="w-full py-3 bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                <ArrowRightLeft className="h-4 w-4" />
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </ModulePage>
    );
};

export default AddReseller;
