import { StyleSheet } from 'react-native';

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
    color: '#1a237e',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
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
    backgroundColor: '#ffd700', // Gold
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 3,
    elevation: 4,
  },
  secondPlace: {
    backgroundColor: '#c0c0c0', // Silver
    width: 80,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2,
    elevation: 3,
  },
  thirdPlace: {
    backgroundColor: '#cd7f32', // Bronze
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 1,
    elevation: 2,
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  
  // Regular list styles
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
    color: '#1a237e',
  },
  emptyListText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginVertical: 20,
  },

  // User rank styles
  userRankContainer: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  userRankTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 10,
    textAlign: 'center',
  },
  userRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userRankNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e91e63',
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
    color: '#333',
  },
  userRankScore: {
    fontSize: 14,
    marginTop: 3,
    color: '#666',
  },
}); 