import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';
import { authStyles } from '../../styles';
import { ButtonProps } from '../../types';

export const Button = ({ 
  title, 
  loading = false, 
  secondary = false,
  themedStyles,
  ...props 
}: ButtonProps) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const defaultThemedStyles = themedStyles || {
    primaryButton: {
      backgroundColor: isDark ? colors.accent : '#ffffff',
      shadowColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#000',
      shadowOpacity: isDark ? 0.3 : 0.25,
    },
    secondaryButton: {
      borderColor: '#ffffff',
    },
    buttonText: {
      color: isDark ? '#ffffff' : '#1a237e',
    },
    secondaryButtonText: {
      color: '#ffffff',
    },
  };

  return (
    <TouchableOpacity
      style={[
        secondary ? authStyles.secondaryButton : authStyles.primaryButton,
        secondary ? defaultThemedStyles.secondaryButton : defaultThemedStyles.primaryButton,
        props.disabled ? authStyles.disabledButton : null,
        props.style
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={isDark ? '#ffffff' : '#1a237e'} 
        />
      ) : (
        <Text 
          style={[
            secondary ? authStyles.secondaryButtonText : authStyles.buttonText,
            secondary ? defaultThemedStyles.secondaryButtonText : defaultThemedStyles.buttonText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}; 