// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from './src/types';
import { HomeScreen } from './src/screens/HomeScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { StatusBar } from 'react-native';
import { getThemeColors } from './src/styles/theme';

const Tab = createBottomTabNavigator();

const MainApp = ({ user, setUser }: { user: User, setUser: React.Dispatch<React.SetStateAction<User | null>> }) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  
  return (
    <NavigationContainer>
      <StatusBar 
        backgroundColor={isDark ? '#121212' : '#1a237e'} 
        barStyle={isDark ? "light-content" : "light-content"} 
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.subtitle,
          tabBarStyle: {
            backgroundColor: colors.navBackground,
            borderTopColor: colors.navBorder,
          },
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      >
        <Tab.Screen 
          name="Home" 
          options={{ 
            title: 'Home',
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        >
          {props => <HomeScreen {...props} user={user} setUser={setUser} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="Leaderboard" 
          options={{ 
            title: 'Leaderboard',
            tabBarLabel: 'Leaderboard',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="trophy" color={color} size={size} />
            ),
          }}
        >
          {props => <LeaderboardScreen {...props} user={user} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="Settings" 
          options={{ 
            title: 'Settings',
            tabBarLabel: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        >
          {props => <SettingsScreen {...props} setUser={setUser} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <ThemeProvider>
      {!user ? (
        <AuthScreen setUser={setUser} />
      ) : (
        <MainApp user={user} setUser={setUser} />
      )}
    </ThemeProvider>
  );
}

export default App;