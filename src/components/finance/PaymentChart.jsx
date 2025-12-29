import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PaymentChart = () => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  // Payment method data
  const paymentMethodData = {
    labels: ['Credit Card', 'UPI', 'Net Banking', 'Wallet', 'Cash'],
    values: [45, 5, 10, 15, 25],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  };

  // Category revenue data
  const categoryRevenueData = {
    labels: ['Marketplace', 'Service', 'Ads', 'Subscription'],
    values: [1500, 3200, 2800, 2400],
  };

  useEffect(() => {
    // Pie Chart
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext('2d');

      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      pieChartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: paymentMethodData.labels,
          datasets: [
            {
              data: paymentMethodData.values,
              backgroundColor: paymentMethodData.colors,
              borderWidth: 0,
              hoverOffset: 4,
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
              backgroundColor: '#1f2937',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}%`,
              },
            },
          },
        },
      });
    }

    // Bar Chart
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');

      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, '#c084fc');
      gradient.addColorStop(1, '#a855f7');

      barChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categoryRevenueData.labels,
          datasets: [
            {
              data: categoryRevenueData.values,
              backgroundColor: gradient,
              borderRadius: 8,
              borderSkipped: false,
              barThickness: 40,
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
                title: () => '',
                label: (context) => `₹${context.parsed.y.toLocaleString()}`,
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
              max: 4000,
              grid: {
                display: true,
                color: '#f3f4f6',
                drawBorder: false,
              },
              ticks: {
                stepSize: 1000,
                color: '#9ca3af',
                font: {
                  size: 12,
                  weight: '400',
                },
                callback: (value) => {
                  if (value === 0) return '0';
                  return `${value / 1000}k`;
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
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, []);

  // Legend items for pie chart
  const legendItems = [
    { label: 'Credit Card', color: '#3b82f6' },
    { label: 'UPI', color: '#10b981' },
    { label: 'Net Banking', color: '#f59e0b' },
    { label: 'Wallet', color: '#ef4444' },
    { label: 'Cash', color: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
      {/* Payment Method Breakdown - Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Payment Method Breakdown
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Pie Chart */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <canvas ref={pieChartRef}></canvas>
            {/* Percentage labels on chart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* These would ideally be positioned dynamically, but for static display: */}
            </div>
          </div>
          {/* Legend */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category-wise Revenue - Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Category-wise Revenue
        </h2>
        <div className="h-48 sm:h-56 lg:h-64">
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default PaymentChart;
