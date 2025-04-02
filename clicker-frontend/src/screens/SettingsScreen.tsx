import React from 'react';
import { View, Text } from 'react-native';
import { SettingsScreenProps } from '../types';
import { styles, settingsStyles, getSettingsThemedStyles } from '../styles';
import { BASE_URL } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/theme';
import { ThemeToggle, SettingsGroup, LogoutButton } from '../components';

export const SettingsScreen = ({ setUser }: SettingsScreenProps) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getSettingsThemedStyles(colors, isDark);

  return (
    <View style={{ ...styles.container, ...themedStyles.container }}>
      <Text style={{ ...styles.title, ...themedStyles.title }}>Settings</Text>

      {/* Theme Section */}
      <SettingsGroup title="Appearance">
        <ThemeToggle />
      </SettingsGroup>

      {/* Server Info Section */}
      <SettingsGroup title="Server Information">
        <Text style={{ ...styles.settingsDescription, ...themedStyles.settingsDescription }}>
          This app is configured to connect to:
          {'\n'}
          {BASE_URL}
        </Text>
      </SettingsGroup>

      {/* Version Info */}
      <SettingsGroup title="About" style={settingsStyles.aboutSection}>
        <Text style={{ ...settingsStyles.creditsText, ...themedStyles.creditsText }}>
          Boxing Clicker - A fun punch counter app
        </Text>
        <Text style={{ ...settingsStyles.versionText, ...themedStyles.versionText }}>
          Version 1.0.0
        </Text>
      </SettingsGroup>

      {/* Logout Button */}
      <LogoutButton setUser={setUser} />
    </View>
  );
};
