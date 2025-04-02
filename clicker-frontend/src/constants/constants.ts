import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Get the development server IP from Expo's extra field or environment
const getDevelopmentIP = () => {
  // Try to get IP from Expo's manifest extra field
  const configuredIP = Constants.expoConfig?.extra?.developmentIP;
  if (configuredIP) return configuredIP;

  // Try to get IP from debugger host
  const debuggerHost = Constants.manifest?.debuggerHost;
  if (debuggerHost) {
    return debuggerHost.split(':')[0];
  }

  // Fallback to localhost
  return 'localhost';
};

const getServerUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.example.com';
  }

  const developmentIP = getDevelopmentIP();

  // For web
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }

  // For Android emulator
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  // For physical devices (iOS and Android)
  return `http://${developmentIP}:3000`;
};

export const BASE_URL = getServerUrl();

// Log configuration for debugging
console.log({
  platform: Platform.OS,
  isDevice: Constants.isDevice,
  debuggerHost: Constants.manifest?.debuggerHost,
  developmentIP: getDevelopmentIP(),
  baseUrl: BASE_URL,
}); 