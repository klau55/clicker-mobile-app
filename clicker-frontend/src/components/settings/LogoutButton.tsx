import React from 'react';
import { Button, View } from 'react-native';
import { LogoutButtonProps } from '../../types';
import { styles } from '../../styles';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';

export const LogoutButton = ({ setUser, style }: LogoutButtonProps) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  
  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <View style={[styles.settingsButtonContainer, style]}>
      <Button 
        title="Logout" 
        onPress={handleLogout}
        color={colors.primary}
      />
    </View>
  );
}; 