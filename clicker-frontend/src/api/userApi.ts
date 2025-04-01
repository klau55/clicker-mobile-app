import axios from 'axios';
import { User, LeaderboardEntry } from '../types';
import { BASE_URL } from '../constants';

/**
 * Sends a tap to the server and returns the updated tap count
 */
export const sendTap = async (username: string): Promise<{ username: string, total_taps: number }> => {
  const response = await axios.post(`${BASE_URL}/api/tap`, { username });
  return response.data;
};

/**
 * Updates the user state with the new tap count
 */
export const updateUserTaps = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>, 
  total_taps: number
): void => {
  setUser((prev: User | null) => prev ? { ...prev, total_taps } : prev);
};

/**
 * Fetches the all-time leaderboard
 */
export const fetchAllTimeLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const response = await axios.get(`${BASE_URL}/api/leaderboard`);
  return response.data;
};