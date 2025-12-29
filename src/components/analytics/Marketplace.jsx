import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Marketplace = () => {
  const barChartRef = useRef(null);
  const bubbleChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const bubbleChartInstance = useRef(null);

  useEffect(() => {
    // Bar Chart
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');

      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      // Create gradient for each bar
      const gradient1 = ctx.createLinearGradient(0, 0, 500, 0);
      gradient1.addColorStop(0, '#9ca3af');
      gradient1.addColorStop(0.3, '#14b8a6');
      gradient1.addColorStop(1, '#14b8a6');

      const gradient2 = ctx.createLinearGradient(0, 0, 400, 0);
      gradient2.addColorStop(0, '#9ca3af');
      gradient2.addColorStop(0.3, '#14b8a6');
      gradient2.addColorStop(1, '#14b8a6');

      const gradient3 = ctx.createLinearGradient(0, 0, 500, 0);
      gradient3.addColorStop(0, '#9ca3af');
      gradient3.addColorStop(0.3, '#14b8a6');
      gradient3.addColorStop(1, '#14b8a6');

      const gradient4 = ctx.createLinearGradient(0, 0, 550, 0);
      gradient4.addColorStop(0, '#9ca3af');
      gradient4.addColorStop(0.3, '#14b8a6');
      gradient4.addColorStop(1, '#14b8a6');

      const gradient5 = ctx.createLinearGradient(0, 0, 250, 0);
      gradient5.addColorStop(0, '#9ca3af');
      gradient5.addColorStop(0.3, '#14b8a6');
      gradient5.addColorStop(1, '#14b8a6');

      barChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Marketplace\nListings', 'Orders', 'Riders', 'Deliveries', 'Service\nBookings'],
          datasets: [{
            data: [5000, 4000, 5000, 5500, 2500],
            backgroundColor: [gradient1, gradient2, gradient3, gradient4, gradient5],
            borderRadius: 8,
            barThickness: 32,
            maxBarThickness: 40
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              backgroundColor: '#1f2937',
              padding: 10,
              displayColors: false,
              callbacks: {
                label: (context) => {
                  const value = context.parsed.x;
                  return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString();
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 6000,
              grid: {
                display: true,
                color: '#e5e7eb',
                drawBorder: false
              },
              ticks: {
                stepSize: 1000,
                color: '#9ca3af',
                font: {
                  size: 11
                },
                callback: function(value) {
                  return value;
                }
              },
              border: {
                display: false
              }
            },
            y: {
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 11
                },
                padding: 8,
                crossAlign: 'far'
              },
              border: {
                display: false
              }
            }
          },
          layout: {
            padding: {
              right: 30,
              left: 10
            }
          }
        },
        plugins: [{
          id: 'customLabels',
          afterDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const value = dataset.data[index];
                const label = value >= 1000 ? `${Math.round(value / 1000)}k` : value;

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 13px sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, bar.x - 10, bar.y);
              });
            });
          }
        }]
      });
    }

    // Bubble Chart
    if (bubbleChartRef.current) {
      const ctx = bubbleChartRef.current.getContext('2d');

      if (bubbleChartInstance.current) {
        bubbleChartInstance.current.destroy();
      }

      bubbleChartInstance.current = new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'Posts',
              data: [{ x: 50, y: 55, r: 70 }],
              backgroundColor: '#2d3748'
            },
            {
              label: 'Comments',
              data: [{ x: 80, y: 75, r: 50 }],
              backgroundColor: '#0d9488'
            },
            {
              label: 'Events Participation',
              data: [{ x: 75, y: 25, r: 40 }],
              backgroundColor: '#67e8f9'
            },
            {
              label: 'Marketplace Activity',
              data: [{ x: 25, y: 80, r: 30 }],
              backgroundColor: '#c7e6f0'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              display: false,
              min: 0,
              max: 100
            },
            y: {
              display: false,
              min: 0,
              max: 100
            }
          },
          layout: {
            padding: 10
          }
        },
        plugins: [{
          id: 'bubbleLabels',
          afterDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bubble) => {
                const percent = [89, 75, 62, 20][i];
                const fontSize = [24, 20, 16, 14][i];

                ctx.fillStyle = i === 0 ? '#ffffff' : (i === 3 ? '#2d3748' : '#ffffff');
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${percent}%`, bubble.x, bubble.y);
              });
            });
          }
        }]
      });
    }

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (bubbleChartInstance.current) {
        bubbleChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className=" pt-3 ">
      <div className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          
          {/* Marketplace + Services Usage */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-7">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Marketplace + Services Usage
            </h2>
            <div className="relative h-80 sm:h-96">
              <canvas ref={barChartRef}></canvas>
            </div>
          </div>

          {/* Community Engagement Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-7">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Community Engagement Breakdown
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
              {/* Legend */}
              <div className="flex flex-col justify-center space-y-4 order-2 sm:order-1 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2d3748' }}></div>
                  <span className="text-sm text-gray-700">Posts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0d9488' }}></div>
                  <span className="text-sm text-gray-700">Comments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#67e8f9' }}></div>
                  <span className="text-sm text-gray-700">Events Participation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#c7e6f0' }}></div>
                  <span className="text-sm text-gray-700">Marketplace Activity</span>
                </div>
              </div>

              {/* Bubble Chart */}
              <div className="relative flex-1 w-full h-80 sm:h-96 order-1 sm:order-2">
                <canvas ref={bubbleChartRef}></canvas>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Marketplace;