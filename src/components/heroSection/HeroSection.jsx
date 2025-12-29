import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-indigo-800 p-8 sm:p-12 shadow-2xl shadow-blue-200/50 group">
            {/* Animated backdrop elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl transition-transform group-hover:scale-110 duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-100"></span>
                        </span>
                        System Online
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                        Welcome back, <span className="text-blue-200">John!</span>
                    </h1>
                    <p className="text-blue-100/80 text-sm sm:text-base mt-4 font-medium max-w-lg leading-relaxed">
                        Here's what's happening on the platform today. Monitor user growth, manage community activities, and track performance in real-time.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <button className="px-6 py-2.5 bg-white text-[var(--color-primary)] font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-50 transition-all active:scale-95">
                            View Reports
                        </button>
                        <button className="px-6 py-2.5 bg-[var(--color-primary)]/30 backdrop-blur-md text-white border border-white/30 font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                            Manage Users
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block relative shrink-0">
                    <div className="absolute inset-0 bg-blue-400/30 blur-3xl rounded-full" />
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow- inner flex flex-col gap-4 w-64">
                        <div className="flex items-center justify-between">
                            <span className="text-white/60 text-xs font-bold uppercase">Quick Health</span>
                            <div className="h-2 w-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 w-[85%] rounded-full" />
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-400 w-[65%] rounded-full" />
                            </div>
                        </div>
                        <div className="mt-2 text-white/40 text-[10px] italic">
                            Platform scaling optimally
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;