import React from 'react';
import { Bell, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import { useHiveData } from '../hooks/useHiveData';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export const Header: React.FC = () => {
  const { getCriticalAlerts } = useHiveData();
  const { t } = useLanguage();
  const [isDark, setIsDark] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  
  const criticalAlerts = getCriticalAlerts();

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-warm-800 border-b border-warm-200 dark:border-warm-700 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100">
            {t('nav.dashboard')}
          </h1>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-forest-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-warm-600 dark:text-warm-400">
              {isOnline ? t('common.online') : t('common.offline')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-warm-100 dark:bg-warm-700 hover:bg-warm-200 dark:hover:bg-warm-600 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-honey-500" />
            ) : (
              <Moon className="w-5 h-5 text-warm-600" />
            )}
          </button>
          
          <button className="relative p-2 rounded-lg bg-warm-100 dark:bg-warm-700 hover:bg-warm-200 dark:hover:bg-warm-600 transition-colors">
            <Bell className="w-5 h-5 text-warm-600 dark:text-warm-400" />
            {criticalAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-semibold">
                {criticalAlerts.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};