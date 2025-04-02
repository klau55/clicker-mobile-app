import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { settingsStyles, getSettingsThemedStyles } from '../../styles';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';
import { ThemeToggleProps } from '../../types';

export const ThemeToggle = ({ onToggle }: ThemeToggleProps) => {
  const { toggleTheme, isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getSettingsThemedStyles(colors, isDark);

  const handleToggle = () => {
    toggleTheme();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <View style={settingsStyles.themeRow}>
      <Text style={{ ...settingsStyles.themeText, ...themedStyles.themeText }}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <TouchableOpacity
        onPress={handleToggle}
        style={{ ...settingsStyles.themeButton, ...themedStyles.themeButton }}
      >
        <MaterialCommunityIcons
          name={isDark ? 'weather-night' : 'white-balance-sunny'}
          size={24}
          color={themedStyles.themeIcon.color}
        />
      </TouchableOpacity>
    </View>
  );
};
