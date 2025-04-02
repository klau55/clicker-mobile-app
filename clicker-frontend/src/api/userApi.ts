import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { User, LeaderboardEntry } from '../types';

/**
 * Sends a tap to the server and returns the updated tap count
 */
export const sendTap = async (
  username: string
): Promise<{ username: string; total_taps: number }> => {
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
  setUser((prev: User | null) => (prev ? { ...prev, total_taps } : prev));
};

/**
 * Fetches the all-time leaderboard
 * @param username Optional username to get a specific user's rank
 */
export const fetchAllTimeLeaderboard = async (
  username?: string
): Promise<{
  data: LeaderboardEntry[];
  userRank?: number;
}> => {
  try {
    const response = await axios.get<{
      data: LeaderboardEntry[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
      };
      userRank?: number;
    }>(`${BASE_URL}/api/leaderboard`, {
      params: {
        limit: 100,
        username,
      },
    });

    return {
      data: response.data.data,
      userRank: response.data.userRank,
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};
