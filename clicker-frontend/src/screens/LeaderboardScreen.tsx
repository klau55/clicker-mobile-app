import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LeaderboardEntry, User } from '../types';
import { styles, leaderboardStyles } from '../styles';
import { fetchAllTimeLeaderboard } from '../api/userApi';

interface LeaderboardScreenProps {
  navigation: any;
  user?: User; // Optional user prop to show their rank
}

export function LeaderboardScreen({ navigation, user }: LeaderboardScreenProps) {
  const [allTimeLeaders, setAllTimeLeaders] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboards = async () => {
    setMessage('');
    setIsLoading(true);
    try {
      // Get all-time leaderboard
      const allTime = await fetchAllTimeLeaderboard();
      setAllTimeLeaders(allTime);
      
      // Find current user's rank if user is provided
      if (user) {
        const userPosition = allTime.findIndex(entry => entry.username === user.username);
        if (userPosition !== -1) {
          setUserRank(userPosition + 1); // +1 because array indices start at 0
        }
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

  // Component for the medal icons
  const MedalIcon = ({ position }: { position: number }) => {
    let iconName: "medal" | "medal-outline" = "medal";
    let color = "#cd7f32"; // Bronze default
    
    if (position === 1) {
      color = "#ffd700"; // Gold
    } else if (position === 2) {
      color = "#c0c0c0"; // Silver
    }
    
    return (
      <View style={leaderboardStyles.medalContainer}>
        <MaterialCommunityIcons name={iconName} size={22} color={color} />
      </View>
    );
  };

  // Component for the podium display of top 3 players
  const Podium = ({ leaders }: { leaders: LeaderboardEntry[] }) => {
    const hasLeaders = leaders.length > 0;
    const first = hasLeaders && leaders.length > 0 ? leaders[0] : null;
    const second = hasLeaders && leaders.length > 1 ? leaders[1] : null;
    const third = hasLeaders && leaders.length > 2 ? leaders[2] : null;
    
    return (
      <View style={leaderboardStyles.podiumContainer}>
        {/* Second Place */}
        <View style={leaderboardStyles.podiumPlace}>
          {second && (
            <>
              <View style={leaderboardStyles.secondPlace}>
                <MedalIcon position={2} />
                <Text style={leaderboardStyles.podiumUsername} numberOfLines={1}>
                  {second.username}
                </Text>
                <Text style={leaderboardStyles.podiumScore}>
                  {second.total_taps} punches
                </Text>
              </View>
            </>
          )}
        </View>
        
        {/* First Place */}
        <View style={leaderboardStyles.podiumPlace}>
          {first && (
            <>
              <View style={leaderboardStyles.firstPlace}>
                <MedalIcon position={1} />
                <Text style={leaderboardStyles.podiumUsername} numberOfLines={1}>
                  {first.username}
                </Text>
                <Text style={leaderboardStyles.podiumScore}>
                  {first.total_taps} punches
                </Text>
              </View>
            </>
          )}
        </View>
        
        {/* Third Place */}
        <View style={leaderboardStyles.podiumPlace}>
          {third && (
            <>
              <View style={leaderboardStyles.thirdPlace}>
                <MedalIcon position={3} />
                <Text style={leaderboardStyles.podiumUsername} numberOfLines={1}>
                  {third.username}
                </Text>
                <Text style={leaderboardStyles.podiumScore}>
                  {third.total_taps} punches
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  // Component for displaying user's own rank
  const UserRankCard = () => {
    if (!user || !userRank) {
      return null;
    }
    
    // Get the user entry from the leaderboard data
    const userEntry = allTimeLeaders.find(entry => entry.username === user.username);
    if (!userEntry) {
      return null;
    }
    
    return (
      <View style={leaderboardStyles.userRankContainer}>
        <Text style={leaderboardStyles.userRankTitle}>Your Ranking</Text>
        <View style={leaderboardStyles.userRankCard}>
          <Text style={leaderboardStyles.userRankNumber}>#{userRank}</Text>
          <View style={leaderboardStyles.userRankInfo}>
            <Text style={leaderboardStyles.userRankUsername}>{user.username}</Text>
            <Text style={leaderboardStyles.userRankScore}>{userEntry.total_taps} punches</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, leaderboardStyles.container]}>
      <Text style={styles.title}>Leaderboard</Text>
      
      {message ? <Text style={styles.message}>{message}</Text> : null}
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#1a237e" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* All-time Champions Section */}
          <Text style={leaderboardStyles.sectionHeader}>All-time Champions</Text>
          
          {allTimeLeaders.length === 0 ? (
            <Text style={leaderboardStyles.emptyListText}>No records found</Text>
          ) : (
            <>
              <Podium leaders={allTimeLeaders.slice(0, 3)} />
              <UserRankCard />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
} 