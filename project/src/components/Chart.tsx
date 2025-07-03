import React from 'react';
import { SensorData } from '../types';

interface ChartProps {
  data: SensorData[];
  dataKey: keyof SensorData;
  title: string;
  unit: string;
  color: string;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  dataKey,
  title,
  unit,
  color,
  height = 200,
}) => {
  const values = data.map(d => d[dataKey] as number);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item[dataKey] as number - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
          {title}
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-warm-900 dark:text-warm-100">
            {values[values.length - 1]?.toFixed(1)}
          </div>
          <div className="text-sm text-warm-600 dark:text-warm-400">
            {unit}
          </div>
        </div>
      </div>
      
      <div className="relative" style={{ height }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeWidth="0.2"
              opacity="0.2"
              className="text-warm-400 dark:text-warm-600"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={`M 0,100 L ${points} L 100,100 Z`}
            fill={`url(#gradient-${dataKey})`}
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item[dataKey] as number - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={color}
                className="opacity-0 hover:opacity-100 transition-opacity"
              />
            );
          })}
        </svg>
        
        {/* Time labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-warm-600 dark:text-warm-400">
          <span>24h ago</span>
          <span>12h ago</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
};