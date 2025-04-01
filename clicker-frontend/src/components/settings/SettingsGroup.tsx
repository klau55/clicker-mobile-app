import React from 'react';
import { View, Text } from 'react-native';
import { styles, getSettingsThemedStyles } from '../../styles';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';
import { SettingsGroupProps } from '../../types';

export const SettingsGroup = ({ title, children, style }: SettingsGroupProps) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getSettingsThemedStyles(colors, isDark);
  
  return (
    <View style={[
      styles.settingsGroup,
      themedStyles.settingsGroup,
      style
    ]}>
      <Text style={{...styles.settingsTitle, ...themedStyles.settingsTitle}}>
        {title}
      </Text>
      {children}
    </View>
  );
}; 