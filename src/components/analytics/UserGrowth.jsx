import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const UserGrowth = () => {
  const [timeframe, setTimeframe] = useState('Daily');
  const [dropdown, setDropdown] = useState('Weekly');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const data = {
    Daily: {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      values: [1, 2.5, 4.5, 7, 4.8, 7.5, 7, 8.2]
    },
    Weekly: {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      values: [1, 2.5, 4.5, 7, 4.8, 7.5, 7, 8.2]
    },
    Monthly: {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      values: [1, 3, 5, 7.5, 5.5, 8]
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(20, 184, 166, 0.4)');
      gradient.addColorStop(1, 'rgba(20, 184, 166, 0.01)');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data[timeframe].labels,
          datasets: [{
            data: data[timeframe].values,
            borderColor: '#14b8a6',
            backgroundColor: gradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#14b8a6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#14b8a6',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              backgroundColor: '#14b8a6',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              padding: 8,
              displayColors: false,
              callbacks: {
                title: () => '',
                label: (context) => `${context.parsed.y}K`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: true,
                color: '#f1f5f9',
                drawBorder: false
              },
              ticks: {
                color: '#94a3b8',
                font: {
                  size: 11,
                  weight: '400'
                }
              },
              border: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              max: 10,
              grid: {
                display: true,
                color: '#f1f5f9',
                drawBorder: false
              },
              ticks: {
                stepSize: 2,
                color: '#94a3b8',
                font: {
                  size: 11,
                  weight: '400'
                }
              },
              border: {
                display: false
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timeframe]);

  return (
    <div className=" pt-5">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex-1"></div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={dropdown}
                onChange={(e) => setDropdown(e.target.value)}
                className="appearance-none w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
            <div className="inline-flex bg-gray-50 rounded-lg p-1 gap-1">
              {['Daily', 'Weekly', 'Monthly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    timeframe === period
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-80 lg:h-96">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;