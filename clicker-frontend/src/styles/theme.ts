// Theme colors for light and dark mode
export const lightTheme = {
  // Base
  background: '#ffffff',
  text: '#333333',
  subtitle: '#555555',

  // Components
  card: '#f8f8f8',
  cardBorder: '#e0e0e0',
  settingsGroupBg: '#f8f8f8',
  settingsGroupBorder: '#ddd',

  // Interactive
  primary: '#1a237e',
  accent: '#e91e63',
  success: '#4caf50',
  error: '#f44336',

  // Input
  inputBg: '#ffffff',
  inputText: '#333333',
  inputBorder: '#cccccc',

  // Stats
  statsBg: 'rgba(0, 0, 0, 0.05)',
  statsLabel: '#666666',
  statsValue: '#1a237e',

  // Podium
  podiumGold: '#ffd700',
  podiumSilver: '#c0c0c0',
  podiumBronze: '#cd7f32',
  podiumText: '#333333',

  // Others
  navBackground: '#ffffff',
  navBorder: '#e0e0e0',
  divider: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  // Base
  background: '#121212',
  text: '#e0e0e0',
  subtitle: '#b0b0b0',

  // Components
  card: '#1e1e1e',
  cardBorder: '#333333',
  settingsGroupBg: '#1e1e1e',
  settingsGroupBorder: '#333333',

  // Interactive
  primary: '#3949ab',
  accent: '#f06292',
  success: '#66bb6a',
  error: '#e57373',

  // Input
  inputBg: '#2c2c2c',
  inputText: '#e0e0e0',
  inputBorder: '#444444',

  // Stats
  statsBg: 'rgba(255, 255, 255, 0.1)',
  statsLabel: '#b0b0b0',
  statsValue: '#90caf9',

  // Podium
  podiumGold: '#ffb300',
  podiumSilver: '#bdbdbd',
  podiumBronze: '#a1887f',
  podiumText: '#ffffff',

  // Others
  navBackground: '#1e1e1e',
  navBorder: '#333333',
  divider: '#333333',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export type ThemeColors = typeof lightTheme;

// Helper function to get current theme colors
export const getThemeColors = (isDark: boolean): ThemeColors => {
  return isDark ? darkTheme : lightTheme;
};
