import React, { useState } from 'react';
import { ChevronDown, MapPin, Wifi } from 'lucide-react';
import { useHiveData } from '../hooks/useHiveData';

export const HiveSelector: React.FC = () => {
  const { hives, selectedHive, setSelectedHive, getCurrentHive } = useHiveData();
  const [isOpen, setIsOpen] = useState(false);
  const currentHive = getCurrentHive();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-forest-600 bg-forest-100 dark:bg-forest-900/20 dark:text-forest-400';
      case 'warning':
        return 'text-honey-600 bg-honey-100 dark:bg-honey-900/20 dark:text-honey-400';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-warm-600 bg-warm-100 dark:bg-warm-800 dark:text-warm-400';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(currentHive.status).split(' ')[1]}`} />
          <div className="text-left">
            <h3 className="font-semibold text-warm-900 dark:text-warm-100">
              {currentHive.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-warm-600 dark:text-warm-400">
              <MapPin className="w-3 h-3" />
              <span>{currentHive.location}</span>
            </div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-warm-600 dark:text-warm-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700 rounded-2xl shadow-lg z-10 animate-slide-up">
          <div className="p-2">
            {hives.map((hive) => (
              <button
                key={hive.id}
                onClick={() => {
                  setSelectedHive(hive.id);
                  setIsOpen(false);
                }}
                className={`w-full p-3 rounded-xl text-left hover:bg-warm-50 dark:hover:bg-warm-700 transition-colors ${
                  hive.id === selectedHive ? 'bg-honey-50 dark:bg-honey-900/20 ring-2 ring-honey-200 dark:ring-honey-800' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(hive.status).split(' ')[1]}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-warm-900 dark:text-warm-100">
                      {hive.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-2 text-sm text-warm-600 dark:text-warm-400">
                        <MapPin className="w-3 h-3" />
                        <span>{hive.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-warm-600 dark:text-warm-400">
                        <Wifi className="w-3 h-3" />
                        <span>{hive.signalStrength}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};