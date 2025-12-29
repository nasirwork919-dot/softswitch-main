import React from "react";
import { MoreHorizontal, ExternalLink, ShieldAlert } from "lucide-react";

const communities = [
  { name: "Tech Community", members: "8,542", posts: "1,247", score: "9.8", trend: "up" },
  { name: "Fitness Enthusiasts", members: "6,231", posts: "892", score: "9.5", trend: "up" },
  { name: "Food Lovers", members: "5,847", posts: "743", score: "9.2", trend: "down" },
  { name: "Design Circle", members: "4,926", posts: "621", score: "8.9", trend: "up" },
];

const reports = [
  {
    type: "Post",
    id: "RPT-8472",
    title: "Inappropriate Content",
    reporter: "Sarah Johnson",
    status: "Pending",
    priority: "High"
  },
  {
    type: "User",
    id: "RPT-8471",
    title: "Harassment Report",
    reporter: "Mike Chen",
    status: "Review",
    priority: "Critical"
  },
  {
    type: "Community",
    id: "RPT-8470",
    title: "Spam Activity",
    reporter: "Emily Davis",
    status: "Pending",
    priority: "Medium"
  }
];

const RecentActivity = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pb-12">
      {/* TOP COMMUNITIES */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Active Communities</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Engagement Leaders</p>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {communities.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-3xl hover:bg-blue-50 group transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-100 rounded-2xl flex items-center justify-center text-lg font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{item.members} members • {item.posts} posts</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-blue-600 tracking-tight">{item.score}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Score</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-100 text-gray-400 text-xs font-bold rounded-2xl hover:border-blue-200 hover:text-blue-500 transition-all">
          View All Communities
        </button>
      </div>

      {/* RECENT REPORTS */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Critical Reports</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Moderation Queue</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase">
            <ShieldAlert className="h-3 w-3" />
            Action Required
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-[2rem] border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-300 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tight ${report.type === "Post" ? "bg-blue-100 text-blue-600" : "bg-indigo-100 text-indigo-600"
                    }`}>
                    {report.type}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">{report.id}</span>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${report.priority === "Critical" ? "bg-red-500 text-white" : "bg-orange-100 text-orange-600"
                  }`}>
                  {report.priority}
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">{report.title}</h4>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400 font-medium">By: {report.reporter}</p>
                <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold group-hover:underline">
                  Review <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
