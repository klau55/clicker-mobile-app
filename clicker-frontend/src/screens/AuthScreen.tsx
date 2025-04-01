import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import axios, { AxiosError } from 'axios';
import { UserSetterType, ApiError, AuthRequest, AuthResponse } from '../types';
import { authStyles } from '../styles/authStyles';
import { BASE_URL } from '../constants';

interface AuthScreenProps {
  setUser: UserSetterType;
}

interface ValidationErrors {
  username?: string;
  password?: string;
}

interface ErrorResponse {
  message: string;
}

export function AuthScreen({ setUser }: AuthScreenProps) {
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  
  // Clear message when switching between login and register
  useEffect(() => {
    setMessage('');
    setIsSuccessMessage(false);
    setErrors({});
  }, [showRegister]);
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle field blur for validation
  const handleBlur = (field: string) => {
    setTouched({...touched, [field]: true});
    validateForm();
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim() || username.length < 3) return;
    
    setIsCheckingUsername(true);
    try {
      const response = await axios.get<{username: string, exists: boolean}>(`${BASE_URL}/api/check-username`, {
        params: { username }
      });
      
      if (response.data.exists) {
        setMessage(`Username '${username}' is already taken`);
        setIsSuccessMessage(false);
      } else {
        setMessage(`Username '${username}' is available`);
        setIsSuccessMessage(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log('Username check error:', err.message);
      // Don't show error to user for this check
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleRegister = async () => {
    setMessage('');
    setIsSuccessMessage(false);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const requestData: AuthRequest = { username, password };
      const response = await axios.post<AuthResponse>(`${BASE_URL}/api/register`, requestData);
      
      if (response.data?.user) {
        // Automatically log in after successful registration
        const loginResponse = await axios.post<AuthResponse>(`${BASE_URL}/api/login`, requestData);
        
        if (loginResponse.data?.user) {
          setMessage('Registration successful! Welcome to Boxing Clicker!');
          setIsSuccessMessage(true);
          
          // Wait 1 second before transitioning to main screen
          setTimeout(() => {
            setUser(loginResponse.data.user);
          }, 2000);
        }
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.log('Register error:', err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Registration failed. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    setMessage('');
    setIsSuccessMessage(false);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const requestData: AuthRequest = { username, password };
      const response = await axios.post<AuthResponse>(`${BASE_URL}/api/login`, requestData);
      
      if (response.data?.user) {
        setUser(response.data.user);
        setMessage('Login successful!');
        setIsSuccessMessage(true);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.log('Login error:', err.response?.data || err.message);
      
      if (err.response?.status === 429) {
        setMessage('Too many login attempts. Please try again later.');
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle network errors
  const handleConnectionError = () => {
    Alert.alert(
      "Connection Error",
      `Unable to connect to the server at ${BASE_URL}. Please check your internet connection and try again.`,
      [{ text: "OK" }]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={authStyles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={authStyles.contentContainer}>
          <Text style={authStyles.title}>Boxing Clicker</Text>
          <Text style={authStyles.smallText}>Server: {BASE_URL}</Text>
          
          <View style={authStyles.card}>
            {showRegister ? (
              <>
                <Text style={authStyles.subtitle}>Create Account</Text>
                <TextInput
                  style={[
                    authStyles.input,
                    touched.username && errors.username ? { borderColor: '#ff6b6b' } : {}
                  ]}
                  placeholder="Username"
                  placeholderTextColor="#1a237e"
                  onChangeText={setUsername}
                  onBlur={() => {
                    handleBlur('username');
                    if (username.trim() && username.length >= 3) {
                      checkUsernameAvailability(username);
                    }
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
                {touched.username && errors.username ? 
                  <Text style={authStyles.errorText}>{errors.username}</Text> : null}
                  
                <TextInput
                  style={[
                    authStyles.input,
                    touched.password && errors.password ? { borderColor: '#ff6b6b' } : {}
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#1a237e"
                  secureTextEntry
                  onChangeText={setPassword}
                  onBlur={() => handleBlur('password')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
                {touched.password && errors.password ? 
                  <Text style={authStyles.errorText}>{errors.password}</Text> : null}
                
                <TouchableOpacity 
                  style={[
                    authStyles.primaryButton,
                    isSubmitting ? authStyles.disabledButton : {}
                  ]}
                  onPress={handleRegister}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#1a237e" size="small" />
                  ) : (
                    <Text style={authStyles.buttonText}>Register</Text>
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={authStyles.secondaryButton}
                  onPress={() => {
                    setShowRegister(false);
                    setMessage('');
                    setIsSuccessMessage(false);
                    setTouched({});
                  }}
                  disabled={isSubmitting}
                >
                  <Text style={authStyles.secondaryButtonText}>
                    Already have an account? Login
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={authStyles.subtitle}>Welcome Back</Text>
                <TextInput
                  style={[
                    authStyles.input,
                    touched.username && errors.username ? { borderColor: '#ff6b6b' } : {}
                  ]}
                  placeholder="Username"
                  placeholderTextColor="#1a237e"
                  onChangeText={setUsername}
                  onBlur={() => handleBlur('username')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
                {touched.username && errors.username ? 
                  <Text style={authStyles.errorText}>{errors.username}</Text> : null}
                  
                <TextInput
                  style={[
                    authStyles.input,
                    touched.password && errors.password ? { borderColor: '#ff6b6b' } : {}
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#1a237e"
                  secureTextEntry
                  onChangeText={setPassword}
                  onBlur={() => handleBlur('password')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
                {touched.password && errors.password ? 
                  <Text style={authStyles.errorText}>{errors.password}</Text> : null}
                  
                <TouchableOpacity 
                  style={[
                    authStyles.primaryButton,
                    isSubmitting ? authStyles.disabledButton : {}
                  ]}
                  onPress={handleLogin}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#1a237e" size="small" />
                  ) : (
                    <Text style={authStyles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={authStyles.secondaryButton}
                  onPress={() => {
                    setShowRegister(true);
                    setMessage('');
                    setIsSuccessMessage(false);
                    setTouched({});
                  }}
                  disabled={isSubmitting}
                >
                  <Text style={authStyles.secondaryButtonText}>
                    Don't have an account? Register
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {message ? (
            <Text style={[
              authStyles.message,
              isSuccessMessage && authStyles.successMessage
            ]}>
              {message}
            </Text>
          ) : null}
          
          {isCheckingUsername && (
            <Text style={authStyles.smallText}>Checking username availability...</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 