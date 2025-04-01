import React from 'react';
import { View, Text, Button } from 'react-native';
import { UserSetterType } from '../types';
import { styles } from '../styles';
import { BASE_URL } from '../constants';

interface SettingsScreenProps {
  setUser: UserSetterType;
}

export function SettingsScreen({ setUser }: SettingsScreenProps) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingsGroup}>
        <Text style={styles.settingsTitle}>Server Information</Text>
        <Text style={styles.settingsDescription}>
          This app is configured to connect to:
          {'\n'}{BASE_URL}
          {'\n\n'}This is the correct address for the Android emulator.
        </Text>
      </View>
      
      <View style={styles.settingsButtonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
} 