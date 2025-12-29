import React from 'react';
import { ChevronRight, Filter, Download, Plus } from 'lucide-react';

const ModulePage = ({ title, description, icon: Icon, stats = [], children }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[var(--color-card-background)] rounded-3xl shadow-sm border border-[var(--color-border)]">
                        <Icon className="h-8 w-8 text-[var(--color-primary)]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest">
                            Super Admin Panel <ChevronRight className="h-3 w-3" /> {title}
                        </div>
                        <h1 className="text-3xl font-black text-[var(--color-text)] tracking-tight mt-1">{title}</h1>
                        <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-1">{description}</p>
                    </div>
                </div>


            </div>

            {/* Quick Stats */}
            {stats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[var(--color-card-background)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-[var(--color-text)] mt-1">{stat.value}</h3>
                            <div className={`text-[10px] font-bold mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-[var(--color-primary)]'}`}>
                                {stat.trend === 'up' ? '↑' : '↓'} {stat.change} vs last period
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Content Area */}
            <div className="bg-[var(--color-card-background)] rounded-[2rem] border border-[var(--color-border)] shadow-sm overflow-hidden min-h-[400px]">
                {children}
            </div>
        </div>
    );
};

export default ModulePage;