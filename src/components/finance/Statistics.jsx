import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Statistics = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Chart data
  const chartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
    weekly: [80, 200, 450, 700, 900, 500],
    monthly: [90, 220, 480, 750, 950, 520],
  };

  // Revenue reports data
  const revenueReports = [
    {
      id: 'REV-3121',
      month: 'Dec 2025',
      totalRevenue: '₹2,310,000',
      marketplace: '₹1,150,000',
      services: '₹780,000',
      ads: '₹380,000',
    },
    {
      id: 'REV-3120',
      month: 'Nov 2025',
      totalRevenue: '₹2,080,000',
      marketplace: '₹1,020,000',
      services: '₹760,000',
      ads: '₹300,000',
    },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Monthly',
              data: chartData.monthly,
              backgroundColor: '#a855f7',
              borderRadius: {
                topLeft: 6,
                topRight: 6,
                bottomLeft: 0,
                bottomRight: 0,
              },
              borderSkipped: false,
              barPercentage: 0.5,
              categoryPercentage: 0.8,
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
              backgroundColor: '#8b5cf6',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              padding: 10,
              displayColors: false,
              callbacks: {
                label: (context) => `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}k`,
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: '500',
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              max: 1200,
              grid: {
                display: true,
                color: '#f3f4f6',
                drawBorder: false,
              },
              ticks: {
                stepSize: 200,
                color: '#9ca3af',
                font: {
                  size: 12,
                  weight: '400',
                },
                callback: (value) => {
                  if (value === 0) return '0';
                  if (value >= 1000) return `${value / 1000}M`;
                  return `${value}k`;
                },
              },
              border: {
                display: false,
              },
            },
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

  const filteredReports = revenueReports.filter(
    (report) =>
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
      {/* Statistics Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <div>
            <p className="text-sm text-teal-600 font-medium mb-1">Statistics</p>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Weekly & Monthly Revenue Comparison
            </h2>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs sm:text-sm text-gray-600">Monthly</span>
            </div>
          </div>
        </div>
        <div className="h-56 sm:h-64 lg:h-72">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Revenue Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Revenue Reports
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Report ID
                </th>
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Month
                </th>
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Total Revenue
                </th>
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Marketplace
                </th>
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Services
                </th>
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Ads
                </th>
                <th className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-500">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-2 text-xs sm:text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="py-4 px-2 text-xs sm:text-sm text-gray-600">
                    {report.month}
                  </td>
                  <td className="py-4 px-2 text-xs sm:text-sm font-semibold text-gray-900">
                    {report.totalRevenue}
                  </td>
                  <td className="py-4 px-2 text-xs sm:text-sm text-gray-600">
                    {report.marketplace}
                  </td>
                  <td className="py-4 px-2 text-xs sm:text-sm text-gray-600">
                    {report.services}
                  </td>
                  <td className="py-4 px-2 text-xs sm:text-sm text-gray-600">
                    {report.ads}
                  </td>
                  <td className="py-4 px-2">
                    <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-xs sm:text-sm font-medium transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
