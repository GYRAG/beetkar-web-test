import React from 'react';
import { Thermometer, Droplets, Volume2, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { useHiveData } from '../hooks/useHiveData';
import { useLanguage } from '../contexts/LanguageContext';
import { HiveSelector } from '../components/HiveSelector';
import { StatusCard } from '../components/StatusCard';
import { Chart } from '../components/Chart';

export const Dashboard: React.FC = () => {
  const { getCurrentHive, generateSensorData, getCriticalAlerts } = useHiveData();
  const { t } = useLanguage();
  const currentHive = getCurrentHive();
  const sensorData = generateSensorData(currentHive);
  const criticalAlerts = getCriticalAlerts();

  const getStatusFromValue = (value: number, type: 'temperature' | 'humidity' | 'sound' | 'vibration') => {
    switch (type) {
      case 'temperature':
        return value > 40 ? 'critical' : value > 37 ? 'warning' : 'healthy';
      case 'humidity':
        return value < 50 || value > 70 ? 'warning' : 'healthy';
      case 'sound':
        return value > 70 ? 'critical' : value > 60 ? 'warning' : 'healthy';
      case 'vibration':
        return value > 4 ? 'critical' : value > 3 ? 'warning' : 'healthy';
      default:
        return 'healthy';
    }
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return t('common.just.now');
    if (minutes < 60) return `${minutes}${t('common.minutes')} ${t('common.ago')}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}${t('common.hours')} ${t('common.ago')}`;
    const days = Math.floor(hours / 24);
    return `${days}${t('common.days')} ${t('common.ago')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100">
            {t('dashboard.welcome')}, John
          </h1>
          <p className="text-warm-600 dark:text-warm-400 mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>
        
        {criticalAlerts.length > 0 && (
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              {criticalAlerts.length} {t('alerts.critical').toLowerCase()} alert{criticalAlerts.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Hive Selector */}
      <div className="max-w-md">
        <HiveSelector />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title={t('dashboard.temperature')}
          value={currentHive.temperature}
          unit={t('common.celsius')}
          icon={Thermometer}
          status={getStatusFromValue(currentHive.temperature, 'temperature')}
          trend="stable"
        />
        <StatusCard
          title={t('dashboard.humidity')}
          value={currentHive.humidity}
          unit={t('common.percent')}
          icon={Droplets}
          status={getStatusFromValue(currentHive.humidity, 'humidity')}
          trend="down"
        />
        <StatusCard
          title={t('dashboard.sound')}
          value={currentHive.soundLevel}
          unit={t('common.decibel')}
          icon={Volume2}
          status={getStatusFromValue(currentHive.soundLevel, 'sound')}
          trend="up"
        />
        <StatusCard
          title={t('dashboard.vibration')}
          value={currentHive.vibration}
          unit={t('common.hertz')}
          icon={Zap}
          status={getStatusFromValue(currentHive.vibration, 'vibration')}
          trend="stable"
        />
      </div>

      {/* Hive Status Overview */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100">
            {t('dashboard.status.overview')}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-warm-600 dark:text-warm-400">
            <div className="w-2 h-2 bg-forest-500 rounded-full animate-pulse-slow" />
            <span>{t('dashboard.last.sync')}: {formatLastSync(currentHive.lastSync)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-warm-600 dark:text-warm-400">{t('dashboard.device.id')}</span>
              <span className="font-mono text-warm-900 dark:text-warm-100">
                {currentHive.deviceId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-warm-600 dark:text-warm-400">{t('dashboard.signal.strength')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-warm-200 dark:bg-warm-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest-500 transition-all duration-500"
                    style={{ width: `${currentHive.signalStrength}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-warm-900 dark:text-warm-100">
                  {currentHive.signalStrength}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-warm-600 dark:text-warm-400">{t('dashboard.overall.status')}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentHive.status === 'healthy' ? 'bg-forest-100 text-forest-700 dark:bg-forest-900/20 dark:text-forest-400' :
                currentHive.status === 'warning' ? 'bg-honey-100 text-honey-700 dark:bg-honey-900/20 dark:text-honey-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {t(`common.${currentHive.status}`)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-warm-900 dark:text-warm-100">
              {t('dashboard.quick.stats')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-warm-600 dark:text-warm-400">{t('dashboard.avg.temp')}</span>
                <span className="font-medium text-warm-900 dark:text-warm-100">
                  {(sensorData.reduce((sum, d) => sum + d.temperature, 0) / sensorData.length).toFixed(1)}{t('common.celsius')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warm-600 dark:text-warm-400">{t('dashboard.peak.sound')}</span>
                <span className="font-medium text-warm-900 dark:text-warm-100">
                  {Math.max(...sensorData.map(d => d.soundLevel)).toFixed(0)}{t('common.decibel')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warm-600 dark:text-warm-400">{t('dashboard.activity.level')}</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-forest-500" />
                  <span className="font-medium text-forest-600 dark:text-forest-400">
                    {t('common.high')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-warm-900 dark:text-warm-100">
              {t('dashboard.recent.activity')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-forest-500 rounded-full" />
                <span className="text-warm-600 dark:text-warm-400">
                  {t('dashboard.temp.stabilized')}
                </span>
                <span className="text-warm-500 dark:text-warm-500">2{t('common.minutes')} {t('common.ago')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-honey-500 rounded-full" />
                <span className="text-warm-600 dark:text-warm-400">
                  {t('dashboard.sound.increased')}
                </span>
                <span className="text-warm-500 dark:text-warm-500">15{t('common.minutes')} {t('common.ago')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-forest-500 rounded-full" />
                <span className="text-warm-600 dark:text-warm-400">
                  {t('dashboard.data.sync')}
                </span>
                <span className="text-warm-500 dark:text-warm-500">1{t('common.hours')} {t('common.ago')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={sensorData}
          dataKey="temperature"
          title={t('dashboard.temp.trend')}
          unit={t('common.celsius')}
          color="#F59E0B"
        />
        <Chart
          data={sensorData}
          dataKey="humidity"
          title={t('dashboard.humidity.trend')}
          unit={t('common.percent')}
          color="#059669"
        />
      </div>
    </div>
  );
};