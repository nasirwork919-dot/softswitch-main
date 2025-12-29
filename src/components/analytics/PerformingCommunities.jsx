import React from 'react';
import { Award, ChevronRight, TrendingUp } from 'lucide-react';
import top from '../../assets/top.png';
import second from '../../assets/second.png';
import third from '../../assets/third.png';
const PerformingCommunities = () => {
  const communities = [
    {
      id: 1,
      rank: 1,
      icon: top,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      community: 'DHA Phase 4',
      user: '2,130',
      engagement: '92',
      growth: '+14%'
    },
    {
      id: 2,
      rank: 2,
      icon: second,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      community: 'DHA Phase 4',
      user: '2,130',
      engagement: '92',
      growth: '+14%'
    },
    {
      id: 3,
      rank: 3,
      icon: third,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      community: 'DHA Phase 4',
      user: '2,130',
      engagement: '92',
      growth: '+14%'
    }
  ];

  return (
    <div className=" pt-3 ">
      <div className="w-full ">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          
          {/* Header Section */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              Top 10 Performing Communities
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Track ad performance through analytics including views, clicks, and conversion rates.
            </p>
          </div>

          {/* Table Header - Hidden on mobile */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 border-b border-gray-100">
            <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </div>
            <div className="col-span-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Community
            </div>
            <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Engagement Score
            </div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              Growth %
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {communities.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 lg:px-8 lg:py-5 hover:bg-gray-50 transition-colors"
              >
                {/* Desktop Layout */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
                  {/* Rank with Icon */}
                  <div className="col-span-1 flex items-center justify-start">
                    <img src={item.icon} alt="" />
                  </div>

                  {/* Community Name */}
                  <div className="col-span-4">
                    <span className="text-sm font-medium text-gray-900">
                      {item.community}
                    </span>
                  </div>

                  {/* User Count */}
                  <div className="col-span-3">
                    <span className="text-sm text-gray-700">
                      {item.user}
                    </span>
                  </div>

                  {/* Engagement Score */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-700">
                      {item.engagement}
                    </span>
                  </div>

                  {/* Growth Percentage */}
                  <div className="col-span-2 flex justify-end">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {item.growth}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 flex-shrink-0 rounded-xl ${item.bgColor} flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {item.community}
                        </h3>
                        <div className="flex items-center gap-1 text-green-600 flex-shrink-0">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">
                            {item.growth}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-gray-500 block mb-1">User</span>
                          <span className="text-gray-900 font-medium">{item.user}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block mb-1">Engagement</span>
                          <span className="text-gray-900 font-medium">{item.engagement}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer - Optional */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-gray-50">
            <button className="text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors flex items-center gap-1 ">
              View All Communities <ChevronRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformingCommunities;