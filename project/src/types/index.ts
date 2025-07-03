export interface Hive {
  id: string;
  name: string;
  location: string;
  deviceId: string;
  status: 'healthy' | 'warning' | 'critical';
  temperature: number;
  humidity: number;
  soundLevel: number;
  vibration: number;
  lastSync: Date;
  signalStrength: number;
}

export interface Alert {
  id: string;
  hiveId: string;
  hiveName: string;
  type: 'temperature' | 'humidity' | 'sound' | 'vibration' | 'mites' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  recommendedAction: string;
}

export interface SensorData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  soundLevel: number;
  vibration: number;
}

export interface ThermalImage {
  id: string;
  hiveId: string;
  timestamp: Date;
  imageUrl: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  mitesDetected: number;
}

export interface User {
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'viewer' | 'guest';
  notifications: {
    email: boolean;
    push: boolean;
    criticalOnly: boolean;
  };
}