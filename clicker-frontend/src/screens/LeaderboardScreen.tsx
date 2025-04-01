import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { LeaderboardEntry, LeaderboardScreenProps } from '../types';
import { styles, leaderboardStyles, getLeaderboardThemedStyles } from '../styles';
import { fetchAllTimeLeaderboard } from '../api/userApi';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/theme';
import { PodiumDisplay, UserRankCard } from '../components';

export const LeaderboardScreen = ({ navigation, user }: LeaderboardScreenProps) => {
  const [allTimeLeaders, setAllTimeLeaders] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getLeaderboardThemedStyles(colors, isDark);

  const fetchLeaderboards = async () => {
    setMessage('');
    setIsLoading(true);
    try {
      const allTime = await fetchAllTimeLeaderboard(user?.username);
      setAllTimeLeaders(allTime.data);
      
      if (allTime.userRank) {
        setUserRank(allTime.userRank);
      }
    } catch (error: any) {
      console.log('Leaderboard error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboards();
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLeaderboards();
    });

    return unsubscribe;
  }, [navigation, user?.username]);

  const userEntry = user && allTimeLeaders.find(entry => entry.username === user.username);

  return (
    <View style={{
      ...styles.container, 
      ...leaderboardStyles.container,
      ...themedStyles.container
    }}>
      <Text style={{...styles.title, color: colors.text}}>Leaderboard</Text>
      
      {message ? <Text style={{...styles.message, color: colors.error}}>{message}</Text> : null}
      
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* All-time Champions Section */}
          <Text style={{
            ...leaderboardStyles.sectionHeader, 
            ...themedStyles.sectionHeader
          }}>All-time Champions</Text>
          
          {allTimeLeaders.length === 0 ? (
            <Text style={{...leaderboardStyles.emptyListText, ...themedStyles.emptyListText}}>No records found</Text>
          ) : (
            <>
              <PodiumDisplay leaders={allTimeLeaders.slice(0, 3)} />
              {user && userRank && userEntry && (
                <UserRankCard 
                  user={user} 
                  userRank={userRank} 
                  userEntry={userEntry}
                />
              )}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
} 