import React from "react";
import { Users, User, Calendar, MessageSquare } from "lucide-react";

// Card Data
const stats = [
  {
    title: "Total Communities",
    value: "248",
    change: "+12%",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Members",
    value: "45,892",
    change: "+8%",
    icon: User,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Active Events",
    value: "1,284",
    change: "+24%",
    icon: Calendar,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Total Posts",
    value: "8,456",
    change: "+18%",
    icon: MessageSquare,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function CommunitieStatus() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex  justify-between p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
          {/* Left Section */}
          <div className="flex gap-4 flex-col">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
              <item.icon className={`w-6 h-6 ${item.iconColor}`} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">{item.value}</h3>
              <p className="text-gray-500 text-sm">{item.title}</p>
            </div>
          </div>

          {/* Right Section (Change) */}
          <div className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded-md h-max">
            {item.change}
          </div>
        </div>
      ))}
    </div>
  );
}
