import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Tracking = () => {
  const [pregnancyPeriod, setPregnancyPeriod] = useState("Monthly");
  const [cyclePeriod, setCyclePeriod] = useState("Daily");

  // Pregnancy Tracking Trend Data
  const pregnancyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Pregnancy Tracking",
        data: [9, 7.5, 10, 12, 11, 11],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(45, 156, 158, 0.15)");
          gradient.addColorStop(1, "rgba(45, 156, 158, 0.02)");
          return gradient;
        },
        borderColor: "#2D9C9E",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#2D9C9E",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const pregnancyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#2D9C9E",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 0,
        max: 12,
        ticks: {
          stepSize: 2,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  // Cycle Tracking Engagement Data
  const cycleData = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Background",
        data: [12, 12, 12, 12, 12, 12, 12],
        backgroundColor: "rgba(229, 231, 235, 0.5)",
        borderRadius: 20,
        borderSkipped: false,
        barThickness: 24,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
      },
      {
        label: "Engagement",
        data: [6, 8, 4, 7, 5, 10, 7],
        backgroundColor: "#2D9C9E",
        borderRadius: 20,
        borderSkipped: false,
        barThickness: 24,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
      },
    ],
  };

  const cycleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#2D9C9E",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        filter: (tooltipItem) => tooltipItem.datasetIndex === 1,
        callbacks: {
          label: (context) => `${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: false,
        min: 0,
        max: 12,
        ticks: {
          stepSize: 2,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Custom Bar Chart Plugin to overlay bars
  const overlayPlugin = {
    id: "overlayBars",
    beforeDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const meta0 = chart.getDatasetMeta(0);
      const meta1 = chart.getDatasetMeta(1);

      meta0.data.forEach((bar, index) => {
        const engagementBar = meta1.data[index];
        if (engagementBar) {
          // Draw background bar
          ctx.save();
          ctx.fillStyle = "rgba(229, 231, 235, 0.5)";
          ctx.beginPath();
          ctx.roundRect(bar.x - bar.width / 2, bar.y, bar.width, chart.chartArea.bottom - bar.y, 20);
          ctx.fill();
          ctx.restore();
        }
      });
    },
  };

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Pregnancy Tracking Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Pregnancy Tracking Trend
            </h3>
            <div className="relative">
              <select
                value={pregnancyPeriod}
                onChange={(e) => setPregnancyPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 pr-8 text-xs sm:text-sm text-gray-600 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <svg
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="h-48 sm:h-56 md:h-64">
            <Line data={pregnancyData} options={pregnancyOptions} />
          </div>
        </div>

        {/* Cycle Tracking Engagement */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Cycle Tracking Engagement
            </h3>
            <div className="relative">
              <select
                value={cyclePeriod}
                onChange={(e) => setCyclePeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 pr-8 text-xs sm:text-sm text-gray-600 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <svg
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="h-48 sm:h-56 md:h-64">
            <CycleBarChart data={cycleData} options={cycleOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Cycle Bar Chart Component with overlapping bars
const CycleBarChart = ({ data, options }) => {
  const cycleChartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Engagement",
        data: data.datasets[1].data,
        backgroundColor: "#2D9C9E",
        borderRadius: 20,
        borderSkipped: false,
        barThickness: undefined,
        maxBarThickness: 32,
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    ],
  };

  const cycleChartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        display: false,
      },
    },
  };

  // Custom plugin to draw background bars
  const backgroundBarPlugin = {
    id: "backgroundBar",
    beforeDatasetsDraw: (chart) => {
      const {
        ctx,
        chartArea: { top, bottom },
        scales: { x },
      } = chart;
      const meta = chart.getDatasetMeta(0);

      meta.data.forEach((bar) => {
        const barWidth = bar.width;
        const barX = bar.x;
        const radius = 20;
        const height = bottom - top - 20;
        const y = top + 10;

        ctx.save();
        ctx.fillStyle = "rgba(229, 231, 235, 0.6)";
        ctx.beginPath();
        ctx.roundRect(barX - barWidth / 2, y, barWidth, height, radius);
        ctx.fill();
        ctx.restore();
      });
    },
  };

  return (
    <Bar
      data={cycleChartData}
      options={cycleChartOptions}
      plugins={[backgroundBarPlugin]}
    />
  );
};

export default Tracking;
