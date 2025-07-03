import React, { useState } from 'react';
import { User, Bell, Database, HelpCircle, Mail, Phone, Save, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../types';

export const Settings: React.FC = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<UserType>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'owner',
    notifications: {
      email: true,
      push: true,
      criticalOnly: false,
    },
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [offlineSync, setOfflineSync] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleUserUpdate = (field: keyof UserType, value: any) => {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationUpdate = (field: keyof UserType['notifications'], value: boolean) => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Settings saved successfully!');
    
    setIsSaving(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const syncOfflineData = async () => {
    alert('Offline data sync started. This may take a few minutes.');
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Offline data synced successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100">
          {t('settings.title')}
        </h1>
        <p className="text-warm-600 dark:text-warm-400 mt-2">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* User Profile */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex items-center space-x-2 mb-6">
          <User className="w-6 h-6 text-honey-500" />
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100">
            {t('settings.user.profile')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
              {t('settings.full.name')}
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleUserUpdate('name', e.target.value)}
              className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
              {t('settings.email')}
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleUserUpdate('email', e.target.value)}
              className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
              {t('settings.role')}
            </label>
            <select
              value={user.role}
              onChange={(e) => handleUserUpdate('role', e.target.value)}
              className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
            >
              <option value="owner">{t('common.owner')}</option>
              <option value="manager">{t('common.manager')}</option>
              <option value="viewer">{t('common.viewer')}</option>
              <option value="guest">{t('common.guest')}</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-warm-700 dark:text-warm-300">
              {t('settings.account.status')}
            </span>
            <span className="px-3 py-1 bg-forest-100 text-forest-700 dark:bg-forest-900/20 dark:text-forest-400 rounded-full text-sm font-medium">
              {t('settings.active')}
            </span>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="w-6 h-6 text-honey-500" />
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100">
            {t('settings.notifications')}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-warm-900 dark:text-warm-100">
                {t('settings.email.notifications')}
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-400">
                {t('settings.email.desc')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.notifications.email}
                onChange={(e) => handleNotificationUpdate('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-warm-200 dark:bg-warm-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 dark:peer-focus:ring-honey-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-warm-900 dark:text-warm-100">
                {t('settings.push.notifications')}
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-400">
                {t('settings.push.desc')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.notifications.push}
                onChange={(e) => handleNotificationUpdate('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-warm-200 dark:bg-warm-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 dark:peer-focus:ring-honey-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-warm-900 dark:text-warm-100">
                {t('settings.critical.only')}
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-400">
                {t('settings.critical.desc')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.notifications.criticalOnly}
                onChange={(e) => handleNotificationUpdate('criticalOnly', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-warm-200 dark:bg-warm-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 dark:peer-focus:ring-honey-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6">
          {t('settings.app.preferences')}
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-warm-900 dark:text-warm-100">
                {t('settings.dark.mode')}
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-400">
                {t('settings.dark.desc')}
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 bg-warm-100 dark:bg-warm-700 hover:bg-warm-200 dark:hover:bg-warm-600 px-4 py-2 rounded-xl transition-colors"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-honey-500" />
                  <span className="text-warm-900 dark:text-warm-100">{t('settings.light')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-warm-600" />
                  <span className="text-warm-900 dark:text-warm-100">{t('settings.dark')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex items-center space-x-2 mb-6">
          <Database className="w-6 h-6 text-honey-500" />
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100">
            {t('settings.data.management')}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-warm-900 dark:text-warm-100">
                {t('settings.offline.sync')}
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-400">
                {t('settings.offline.desc')}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={offlineSync}
                onChange={(e) => setOfflineSync(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-warm-200 dark:bg-warm-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 dark:peer-focus:ring-honey-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-warm-900 dark:text-warm-100">
                {t('settings.sync.now')}
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-400">
                {t('settings.sync.desc')}
              </p>
            </div>
            <button
              onClick={syncOfflineData}
              className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded-xl transition-colors"
            >
              {t('settings.sync.button')}
            </button>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
        <div className="flex items-center space-x-2 mb-6">
          <HelpCircle className="w-6 h-6 text-honey-500" />
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100">
            {t('settings.help.support')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-warm-900 dark:text-warm-100">
              {t('settings.contact.info')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-warm-600 dark:text-warm-400" />
                <div>
                  <div className="text-sm text-warm-600 dark:text-warm-400">{t('settings.support.email')}</div>
                  <div className="font-medium text-warm-900 dark:text-warm-100">
                    support@beetkar.com
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-warm-600 dark:text-warm-400" />
                <div>
                  <div className="text-sm text-warm-600 dark:text-warm-400">{t('settings.support.phone')}</div>
                  <div className="font-medium text-warm-900 dark:text-warm-100">
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-warm-900 dark:text-warm-100">
              {t('settings.resources')}
            </h3>
            <div className="space-y-2">
              <a href="#" className="block text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 transition-colors">
                User Guide & Documentation
              </a>
              <a href="#" className="block text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 transition-colors">
                Troubleshooting Guide
              </a>
              <a href="#" className="block text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 transition-colors">
                Device Setup Instructions
              </a>
              <a href="#" className="block text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 transition-colors">
                Community Forum
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
            !isSaving
              ? 'bg-honey-500 hover:bg-honey-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-warm-300 dark:bg-warm-600 text-warm-500 dark:text-warm-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          <span>
            {isSaving ? t('settings.saving') : t('settings.save')}
          </span>
        </button>
      </div>
    </div>
  );
};