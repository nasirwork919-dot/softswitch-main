import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reminders = () => {
  // Medication Reminders Pie Chart Data
  const medicationData = {
    labels: ["Completed Reminders", "Missed Reminders", "Total Reminders Created"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#5BB5B0", "#2D9C9E", "#1A6B6D"],
        borderWidth: 0,
        cutout: "0%",
      },
    ],
  };

  const medicationOptions = {
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
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  // Custom plugin to draw percentage labels on pie slices
  const pieLabelsPlugin = {
    id: "pieLabels",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);
      const data = chart.data.datasets[0].data;

      meta.data.forEach((element, index) => {
        const { x, y } = element.tooltipPosition();
        const percentage = data[index];

        // Calculate position for label (move slightly outward from center)
        const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        const centerY = chart.chartArea.top + chart.chartArea.height / 2;

        // Calculate angle for positioning
        const startAngle = element.startAngle;
        const endAngle = element.endAngle;
        const midAngle = (startAngle + endAngle) / 2;

        // Position labels at 60% of the radius
        const radius = element.outerRadius * 0.65;
        const labelX = centerX + Math.cos(midAngle) * radius;
        const labelY = centerY + Math.sin(midAngle) * radius;

        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${percentage}%`, labelX, labelY);
        ctx.restore();
      });
    },
  };

  // Health Habit Check-ins Data
  const healthHabits = [
    {
      id: 1,
      title: "Water Intake",
      logs: "7,800",
      change: "+12%",
      isPositive: true,
      sparklineData: [4, 6, 5, 8, 7, 9, 8, 10, 9, 11],
    },
    {
      id: 2,
      title: "Sleep Logs",
      logs: "6,400",
      change: "-5%",
      isPositive: false,
      sparklineData: [8, 7, 6, 5, 6, 4, 5, 4, 5, 4],
    },
    {
      id: 3,
      title: "Exercise Logs",
      logs: "4,040",
      change: "+8%",
      isPositive: true,
      sparklineData: [3, 4, 5, 4, 6, 5, 7, 6, 8, 7],
    },
  ];

  // Sparkline Component
  const Sparkline = ({ data, isPositive }) => {
    const width = 80;
    const height = 32;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * (height - 8) - 4;
        return `${x},${y}`;
      })
      .join(" ");

    const color = isPositive ? "#10B981" : "#EF4444";
    const bgColor = isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";

    // Create area path
    const areaPath = `M0,${height} L${points
      .split(" ")
      .map((p) => p)
      .join(" L")} L${width},${height} Z`;

    return (
      <svg width={width} height={height} className="overflow-visible">
        {/* Area fill */}
        <path d={areaPath} fill={bgColor} />
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dashed baseline */}
        <line
          x1="0"
          y1={height - 4}
          x2={width}
          y2={height - 4}
          stroke="#E5E7EB"
          strokeWidth="1"
          strokeDasharray="4 2"
        />
      </svg>
    );
  };

  // Legend items for pie chart
  const legendItems = [
    { label: "Completed Reminders", color: "#5BB5B0" },
    { label: "Missed Reminders", color: "#2D9C9E" },
    { label: "Total Reminders Created", color: "#1A6B6D" },
  ];

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Medication Reminders Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Medication Reminders
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative">
              <Doughnut
                data={medicationData}
                options={medicationOptions}
                plugins={[pieLabelsPlugin]}
              />
            </div>
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Habit Check-ins */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
            Health Habit Check-ins
          </h3>
          <p className="text-sm text-gray-500 mb-4 sm:mb-6">
            Total Check-ins: <span className="font-medium text-gray-700">18,240</span>
          </p>

          <div className="space-y-4 sm:space-y-5">
            {healthHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    {habit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Total Logs: {habit.logs}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  {/* Sparkline */}
                  <div className="hidden xs:block sm:block">
                    <Sparkline data={habit.sparklineData} isPositive={habit.isPositive} />
                  </div>

                  {/* Change indicator */}
                  <div className="flex items-center gap-1 min-w-[60px] justify-end">
                    <span
                      className={`text-sm sm:text-base font-semibold ${
                        habit.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {habit.change}
                    </span>
                    <svg
                      className={`w-4 h-4 ${
                        habit.isPositive ? "text-green-500" : "text-red-500 rotate-180"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
