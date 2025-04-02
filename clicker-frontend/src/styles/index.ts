import { StyleSheet } from 'react-native';
export { homeStyles } from './homeStyles';
export { leaderboardStyles, getLeaderboardThemedStyles } from './leaderboardStyles';
export { settingsStyles, getSettingsThemedStyles } from './settingsStyles';
export { authStyles, getAuthThemedStyles } from './authStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  button: {
    marginVertical: 8,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  settingsButtonContainer: {
    marginTop: 30,
    width: '100%',
  },
  message: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'red',
    textAlign: 'center',
  },
  leaderboard: {
    flex: 1,
    marginVertical: 15,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  leaderboardItem: {
    marginBottom: 4,
    fontSize: 16,
  },
  clickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  boxerImage: {
    width: 250,
    height: 220,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  loadingText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 20,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
  settingsGroup: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingsDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  currentUrlText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
  smallText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  stylePickerContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  stylePickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  styleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  styleButtonActive: {
    backgroundColor: '#e91e63',
    borderColor: '#c2185b',
  },
  styleButtonText: {
    fontSize: 16,
    color: '#333',
  },
  styleButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
});
