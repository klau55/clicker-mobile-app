import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FightStyle, HomeScreenProps } from '../types';
import { styles, homeStyles } from '../styles';
import { getImageSource, getMoveColor } from '../utils/fightUtils';
import { sendTap, updateUserTaps } from '../api/userApi';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/theme';

export const HomeScreen = ({ user, setUser }: HomeScreenProps) => {
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMove, setCurrentMove] = useState<FightStyle>('punch');
  const [combo, setCombo] = useState<number>(0);
  const [comboTimeout, setComboTimeout] = useState<NodeJS.Timeout | null>(null);
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  const performMove = async (moveType: FightStyle) => {
    setMessage('');
    if (!user) {
      setMessage('Please log in first.');
      return;
    }

    setCurrentMove(moveType);
    setIsAnimating(true);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 150);

    // Handle combo counter
    if (comboTimeout) {
      clearTimeout(comboTimeout);
    }
    
    setCombo(prev => prev + 1);
    
    const timeout = setTimeout(() => {
      setCombo(0);
    }, 2000);
    
    setComboTimeout(timeout);

    // Send the tap to the server
    try {
      const response = await sendTap(user.username);
      if (response.total_taps != null) {
        updateUserTaps(setUser, response.total_taps);
      }
    } catch (error: any) {
      console.log('Tap error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Tap failed');
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (comboTimeout) {
        clearTimeout(comboTimeout);
      }
    };
  }, [comboTimeout]);

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Text style={{...styles.title, color: colors.text}}>Boxing Center</Text>
      <Text style={{...styles.subtitle, color: colors.subtitle}}>Welcome, {user.username}!</Text>
      
      <View style={homeStyles.statsContainer}>
        <View style={{...homeStyles.statItem, backgroundColor: colors.statsBg}}>
          <Text style={{...homeStyles.statLabel, color: colors.statsLabel}}>TOTAL PUNCHES</Text>
          <Text style={{...homeStyles.statValue, color: colors.statsValue}}>{user.total_taps}</Text>
        </View>
        
        {combo > 0 && (
          <View style={homeStyles.comboContainer}>
            <Text style={homeStyles.comboText}>{combo}x COMBO!</Text>
          </View>
        )}
      </View>

      <View style={homeStyles.boxerContainer}>
        <Image 
          source={getImageSource(isAnimating, currentMove)}
          style={homeStyles.boxerImage}
          resizeMode="contain"
        />
      </View>

      <View>
        <Text style={{...homeStyles.controlsTitle, color: colors.statsLabel}}>TRAINING CONTROLS</Text>
        
        <View style={homeStyles.moveButtonsContainer}>
          <TouchableOpacity 
            style={[homeStyles.moveButton, { backgroundColor: getMoveColor('punch') }]}
            onPress={() => performMove('punch')}
            activeOpacity={0.7}
          >
            <Text style={homeStyles.moveButtonText}>LEFT PUNCH</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[homeStyles.moveButton, { backgroundColor: getMoveColor('rightPunch') }]}
            onPress={() => performMove('rightPunch')}
            activeOpacity={0.7}
          >
            <Text style={homeStyles.moveButtonText}>RIGHT PUNCH</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[homeStyles.kickButton, { backgroundColor: getMoveColor('kick') }]}
          onPress={() => performMove('kick')}
          activeOpacity={0.7}
        >
          <Text style={homeStyles.moveButtonText}>KICK</Text>
        </TouchableOpacity>
      </View>

      {message ? <Text style={{...styles.message, color: colors.error}}>{message}</Text> : null}
    </View>
  );
} 