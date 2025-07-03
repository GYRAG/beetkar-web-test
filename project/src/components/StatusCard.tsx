import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status: 'healthy' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  onClick?: () => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend,
  onClick,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'border-forest-200 bg-forest-50 dark:bg-forest-900/20 dark:border-forest-800';
      case 'warning':
        return 'border-honey-200 bg-honey-50 dark:bg-honey-900/20 dark:border-honey-800';
      case 'critical':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      default:
        return 'border-warm-200 bg-warm-50 dark:bg-warm-800 dark:border-warm-700';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-forest-600 dark:text-forest-400';
      case 'warning':
        return 'text-honey-600 dark:text-honey-400';
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-warm-600 dark:text-warm-400';
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 ${getStatusColor()}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white dark:bg-warm-800 shadow-sm`}>
          <Icon className={`w-6 h-6 ${getIconColor()}`} />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${
            trend === 'up' ? 'text-forest-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-warm-600'
          }`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-warm-600 dark:text-warm-400">
          {title}
        </h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-warm-900 dark:text-warm-100">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-warm-600 dark:text-warm-400">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};