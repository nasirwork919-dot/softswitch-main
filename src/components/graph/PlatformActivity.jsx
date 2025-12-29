import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const data = {
  daily: [
    { name: 'Mon', value: 400, growth: 12 },
    { name: 'Tue', value: 300, growth: -5 },
    { name: 'Wed', value: 500, growth: 18 },
    { name: 'Thu', value: 150, growth: 2 },
    { name: 'Fri', value: 450, growth: 25 },
    { name: 'Sat', value: 600, growth: 30 },
    { name: 'Sun', value: 550, growth: 15 },
  ],
  weekly: [
    { name: 'Week 1', value: 2800 },
    { name: 'Week 2', value: 2100 },
    { name: 'Week 3', value: 3500 },
    { name: 'Week 4', value: 1050 },
  ],
  monthly: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 9000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 13500 },
    { name: 'Jun', value: 18000 },
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-xl">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-extrabold text-blue-600 font-sans">
          {payload[0].value.toLocaleString()}
          <span className="text-[10px] text-gray-400 ml-1 font-medium">interactions</span>
        </p>
      </div>
    );
  }
  return null;
};

const PlatformActivity = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const currentData = data[activeTab];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Engagement</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Real-time tracking of user interactions</p>
        </div>

        <Tabs
          selectedIndex={['daily', 'weekly', 'monthly'].indexOf(activeTab)}
          onSelect={(index) => setActiveTab(['daily', 'weekly', 'monthly'][index])}
          className="bg-gray-50 p-1 rounded-xl border border-gray-100"
        >
          <TabList className="flex gap-1 outline-none">
            {['Daily', 'Weekly', 'Monthly'].map((item) => (
              <Tab
                key={item}
                className="
                            px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all outline-none
                            text-gray-500 hover:text-blue-600
                            [&:selected]:bg-white [&:selected]:text-blue-600 [&:selected]:shadow-sm
                        "
              >
                {item}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
        {[
          { label: 'Avg. Engagement', value: '84.2%', color: 'text-blue-600' },
          { label: 'Retention Rate', value: '62.1%', color: 'text-indigo-600' },
          { label: 'Session Time', value: '4m 32s', color: 'text-sky-600' },
          { label: 'Conversion', value: '12.4%', color: 'text-blue-700' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-lg font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformActivity;
