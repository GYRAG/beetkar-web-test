import React, { useState } from 'react';
import { Camera, MapPin, Save, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHiveData } from '../hooks/useHiveData';
import { useLanguage } from '../contexts/LanguageContext';

export const AddHive: React.FC = () => {
  const navigate = useNavigate();
  const { addHive } = useHiveData();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    deviceId: '',
    status: 'healthy' as const,
    temperature: 35,
    humidity: 60,
    soundLevel: 40,
    vibration: 2,
    signalStrength: 85,
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'location' || name === 'deviceId' || name === 'status' 
        ? value 
        : parseFloat(value) || 0
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const hiveId = addHive(formData);
      
      // Show success message
      alert('Hive added successfully!');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding hive:', error);
      alert('Failed to add hive. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.location && formData.deviceId;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100">
          {t('add.hive.title')}
        </h1>
        <p className="text-warm-600 dark:text-warm-400 mt-2">
          {t('add.hive.subtitle')}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6">
            {t('add.hive.basic.info')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.name')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('add.hive.name.placeholder')}
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.device.id')} *
              </label>
              <input
                type="text"
                name="deviceId"
                value={formData.deviceId}
                onChange={handleInputChange}
                placeholder={t('add.hive.device.placeholder')}
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
              {t('add.hive.location')} *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-400 dark:text-warm-500" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t('add.hive.location.placeholder')}
                className="w-full pl-10 pr-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
                required
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6">
            {t('add.hive.photo')}
          </h2>
          
          <div className="space-y-4">
            {photo ? (
              <div className="relative">
                <img
                  src={photo}
                  alt="Hive photo"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-warm-300 dark:border-warm-600 rounded-xl p-8 text-center">
                <Camera className="w-12 h-12 text-warm-400 dark:text-warm-500 mx-auto mb-4" />
                <p className="text-warm-600 dark:text-warm-400 mb-4">
                  {t('add.hive.photo.upload')}
                </p>
                <label className="inline-flex items-center space-x-2 bg-honey-500 hover:bg-honey-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>{t('add.hive.photo.choose')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Initial Sensor Values */}
        <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6">
            {t('add.hive.sensor.config')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.target.temp')}
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                min="20"
                max="45"
                step="0.1"
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.target.humidity')}
              </label>
              <input
                type="number"
                name="humidity"
                value={formData.humidity}
                onChange={handleInputChange}
                min="30"
                max="80"
                step="1"
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.sound.threshold')}
              </label>
              <input
                type="number"
                name="soundLevel"
                value={formData.soundLevel}
                onChange={handleInputChange}
                min="20"
                max="80"
                step="1"
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.vibration.threshold')}
              </label>
              <input
                type="number"
                name="vibration"
                value={formData.vibration}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="0.1"
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              />
            </div>
          </div>
        </div>

        {/* Device Assignment */}
        <div className="bg-white dark:bg-warm-800 rounded-2xl p-6 border border-warm-200 dark:border-warm-700">
          <h2 className="text-xl font-semibold text-warm-900 dark:text-warm-100 mb-6">
            {t('add.hive.device.config')}
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.initial.status')}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              >
                <option value="healthy">{t('common.healthy')}</option>
                <option value="warning">{t('common.warning')}</option>
                <option value="critical">{t('common.critical')}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                {t('add.hive.signal.strength')}
              </label>
              <input
                type="number"
                name="signalStrength"
                value={formData.signalStrength}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="1"
                className="w-full px-4 py-3 bg-warm-50 dark:bg-warm-700 border border-warm-200 dark:border-warm-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent text-warm-900 dark:text-warm-100"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
              isFormValid && !isSubmitting
                ? 'bg-honey-500 hover:bg-honey-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-warm-300 dark:bg-warm-600 text-warm-500 dark:text-warm-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>
              {isSubmitting ? t('add.hive.adding') : t('add.hive.add')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};