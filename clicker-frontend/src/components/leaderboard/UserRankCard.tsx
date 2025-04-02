import React from 'react';
import { View, Text } from 'react-native';
import { UserRankCardProps } from '../../types';
import { leaderboardStyles, getLeaderboardThemedStyles } from '../../styles';
import { useTheme } from '../../context/ThemeContext';
import { getThemeColors } from '../../styles/theme';

export const UserRankCard = ({ user, userRank, userEntry }: UserRankCardProps) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getLeaderboardThemedStyles(colors, isDark);

  if (!user || !userRank || !userEntry) {
    return null;
  }

  return (
    <View style={{ ...leaderboardStyles.userRankContainer, ...themedStyles.userRankContainer }}>
      <Text style={{ ...leaderboardStyles.userRankTitle, ...themedStyles.userRankTitle }}>
        Your Ranking
      </Text>
      <View style={{ ...leaderboardStyles.userRankCard, ...themedStyles.userRankCard }}>
        <Text style={{ ...leaderboardStyles.userRankNumber, ...themedStyles.userRankNumber }}>
          #{userRank}
        </Text>
        <View style={leaderboardStyles.userRankInfo}>
          <Text style={{ ...leaderboardStyles.userRankUsername, ...themedStyles.userRankUsername }}>
            {user.username}
          </Text>
          <Text style={{ ...leaderboardStyles.userRankScore, ...themedStyles.userRankScore }}>
            {userEntry.total_taps} punches
          </Text>
        </View>
      </View>
    </View>
  );
};
