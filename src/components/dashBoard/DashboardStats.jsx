import React from 'react';
import { Users, FileText, Calendar, ShoppingBag, Heart, UserCheck, Clipboard, CheckCircle } from 'lucide-react';

const statsData = [
  {
    title: "Total Users",
    value: "24,582",
    change: "+12.5%",
    description: "vs last month",
    icon: <Users className="h-5 w-5 text-blue-600" />,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "hover:border-blue-200"
  },
  {
    title: "Communities",
    value: "1,847",
    change: "+8.2%",
    description: "vs last month",
    icon: <Users className="h-5 w-5 text-indigo-600" />,
    gradient: "from-indigo-50 to-violet-50",
    borderColor: "hover:border-indigo-200"
  },
  {
    title: "Daily Posts",
    value: "89,421",
    change: "+15.7%",
    description: "vs last month",
    icon: <FileText className="h-5 w-5 text-sky-600" />,
    gradient: "from-sky-50 to-blue-50",
    borderColor: "hover:border-sky-200"
  },
  {
    title: "Marketplace",
    value: "12,894",
    change: "+18.9%",
    description: "vs last month",
    icon: <ShoppingBag className="h-5 w-5 text-blue-700" />,
    gradient: "from-blue-50 to-slate-50",
    borderColor: "hover:border-blue-300"
  }
];

const actionData = [
  {
    title: "Identity Verifications",
    value: "28",
    description: "Users waiting for review",
    buttonText: "Verify Now",
    icon: <UserCheck className="h-6 w-6" />,
    color: "bg-blue-600",
  },
  {
    title: "Ad Approvals",
    value: "15",
    description: "Listings needing moderation",
    buttonText: "Review Ads",
    icon: <Clipboard className="h-6 w-6" />,
    color: "bg-indigo-600",
  },
  {
    title: "Flagged Content",
    value: "9",
    description: "Reports needing attention",
    buttonText: "Moderate",
    icon: <CheckCircle className="h-6 w-6" />,
    color: "bg-slate-800",
  },
];

const DashboardStats = () => {
  return (
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className={`
                group relative bg-white p-6 rounded-[2rem] border border-gray-100 
                shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                ${item.borderColor}
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] -z-10`} />

            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors">
                {item.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {item.change}
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-400">{item.title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{item.value}</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {actionData.map((item, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-[2rem] overflow-hidden group shadow-lg ${item.color} text-white`}
          >
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold leading-tight">{item.title}</h4>
                  <p className="text-xs text-white/60 font-medium">{item.description}</p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4">
                <span className="text-4xl font-black">{item.value}</span>
                <button className="px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl text-sm shadow-xl hover:bg-blue-50 active:scale-95 transition-all">
                  {item.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
