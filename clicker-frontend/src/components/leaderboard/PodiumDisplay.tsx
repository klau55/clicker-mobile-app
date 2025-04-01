import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PodiumDisplayProps } from '../../types';
import { leaderboardStyles, getLeaderboardThemedStyles } from '../../styles';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';

// Component for the medal icons
const MedalIcon = ({ position }: { position: number }) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getLeaderboardThemedStyles(colors, isDark);
  
  let iconName: "medal" | "medal-outline" = "medal";
  let color = colors.podiumBronze; // Bronze default
  
  if (position === 1) {
    color = colors.podiumGold; // Gold
  } else if (position === 2) {
    color = colors.podiumSilver; // Silver
  }
  
  return (
    <View style={{...leaderboardStyles.medalContainer, ...themedStyles.medalContainer}}>
      <MaterialCommunityIcons name={iconName} size={22} color={color} />
    </View>
  );
};

export const PodiumDisplay = ({ leaders }: PodiumDisplayProps) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getLeaderboardThemedStyles(colors, isDark);
  
  const hasLeaders = leaders.length > 0;
  const first = hasLeaders && leaders.length > 0 ? leaders[0] : null;
  const second = hasLeaders && leaders.length > 1 ? leaders[1] : null;
  const third = hasLeaders && leaders.length > 2 ? leaders[2] : null;
  
  return (
    <View style={{...leaderboardStyles.podiumContainer, ...themedStyles.podiumContainer}}>
      {/* Second Place */}
      <View style={leaderboardStyles.podiumPlace}>
        {second && (
          <>
            <View style={{...leaderboardStyles.secondPlace, ...themedStyles.secondPlace}}>
              <MedalIcon position={2} />
              <Text style={{...leaderboardStyles.podiumUsername, ...themedStyles.podiumUsername}} numberOfLines={1}>
                {second.username}
              </Text>
              <Text style={{...leaderboardStyles.podiumScore, ...themedStyles.podiumScore}}>
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
            <View style={{...leaderboardStyles.firstPlace, ...themedStyles.firstPlace}}>
              <MedalIcon position={1} />
              <Text style={{...leaderboardStyles.podiumUsername, ...themedStyles.podiumUsername}} numberOfLines={1}>
                {first.username}
              </Text>
              <Text style={{...leaderboardStyles.podiumScore, ...themedStyles.podiumScore}}>
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
            <View style={{...leaderboardStyles.thirdPlace, ...themedStyles.thirdPlace}}>
              <MedalIcon position={3} />
              <Text style={{...leaderboardStyles.podiumUsername, ...themedStyles.podiumUsername}} numberOfLines={1}>
                {third.username}
              </Text>
              <Text style={{...leaderboardStyles.podiumScore, ...themedStyles.podiumScore}}>
                {third.total_taps} punches
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}; 