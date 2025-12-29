import React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const Table = ({ columns, data, onSearch, title, actions }) => {
    return (
        <div className="w-full">
            {/* Table Header / Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all w-full md:w-64"
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="group hover:bg-blue-50/30 transition-colors">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 text-sm font-medium text-gray-600">
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {actions(row)}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{col.header}</span>
                                <span className="text-sm font-bold text-gray-800 text-right">
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </span>
                            </div>
                        ))}
                        {actions && (
                            <div className="pt-3 border-t border-gray-50 flex justify-end gap-3">
                                {actions(row)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination (Static Placeholder for now) */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Showing 1-10 of {data.length}</span>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50">
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-200">
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
