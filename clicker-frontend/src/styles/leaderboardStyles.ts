import { StyleSheet } from 'react-native';
import { ThemeColors } from './theme';

// Base styles that don't change with theme
export const leaderboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  leaderboardList: {
    marginBottom: 20,
  },

  // Podium related styles
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 180,
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  podiumPlace: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  firstPlace: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 3,
  },
  secondPlace: {
    width: 80,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2,
  },
  thirdPlace: {
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 1,
  },
  podiumUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  podiumScore: {
    fontSize: 12,
    fontWeight: '500',
  },
  medalContainer: {
    position: 'absolute',
    top: -15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  // Regular list styles
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
    padding: 10,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  emptyListText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 20,
  },

  // User rank styles
  userRankContainer: {
    marginTop: 25,
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
  },
  userRankTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  userRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
  },
  userRankNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15,
    minWidth: 50,
    textAlign: 'center',
  },
  userRankInfo: {
    flex: 1,
  },
  userRankUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRankScore: {
    fontSize: 14,
    marginTop: 3,
  },
});

// Function to get theme-aware styles
export const getLeaderboardThemedStyles = (colors: ThemeColors, isDark: boolean) => ({
  container: {
    backgroundColor: colors.background,
  },
  sectionHeader: {
    color: isDark ? '#90caf9' : colors.primary,
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
  },
  emptyListText: {
    color: colors.subtitle,
  },
  podiumContainer: {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 10,
  },
  firstPlace: {
    backgroundColor: colors.podiumGold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDark ? 0.6 : 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  secondPlace: {
    backgroundColor: colors.podiumSilver,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.5 : 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  thirdPlace: {
    backgroundColor: colors.podiumBronze,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.4 : 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  podiumUsername: {
    color: colors.podiumText,
  },
  podiumScore: {
    color: colors.podiumText,
  },
  medalContainer: {
    backgroundColor: isDark ? '#2d2d2d' : 'white',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  userRankContainer: {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  },
  userRankTitle: {
    color: isDark ? '#90caf9' : colors.primary,
  },
  userRankCard: {
    backgroundColor: isDark ? '#2d2d2d' : '#f1f1f1',
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.5 : 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  userRankNumber: {
    color: isDark ? '#f48fb1' : colors.accent,
  },
  userRankUsername: {
    color: colors.text,
  },
  userRankScore: {
    color: isDark ? '#bbbbbb' : colors.subtitle,
  },
});
