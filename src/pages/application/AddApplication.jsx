import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import { AppWindow, Search, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddApplication = () => {
    const navigate = useNavigate();

    return (
        <ModulePage
            title="Upload Application"
            description="Publish a new version of your application."
            icon={AppWindow}
        >
            <div className="max-w-2xl mx-auto p-6 sm:p-10">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">App Details</h3>
                        <UploadCloud className="text-violet-500 h-6 w-6" />
                    </div>

                    <div className="p-8 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">App Title <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400 transition-all" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Version Code <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400 transition-all" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                            <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400 transition-all"></textarea>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Logo</label>
                                <label className="flex cursor-pointer group">
                                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 border-r-0 rounded-l-xl text-sm text-gray-500 flex-1 truncate group-hover:bg-gray-100 transition-colors">Choose Image...</div>
                                    <div className="px-6 bg-violet-600 text-white font-bold rounded-r-xl flex items-center justify-center group-hover:bg-violet-700 transition-colors">Browse</div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">APK File</label>
                                <label className="flex cursor-pointer group">
                                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 border-r-0 rounded-l-xl text-sm text-gray-500 flex-1 truncate group-hover:bg-gray-100 transition-colors">Choose APK...</div>
                                    <div className="px-6 bg-violet-600 text-white font-bold rounded-r-xl flex items-center justify-center group-hover:bg-violet-700 transition-colors">Browse</div>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <button className="flex-1 py-3 bg-violet-600 text-white font-bold rounded-xl shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95">
                                Upload & Publish
                            </button>
                            <button
                                onClick={() => navigate('/application')}
                                className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModulePage>
    );
};
export default AddApplication;
