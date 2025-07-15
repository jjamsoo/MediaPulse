'use client';

import { useState, useEffect } from 'react';

interface CyclePoint {
  year: number;
  type: 'peak' | 'predicted';
  value: number;
}

interface CycleChartProps {
  cycles: CyclePoint[];
  className?: string;
}

export function CycleChart({ cycles, className = '' }: CycleChartProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(75); // Animate to 75% to show current position
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...cycles.map(c => c.value));
  const minYear = Math.min(...cycles.map(c => c.year));
  const maxYear = Math.max(...cycles.map(c => c.year));
  const yearRange = maxYear - minYear;

  return (
    <div className={`relative ${className}`}>
      {/* Chart Container */}
      <div className="relative h-40 bg-gradient-to-b from-blue-50 to-white rounded-lg p-4 border">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
          <span>{maxValue.toLocaleString()}</span>
          <span>{Math.round(maxValue * 0.5).toLocaleString()}</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 mr-4 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 25, 50, 75, 100].map(percent => (
              <div
                key={percent}
                className="absolute w-full border-t border-gray-200"
                style={{ top: `${100 - percent}%` }}
              />
            ))}
          </div>

          {/* Cycle line and points */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Connect the points with lines */}
            {cycles.map((cycle, index) => {
              if (index === cycles.length - 1) return null;
              const nextCycle = cycles[index + 1];

              const x1 = ((cycle.year - minYear) / yearRange) * 100;
              const y1 = ((maxValue - cycle.value) / maxValue) * 100;
              const x2 = ((nextCycle.year - minYear) / yearRange) * 100;
              const y2 = ((maxValue - nextCycle.value) / maxValue) * 100;

              return (
                <line
                  key={`line-${index}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={nextCycle.type === 'predicted' ? '#f97316' : '#3b82f6'}
                  strokeWidth="2"
                  strokeDasharray={nextCycle.type === 'predicted' ? '5,5' : 'none'}
                  className={nextCycle.type === 'predicted' ? 'animate-pulse' : ''}
                />
              );
            })}

            {/* Cycle points */}
            {cycles.map((cycle, index) => {
              const x = ((cycle.year - minYear) / yearRange) * 100;
              const y = ((maxValue - cycle.value) / maxValue) * 100;

              return (
                <g key={cycle.year}>
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="6"
                    fill={cycle.type === 'predicted' ? '#f97316' : '#3b82f6'}
                    className={cycle.type === 'predicted' ? 'animate-pulse' : ''}
                  />
                  {cycle.type === 'predicted' && (
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="10"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 h-1 bg-gray-200 rounded-full w-full">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-2000 ease-out"
              style={{ width: `${animatedProgress}%` }}
            />
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-12 right-4 flex justify-between text-xs text-gray-500">
          {cycles.map(cycle => (
            <div key={cycle.year} className="flex flex-col items-center">
              <span className="font-medium">{cycle.year}</span>
              <span className={`text-xs ${cycle.type === 'predicted' ? 'text-orange-600' : 'text-blue-600'}`}>
                {cycle.type === 'predicted' ? '예측' : '실제'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>실제 피크</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
          <span>예측 피크</span>
        </div>
      </div>
    </div>
  );
}
