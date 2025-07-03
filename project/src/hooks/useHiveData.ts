import { useState, useEffect } from 'react';
import { Hive, Alert, SensorData, ThermalImage } from '../types';

// Mock data for demo
const mockHives: Hive[] = [
  {
    id: '1',
    name: 'North Garden Hive',
    location: 'North Garden Plot A',
    deviceId: 'BK-001',
    status: 'healthy',
    temperature: 35.2,
    humidity: 62,
    soundLevel: 45,
    vibration: 2.1,
    lastSync: new Date(Date.now() - 5 * 60 * 1000),
    signalStrength: 85,
  },
  {
    id: '2',
    name: 'South Field Hive',
    location: 'South Field Plot B',
    deviceId: 'BK-002',
    status: 'warning',
    temperature: 38.7,
    humidity: 58,
    soundLevel: 62,
    vibration: 3.4,
    lastSync: new Date(Date.now() - 12 * 60 * 1000),
    signalStrength: 72,
  },
  {
    id: '3',
    name: 'East Meadow Hive',
    location: 'East Meadow Plot C',
    deviceId: 'BK-003',
    status: 'critical',
    temperature: 42.1,
    humidity: 45,
    soundLevel: 78,
    vibration: 5.2,
    lastSync: new Date(Date.now() - 8 * 60 * 1000),
    signalStrength: 58,
  },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    hiveId: '3',
    hiveName: 'East Meadow Hive',
    type: 'temperature',
    severity: 'critical',
    message: 'Temperature exceeded critical threshold',
    description: 'Hive temperature reached 42.1°C, indicating potential overheating or disease.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    resolved: false,
    recommendedAction: 'Check ventilation and inspect for disease signs. Consider emergency cooling.',
  },
  {
    id: '2',
    hiveId: '2',
    hiveName: 'South Field Hive',
    type: 'mites',
    severity: 'high',
    message: 'Varroa mites detected in thermal scan',
    description: 'AI analysis detected 12 potential varroa mites in latest thermal imaging.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    resolved: false,
    recommendedAction: 'Schedule immediate mite treatment. Monitor closely for 48 hours.',
  },
  {
    id: '3',
    hiveId: '1',
    hiveName: 'North Garden Hive',
    type: 'system',
    severity: 'low',
    message: 'Sensor calibration due',
    description: 'Temperature sensor requires calibration for optimal accuracy.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    resolved: true,
    recommendedAction: 'Schedule routine sensor maintenance within 7 days.',
  },
];

export const useHiveData = () => {
  const [hives, setHives] = useState<Hive[]>(mockHives);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedHive, setSelectedHive] = useState<string>(mockHives[0].id);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentHive = () => hives.find(h => h.id === selectedHive) || hives[0];

  const generateSensorData = (hive: Hive): SensorData[] => {
    const data: SensorData[] = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        timestamp,
        temperature: hive.temperature + (Math.random() - 0.5) * 4,
        humidity: hive.humidity + (Math.random() - 0.5) * 10,
        soundLevel: hive.soundLevel + (Math.random() - 0.5) * 20,
        vibration: hive.vibration + (Math.random() - 0.5) * 2,
      });
    }
    
    return data;
  };

  const generateThermalImages = (hiveId: string): ThermalImage[] => {
    const images: ThermalImage[] = [];
    const now = new Date();
    
    for (let i = 7; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      images.push({
        id: `thermal-${hiveId}-${i}`,
        hiveId,
        timestamp,
        imageUrl: `https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop`,
        minTemp: 20 + Math.random() * 5,
        maxTemp: 40 + Math.random() * 10,
        avgTemp: 32 + Math.random() * 6,
        mitesDetected: Math.floor(Math.random() * 15),
      });
    }
    
    return images;
  };

  const addHive = (hive: Omit<Hive, 'id' | 'lastSync'>) => {
    const newHive: Hive = {
      ...hive,
      id: Date.now().toString(),
      lastSync: new Date(),
    };
    setHives(prev => [...prev, newHive]);
    return newHive.id;
  };

  const updateHive = (id: string, updates: Partial<Hive>) => {
    setHives(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  };

  const getActiveAlerts = () => alerts.filter(a => !a.resolved);
  const getCriticalAlerts = () => alerts.filter(a => !a.resolved && (a.severity === 'critical' || a.severity === 'high'));

  return {
    hives,
    alerts,
    selectedHive,
    setSelectedHive,
    isLoading,
    getCurrentHive,
    generateSensorData,
    generateThermalImages,
    addHive,
    updateHive,
    resolveAlert,
    getActiveAlerts,
    getCriticalAlerts,
  };
};