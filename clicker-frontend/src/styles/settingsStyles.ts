import { StyleSheet } from 'react-native';
import { ThemeColors } from './theme';

// Base styles that don't change with theme
export const settingsStyles = StyleSheet.create({
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  themeText: {
    fontSize: 16,
  },
  themeButton: {
    padding: 10,
    borderRadius: 20,
  },
  aboutSection: {
    marginTop: 10,
  },
  versionText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  creditsText: {
    fontSize: 14,
    marginTop: 8,
  },
  linkText: {
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
});

// Function to get theme-aware styles
export const getSettingsThemedStyles = (colors: ThemeColors, isDark: boolean) => ({
  container: {
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
  },
  settingsGroup: {
    backgroundColor: colors.settingsGroupBg,
    borderColor: colors.settingsGroupBorder,
  },
  settingsTitle: {
    color: colors.text,
  },
  settingsDescription: {
    color: colors.subtitle,
  },
  themeText: {
    color: colors.text,
  },
  themeButton: {
    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  },
  themeIcon: {
    color: isDark ? '#f5f5f5' : '#ffb74d',
  },
  versionText: {
    color: colors.subtitle,
  },
  creditsText: {
    color: colors.text,
  },
  linkText: {
    color: colors.primary,
  },
});
