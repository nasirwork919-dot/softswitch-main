import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import PaymentChart from './PaymentChart';
import Statistics from './Statistics';

Chart.register(...registerables);

const RevenueReports = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Stats data
  const stats = [
    {
      title: 'Total Revenue',
      amount: '₹2,310,000',
      change: '+12.5% vs last month',
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-sm sm:text-base">Rs</span>
        </div>
      ),
    },
    {
      title: 'Platform Earnings',
      amount: '₹231,000',
      change: '+8.2% vs last month',
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Marketplace Revenue',
      amount: '₹1,150,000',
      change: '+15.3% vs last month',
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Services Revenue',
      amount: '₹780,000',
      change: '+6.7% vs last month',
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Ads Revenue',
      amount: '₹380,000',
      change: '+22.1% vs last month',
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xs sm:text-sm">Ad</span>
        </div>
      ),
    },
  ];

  // Top paying users data
  const topPayingUsers = [
    { name: 'John Smith', amount: '₹45,000', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sarah Wilson', amount: '₹38,500', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Mike Johnson', amount: '₹32,200', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Emma Davis', amount: '₹28,900', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
  ];

  // Chart data
  const chartData = {
    labels: ['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7'],
    values: [76, 82, 78, 94, 88, 102, 98],
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.values,
              borderColor: '#3b82f6',
              backgroundColor: 'transparent',
              borderWidth: 2.5,
              fill: false,
              tension: 0.3,
              pointRadius: 4,
              pointBackgroundColor: '#3b82f6',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: '#3b82f6',
              pointHoverBorderColor: '#ffffff',
              pointHoverBorderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: '#3b82f6',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              padding: 10,
              displayColors: false,
              callbacks: {
                title: () => '',
                label: (context) => `₹${context.parsed.y}k`,
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 12,
                  weight: '400',
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              beginAtZero: false,
              min: 70,
              max: 105,
              grid: {
                display: true,
                color: '#f3f4f6',
                drawBorder: false,
              },
              ticks: {
                stepSize: 5,
                color: '#9ca3af',
                font: {
                  size: 12,
                  weight: '400',
                },
                callback: (value) => `${value}k`,
              },
              border: {
                display: false,
              },
            },
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs sm:text-sm text-gray-500">{stat.title}</span>
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {stat.amount}
            </div>
            <div className="text-xs sm:text-sm text-green-500 font-medium">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart and Top Paying Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Daily Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Daily Revenue Trend
          </h2>
          <div className="h-56 sm:h-64 lg:h-72">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Top Paying Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Top Paying Users
          </h2>
          <div className="space-y-4">
            {topPayingUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">{user.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PaymentChart/>
      <Statistics/>
    </div>
  );
};

export default RevenueReports;
