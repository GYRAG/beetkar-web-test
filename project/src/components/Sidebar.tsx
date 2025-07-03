import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Activity, AlertTriangle, Plus, Settings, Hexagon, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const navigation = [
  { name: 'nav.dashboard', href: '/dashboard', icon: Home },
  { name: 'nav.hive.details', href: '/dashboard/hive', icon: Activity },
  { name: 'nav.alerts', href: '/dashboard/alerts', icon: AlertTriangle },
  { name: 'nav.add.hive', href: '/dashboard/add-hive', icon: Plus },
  { name: 'nav.settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    // Clear auth state
    localStorage.removeItem('beetkar_auth');
    localStorage.removeItem('beetkar_user');
    
    // Navigate to landing page
    navigate('/');
  };

  // Get user info from localStorage
  const userStr = localStorage.getItem('beetkar_user');
  const user = userStr ? JSON.parse(userStr) : { name: 'John Doe', email: 'john@example.com' };

  return (
    <div className="w-64 bg-white dark:bg-warm-800 border-r border-warm-200 dark:border-warm-700 flex flex-col">
      <div className="p-6 border-b border-warm-200 dark:border-warm-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-honey-500 rounded-xl flex items-center justify-center">
            <Hexagon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-warm-900 dark:text-warm-100">
              Beetkar
            </h1>
            <p className="text-sm text-warm-600 dark:text-warm-400">
              {t('sidebar.smart.monitor')}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 shadow-sm'
                  : 'text-warm-600 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-700 hover:text-warm-900 dark:hover:text-warm-200'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{t(item.name)}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-warm-200 dark:border-warm-700">
        <div className="flex items-center space-x-3 px-4 py-3 mb-3">
          <div className="w-8 h-8 bg-forest-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'JD'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-900 dark:text-warm-100">
              {user.name || 'John Doe'}
            </p>
            <p className="text-xs text-warm-600 dark:text-warm-400">
              {t('sidebar.beekeeper')}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-warm-600 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-700 hover:text-warm-900 dark:hover:text-warm-200 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('sidebar.sign.out')}</span>
        </button>
      </div>
    </div>
  );
};