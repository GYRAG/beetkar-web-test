import React, { useState } from 'react';
import { Calendar, Download, Camera, Activity, Thermometer, Droplets, Volume2, Zap } from 'lucide-react';
import { useHiveData } from '../hooks/useHiveData';
import { useLanguage } from '../contexts/LanguageContext';
import { Chart } from '../components/Chart';

export const HiveDetail: React.FC = () => {
  const { getCurrentHive, generateSensorData, generateThermalImages, alerts } = useHiveData();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [thermalView, setThermalView] = useState('latest');
  
  const currentHive = getCurrentHive();
  const sensorData = generateSensorData(currentHive);
  const thermalImages = generateThermalImages(currentHive.id);
  const hiveAlerts = alerts.filter(a => a.hiveId === currentHive.id);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const downloadReport = () => {
    // Mock CSV generation
    const csvContent = [
      ['Timestamp', 'Temperature', 'Humidity', 'Sound Level', 'Vibration'],
      ...sensorData.map(d => [
        d.timestamp.toISOString(),
        d.temperature.toFixed(1),
        d.humidity.toFixed(1),
        d.soundLevel.toFixed(1),
        d.vibration.toFixed(1),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentHive.name}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100">
            {currentHive.name}
          </h1>
          <p className="text-warm-600 dark:text-warm-400 mt-1">
            {currentHive.location} • Device ID: {currentHive.deviceId}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadReport}
            className="flex items-center space-x-2 bg-honey-500 hover:bg-honey-600 text-white px-4 py-2 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{t('hive.details.download')}</span>
          </button>
          
          <div className="flex items-center space-x-2 bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700 rounded-xl px-4 py-2">
            <Calendar className="w-4 h-4 text-warm-600 dark:text-warm-400" />
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="bg-transparent text-warm-900 dark:text-warm-100 border-none outline-none"
            />
          </div>
        </div>
      </div>

      {/* Thermal Image Viewer */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 flex items-center space-x-2">
            <Camera className="w-5 h-5 text-honey-500" />
            <span>{t('hive.details.thermal')}</span>
          </h2>
          
          <div className="flex items-center space-x-2">
            <select
              value={thermalView}
              onChange={(e) => setThermalView(e.target.value)}
              className="bg-warm-100 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-lg px-3 py-2 text-sm text-warm-900 dark:text-warm-100"
            >
              <option value="latest">{t('hive.details.latest')}</option>
              <option value="gallery">{t('hive.details.gallery')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative bg-warm-100 dark:bg-warm-700 rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6889395/pexels-photo-6889395.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
                alt="Thermal image of beehive"
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-white text-sm">
                  <div>Min: {thermalImages[0]?.minTemp.toFixed(1)}{t('common.celsius')}</div>
                  <div>Max: {thermalImages[0]?.maxTemp.toFixed(1)}{t('common.celsius')}</div>
                  <div>Avg: {thermalImages[0]?.avgTemp.toFixed(1)}{t('common.celsius')}</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-white text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{t('common.mites')}: {thermalImages[0]?.mitesDetected}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-warm-900 dark:text-warm-100">
              {t('hive.details.analysis')}
            </h3>
            <div className="space-y-3">
              <div className="bg-warm-50 dark:bg-warm-700 rounded-lg p-3">
                <div className="text-sm text-warm-600 dark:text-warm-400">
                  {t('hive.details.mites.detected')}
                </div>
                <div className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                  {thermalImages[0]?.mitesDetected} {t('common.mites')}
                </div>
              </div>
              <div className="bg-warm-50 dark:bg-warm-700 rounded-lg p-3">
                <div className="text-sm text-warm-600 dark:text-warm-400">
                  {t('hive.details.temp.variance')}
                </div>
                <div className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                  {(thermalImages[0]?.maxTemp - thermalImages[0]?.minTemp).toFixed(1)}{t('common.celsius')}
                </div>
              </div>
              <div className="bg-warm-50 dark:bg-warm-700 rounded-lg p-3">
                <div className="text-sm text-warm-600 dark:text-warm-400">
                  {t('hive.details.image.quality')}
                </div>
                <div className="text-lg font-semibold text-forest-600 dark:text-forest-400">
                  {t('hive.details.excellent')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Data Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={sensorData}
          dataKey="temperature"
          title={t('hive.details.temp.over.time')}
          unit={t('common.celsius')}
          color="#F59E0B"
          height={250}
        />
        <Chart
          data={sensorData}
          dataKey="humidity"
          title={t('hive.details.humidity.over.time')}
          unit={t('common.percent')}
          color="#059669"
          height={250}
        />
        <Chart
          data={sensorData}
          dataKey="soundLevel"
          title={t('hive.details.sound.activity')}
          unit={t('common.decibel')}
          color="#3B82F6"
          height={250}
        />
        <Chart
          data={sensorData}
          dataKey="vibration"
          title={t('hive.details.vibration.level')}
          unit={t('common.hertz')}
          color="#8B5CF6"
          height={250}
        />
      </div>

      {/* Device Status */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-forest-500" />
          <span>{t('hive.details.device.status')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-forest-100 dark:bg-forest-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Thermometer className="w-8 h-8 text-forest-600 dark:text-forest-400" />
            </div>
            <div className="text-sm text-warm-600 dark:text-warm-400">{t('hive.details.temp.sensor')}</div>
            <div className="font-semibold text-forest-600 dark:text-forest-400">{t('common.online')}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-forest-100 dark:bg-forest-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-8 h-8 text-forest-600 dark:text-forest-400" />
            </div>
            <div className="text-sm text-warm-600 dark:text-warm-400">{t('hive.details.humidity.sensor')}</div>
            <div className="font-semibold text-forest-600 dark:text-forest-400">{t('common.online')}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-forest-100 dark:bg-forest-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-8 h-8 text-forest-600 dark:text-forest-400" />
            </div>
            <div className="text-sm text-warm-600 dark:text-warm-400">{t('hive.details.sound.sensor')}</div>
            <div className="font-semibold text-forest-600 dark:text-forest-400">{t('common.online')}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-forest-100 dark:bg-forest-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-forest-600 dark:text-forest-400" />
            </div>
            <div className="text-sm text-warm-600 dark:text-warm-400">{t('hive.details.vibration.sensor')}</div>
            <div className="font-semibold text-forest-600 dark:text-forest-400">{t('common.online')}</div>
          </div>
        </div>
      </div>

      {/* Alert History */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6">
          {t('hive.details.recent.alerts')}
        </h2>

        <div className="space-y-4">
          {hiveAlerts.length === 0 ? (
            <div className="text-center py-8 text-warm-600 dark:text-warm-400">
              {t('hive.details.no.alerts')}
            </div>
          ) : (
            hiveAlerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-l-4 ${
                  alert.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  alert.severity === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                  alert.severity === 'medium' ? 'border-honey-500 bg-honey-50 dark:bg-honey-900/20' :
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                        alert.severity === 'medium' ? 'bg-honey-100 text-honey-700 dark:bg-honey-900/20 dark:text-honey-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-warm-900 dark:text-warm-100">
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-warm-900 dark:text-warm-100 font-medium mb-1">
                      {alert.message}
                    </p>
                    <p className="text-sm text-warm-600 dark:text-warm-400">
                      {alert.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-warm-600 dark:text-warm-400">
                      {alert.timestamp.toLocaleString()}
                    </div>
                    {alert.resolved && (
                      <div className="text-xs text-forest-600 dark:text-forest-400 mt-1">
                        {t('alerts.resolved.status')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};