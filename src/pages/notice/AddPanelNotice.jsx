import React from 'react';
import ModulePage from '../../components/common/ModulePage';
import { Bell, Bold, Italic, Underline } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddPanelNotice = () => {
    const navigate = useNavigate();

    return (
        <ModulePage
            title="Compose Notification"
            description="Write and publish a new announcement."
            icon={Bell}
        >
            <div className="max-w-4xl mx-auto p-6 sm:p-10">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">Notice Details</h3>
                    </div>

                    <div className="p-8 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Title</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Type</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all appearance-none">
                                <option>Info</option>
                                <option>Warning</option>
                                <option>Alert</option>
                                <option>Maintenance</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Content</label>
                            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-rose-100 focus-within:border-rose-400 transition-all">
                                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex gap-4 text-gray-600">
                                    <Bold className="h-4 w-4 cursor-pointer hover:text-black" />
                                    <Italic className="h-4 w-4 cursor-pointer hover:text-black" />
                                    <Underline className="h-4 w-4 cursor-pointer hover:text-black" />
                                </div>
                                <textarea rows="8" className="w-full p-4 text-sm focus:outline-none resize-y" placeholder="Type your message here..."></textarea>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button className="px-8 py-3 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95">
                                Publish Now
                            </button>
                            <button
                                onClick={() => navigate('/panel-notice')}
                                className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModulePage>
    );
};

export default AddPanelNotice;
