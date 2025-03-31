// App.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// For Android emulator, 10.0.2.2 points to your computer's localhost
const BASE_URL = 'http://10.0.2.2:3000';
console.log('Using backend URL:', BASE_URL);

interface User {
  id: number;
  username: string;
  total_taps: number;
}

interface LeaderboardEntry {
  username: string;
  total_taps: number;
}

type UserSetterType = React.Dispatch<React.SetStateAction<User | null>>;

type FightStyle = 'punch' | 'kick' | 'rightPunch' | 'rightHook';

const Tab = createBottomTabNavigator();

// Home Screen - Boxing Clicker
function HomeScreen({ user, setUser }: { user: User; setUser: UserSetterType }) {
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [fightStyle, setFightStyle] = useState<FightStyle>('punch');

  const handleTap = async () => {
    setMessage('');
    if (!user) {
      setMessage('Please log in first.');
      return;
    }

    // Start animation
    setIsAnimating(true);

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 150); // 150ms is a good duration for a quick animation

    try {
      // Send tap to server
      const response = await axios.post(`${BASE_URL}/api/tap`, {
        username: user.username,
      });
      if (response.data?.total_taps != null) {
        // Update local user state with new total_taps
        setUser((prev: User | null) =>
          prev ? { ...prev, total_taps: response.data.total_taps } : prev
        );
      }
    } catch (error: any) {
      console.log('Tap error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Tap failed');
    }
  };

  // Get the appropriate image based on the current style and animation state
  const getImageSource = () => {
    if (!isAnimating) {
      return require('./assets/idle.png');
    }
    
    // Show the active animation image based on selected style
    switch (fightStyle) {
      case 'punch':
        return require('./assets/left-punch.png');
      case 'kick':
        return require('./assets/kick.png');
      case 'rightPunch':
        return require('./assets/right-punch.png');
      case 'rightHook':
        return require('./assets/right-hook.png');
      default:
        return require('./assets/idle.png');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boxing Center</Text>
      <Text style={styles.subtitle}>Welcome, {user.username}!</Text>
      <Text style={styles.subtitle}>Your total taps: {user.total_taps}</Text>

      <View style={styles.stylePickerContainer}>
        <Text style={styles.stylePickerLabel}>Choose what to practice:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[
              styles.styleButton, 
              fightStyle === 'punch' && styles.styleButtonActive
            ]} 
            onPress={() => setFightStyle('punch')}
          >
            <Text style={[
              styles.styleButtonText, 
              fightStyle === 'punch' && styles.styleButtonTextActive
            ]}>
              Left Punch
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.styleButton, 
              fightStyle === 'rightPunch' && styles.styleButtonActive
            ]} 
            onPress={() => setFightStyle('rightPunch')}
          >
            <Text style={[
              styles.styleButtonText, 
              fightStyle === 'rightPunch' && styles.styleButtonTextActive
            ]}>
              Right Punch
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[
              styles.styleButton, 
              fightStyle === 'kick' && styles.styleButtonActive
            ]} 
            onPress={() => setFightStyle('kick')}
          >
            <Text style={[
              styles.styleButtonText, 
              fightStyle === 'kick' && styles.styleButtonTextActive
            ]}>
              Kick
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.styleButton, 
              fightStyle === 'rightHook' && styles.styleButtonActive
            ]} 
            onPress={() => setFightStyle('rightHook')}
          >
            <Text style={[
              styles.styleButtonText, 
              fightStyle === 'rightHook' && styles.styleButtonTextActive
            ]}>
              Right Hook
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.clickerContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleTap}>
          <Image 
            source={getImageSource()}
            style={styles.boxerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

// Leaderboard Screen
function LeaderboardScreen({ navigation }: { navigation: any }) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setMessage('');
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/leaderboard`);
      if (Array.isArray(response.data)) {
        setLeaderboard(response.data);
      }
    } catch (error: any) {
      console.log('Leaderboard error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Load leaderboard on screen mount and when tab is focused
  useEffect(() => {
    fetchLeaderboard();
    
    // Add listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLeaderboard();
    });

    // Clean up the listener when component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <ScrollView style={styles.leaderboard}>
        {leaderboard.length > 0 && <Text style={styles.leaderboardTitle}>Top Boxers</Text>}
        {leaderboard.map((item, index) => (
          <Text key={index} style={styles.leaderboardItem}>
            {index + 1}. {item.username} — {item.total_taps} punches
          </Text>
        ))}
        {leaderboard.length === 0 && !isLoading && (
          <Text style={styles.emptyText}>No records found</Text>
        )}
      </ScrollView>
    </View>
  );
}

// Settings Screen
function SettingsScreen({ setUser }: { setUser: UserSetterType }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingsGroup}>
        <Text style={styles.settingsTitle}>Server Information</Text>
        <Text style={styles.settingsDescription}>
          This app is configured to connect to:
          {'\n'}{BASE_URL}
          {'\n\n'}This is the correct address for the Android emulator.
        </Text>
      </View>
      
      <View style={styles.settingsButtonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

// Auth Screen - Login/Register
function AuthScreen({ setUser }: { setUser: UserSetterType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Check if username is available
  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim()) return;
    
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/check-username`, {
        params: { username }
      });
      
      if (response.data.exists) {
        setMessage(`Username '${username}' is already taken`);
      } else {
        setMessage(`Username '${username}' is available`);
      }
    } catch (error: any) {
      console.log('Username check error:', error);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleRegister = async () => {
    setMessage('');
    
    // Add validation
    if (!username.trim()) {
      setMessage('Username is required');
      return;
    }
    
    if (!password.trim()) {
      setMessage('Password is required');
      return;
    }
    
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        username,
        password,
      });
      if (response.data?.user) {
        setMessage('Registration successful! Please log in.');
      }
    } catch (error: any) {
      console.log('Register error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async () => {
    setMessage('');
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        username,
        password,
      });
      if (response.data?.user) {
        setUser(response.data.user);
        setMessage('Login successful!');
      }
    } catch (error: any) {
      console.log('Login error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boxing Clicker</Text>
      <Text style={styles.smallText}>Server: {BASE_URL}</Text>
      
      {showRegister ? (
        <>
          <Text style={styles.subtitle}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            onBlur={() => checkUsernameAvailability(username)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title="Register" onPress={handleRegister} />
          <Button
            title="Go to Login"
            onPress={() => {
              setShowRegister(false);
              setMessage('');
            }}
          />
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button
            title="Go to Register"
            onPress={() => {
              setShowRegister(true);
              setMessage('');
            }}
          />
        </>
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <AuthScreen setUser={setUser} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
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
          {props => <LeaderboardScreen {...props} />}
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

const styles = StyleSheet.create({
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
  }
});
