import { StyleSheet } from 'react-native';
import { ThemeColors } from './theme';

// Base styles that don't change with theme
export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.9,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    fontSize: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 4,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
  },
});

// Function to get theme-aware styles
export const getAuthThemedStyles = (colors: ThemeColors, isDark: boolean) => ({
  container: {
    backgroundColor: isDark ? colors.primary : '#1a237e',
  },
  title: {
    color: '#ffffff',
  },
  subtitle: {
    color: '#ffffff',
  },
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
  primaryButton: {
    backgroundColor: isDark ? colors.accent : '#ffffff',
    shadowColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#000',
    shadowOpacity: isDark ? 0.3 : 0.25,
  },
  buttonText: {
    color: isDark ? '#ffffff' : '#1a237e',
  },
  secondaryButton: {
    borderColor: '#ffffff',
  },
  secondaryButtonText: {
    color: '#ffffff',
  },
  message: {
    color: '#ffffff',
  },
  errorMessage: {
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
  },
  successMessage: {
    backgroundColor: 'rgba(46, 125, 50, 0.9)',
  },
  errorText: {
    color: isDark ? '#ff8a80' : '#ff6b6b',
  },
  smallText: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
}); 