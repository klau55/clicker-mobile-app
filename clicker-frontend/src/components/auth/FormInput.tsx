import React, { forwardRef } from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { authStyles } from '../../styles';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';
import { FormInputProps } from '../../types';

export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ label, error, showError, themedStyles, ...props }, ref) => {
    const { isDark } = useTheme();
    const colors = getThemeColors(isDark);
    const defaultThemedStyles = themedStyles || {
      input: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.9)',
        color: isDark ? colors.text : '#1a237e',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#000',
        shadowOpacity: isDark ? 0.3 : 0.2,
      },
      inputError: {
        borderColor: colors.error,
      },
      errorText: {
        color: isDark ? '#ff8a80' : '#ff6b6b',
      },
    };

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[
            authStyles.input,
            defaultThemedStyles.input,
            showError && error ? defaultThemedStyles.inputError : {},
          ]}
          placeholderTextColor={isDark ? '#aaaaaa' : '#1a237e'}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        {showError && error ? (
          <Text style={[authStyles.errorText, defaultThemedStyles.errorText]}>{error}</Text>
        ) : null}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});
