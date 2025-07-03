import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import { useHiveData } from '../hooks/useHiveData';
import { useLanguage } from '../contexts/LanguageContext';

export const Alerts: React.FC = () => {
  const { alerts, resolveAlert } = useHiveData();
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && !alert.resolved) ||
      (filterStatus === 'resolved' && alert.resolved);
    
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    
    const matchesSearch = searchTerm === '' || 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.hiveName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
      case 'medium':
        return 'bg-honey-100 text-honey-700 border-honey-200 dark:bg-honey-900/20 dark:text-honey-400 dark:border-honey-800';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      default:
        return 'bg-warm-100 text-warm-700 border-warm-200 dark:bg-warm-800 dark:text-warm-400 dark:border-warm-700';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return '🌡️';
      case 'humidity':
        return '💧';
      case 'sound':
        return '🔊';
      case 'vibration':
        return '📳';
      case 'mites':
        return '🐛';
      case 'system':
        return '⚙️';
      default:
        return '⚠️';
    }
  };

  const formatTimeAgo = (date: Date) => {
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

  const activeAlerts = alerts.filter(a => !a.resolved);
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');
  const highAlerts = activeAlerts.filter(a => a.severity === 'high');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100">
            {t('alerts.title')}
          </h1>
          <p className="text-warm-600 dark:text-warm-400 mt-1">
            {t('alerts.subtitle')}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              {criticalAlerts.length} {t('alerts.critical')}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl px-4 py-2">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">
              {highAlerts.length} {t('alerts.high.priority')}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-400 dark:text-warm-500" />
              <input
                type="text"
                placeholder={t('alerts.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-warm-600 dark:text-warm-400" />
              <span className="text-sm font-medium text-warm-700 dark:text-warm-300">
                {t('alerts.status')}:
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-warm-100 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-lg px-3 py-2 text-sm text-warm-900 dark:text-warm-100"
              >
                <option value="all">{t('alerts.all')}</option>
                <option value="active">{t('alerts.active')}</option>
                <option value="resolved">{t('alerts.resolved')}</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-warm-700 dark:text-warm-300">
                {t('alerts.severity')}:
              </span>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value as any)}
                className="bg-warm-100 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-lg px-3 py-2 text-sm text-warm-900 dark:text-warm-100"
              >
                <option value="all">{t('alerts.all')}</option>
                <option value="critical">{t('alerts.critical')}</option>
                <option value="high">{t('alerts.high')}</option>
                <option value="medium">{t('alerts.medium')}</option>
                <option value="low">{t('alerts.low')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white dark:bg-warm-800 rounded-2xl p-12 text-center border border-warm-200 dark:border-warm-700">
            <CheckCircle className="w-16 h-16 text-forest-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-2">
              {t('alerts.no.alerts')}
            </h3>
            <p className="text-warm-600 dark:text-warm-400">
              {searchTerm || filterStatus !== 'all' || filterSeverity !== 'all'
                ? t('alerts.no.alerts.filter')
                : t('alerts.no.alerts.desc')}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white dark:bg-warm-800 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${getSeverityColor(alert.severity)} ${
                alert.resolved ? 'opacity-60' : ''
              }`}
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl">
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getSeverityColor(alert.severity)}`}>
                          {t(`alerts.${alert.severity}`)}
                        </span>
                        <span className="text-sm font-medium text-warm-600 dark:text-warm-400">
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </span>
                        <span className="text-sm text-warm-500 dark:text-warm-500">
                          {alert.hiveName}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100 mb-1">
                        {alert.message}
                      </h3>
                      
                      <p className="text-warm-600 dark:text-warm-400 text-sm">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-warm-600 dark:text-warm-400">
                        {formatTimeAgo(alert.timestamp)}
                      </div>
                      {alert.resolved && (
                        <div className="flex items-center space-x-1 text-forest-600 dark:text-forest-400 text-sm mt-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>{t('alerts.resolved.status')}</span>
                        </div>
                      )}
                    </div>
                    
                    {!alert.resolved && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resolveAlert(alert.id);
                        }}
                        className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        {t('alerts.resolve')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {expandedAlert === alert.id && (
                <div className="border-t border-warm-200 dark:border-warm-700 p-6 bg-warm-50 dark:bg-warm-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-warm-900 dark:text-warm-100 mb-3">
                        {t('alerts.details')}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-warm-600 dark:text-warm-400">{t('alerts.alert.id')}:</span>
                          <span className="text-warm-900 dark:text-warm-100 font-mono">{alert.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warm-600 dark:text-warm-400">{t('alerts.hive.id')}:</span>
                          <span className="text-warm-900 dark:text-warm-100 font-mono">{alert.hiveId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warm-600 dark:text-warm-400">{t('alerts.timestamp')}:</span>
                          <span className="text-warm-900 dark:text-warm-100">{alert.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-warm-900 dark:text-warm-100 mb-3">
                        {t('alerts.recommended.action')}
                      </h4>
                      <p className="text-sm text-warm-700 dark:text-warm-300 bg-white dark:bg-warm-800 rounded-lg p-3">
                        {alert.recommendedAction}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};