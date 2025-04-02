import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ValidationErrors, AuthScreenProps } from '../types';
import { authStyles, getAuthThemedStyles } from '../styles';
import { BASE_URL } from '../constants/constants';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/theme';
import { FormInput, Button } from '../components';
import { validateAuthForm, loginUser, registerUser } from '../utils/authUtils';

export const AuthScreen = ({ setUser }: AuthScreenProps) => {
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  // Validation state
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  // Refs for input fields
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Theme
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const themedStyles = getAuthThemedStyles(colors, isDark);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setErrors({});
    setShowErrors(false);
    setMessage('');
    setIsSuccessMessage(false);

    if (usernameRef.current) {
      usernameRef.current.clear();
    }

    if (passwordRef.current) {
      passwordRef.current.clear();
    }
  }, [showRegister]);

  const validateForm = (): boolean => {
    const validationErrors = validateAuthForm(username, password);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = async () => {
    setMessage('');
    setIsSuccessMessage(false);
    setShowErrors(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerUser(username, password);

      if (result.user) {
        setMessage('Registration successful! Welcome to Boxing Clicker!');
        setIsSuccessMessage(true);

        setTimeout(() => {
          if (result.user) {
            setUser(result.user);
          }
        }, 1500);
      } else {
        setMessage(result.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    setMessage('');
    setIsSuccessMessage(false);
    setShowErrors(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await loginUser(username, password);

      if (result.user) {
        setUser(result.user);
        setMessage('Login successful!');
        setIsSuccessMessage(true);
      } else {
        setMessage(result.message || 'Login failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ ...authStyles.container, ...themedStyles.container }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={authStyles.contentContainer}>
          <Text style={{ ...authStyles.title, ...themedStyles.title }}>Boxing Clicker</Text>
          <Text style={{ ...authStyles.smallText, ...themedStyles.smallText }}>
            Server: {BASE_URL}
          </Text>

          <View style={{ ...authStyles.card, ...themedStyles.card }}>
            {showRegister ? (
              <>
                <Text style={{ ...authStyles.subtitle, ...themedStyles.subtitle }}>
                  Create Account
                </Text>

                <FormInput
                  ref={usernameRef}
                  placeholder="Username"
                  onChangeText={setUsername}
                  defaultValue=""
                  editable={!isSubmitting}
                  error={errors.username}
                  showError={showErrors}
                  themedStyles={themedStyles}
                />

                <FormInput
                  ref={passwordRef}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={setPassword}
                  defaultValue=""
                  editable={!isSubmitting}
                  error={errors.password}
                  showError={showErrors}
                  themedStyles={themedStyles}
                />

                <View style={authStyles.buttonContainer}>
                  <Button
                    title="Create Account"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onPress={handleRegister}
                    themedStyles={themedStyles}
                  />

                  <Button
                    title="Back to Login"
                    secondary
                    disabled={isSubmitting}
                    onPress={toggleRegister}
                    themedStyles={themedStyles}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={{ ...authStyles.subtitle, ...themedStyles.subtitle }}>
                  Welcome Back
                </Text>

                <FormInput
                  ref={usernameRef}
                  placeholder="Username"
                  onChangeText={setUsername}
                  defaultValue=""
                  editable={!isSubmitting}
                  error={errors.username}
                  showError={showErrors}
                  themedStyles={themedStyles}
                />

                <FormInput
                  ref={passwordRef}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={setPassword}
                  defaultValue=""
                  editable={!isSubmitting}
                  error={errors.password}
                  showError={showErrors}
                  themedStyles={themedStyles}
                />

                <View style={authStyles.buttonContainer}>
                  <Button
                    title="Login"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onPress={handleLogin}
                    themedStyles={themedStyles}
                  />

                  <Button
                    title="Create Account"
                    secondary
                    disabled={isSubmitting}
                    onPress={toggleRegister}
                    themedStyles={themedStyles}
                  />
                </View>
              </>
            )}

            {message ? (
              <Text
                style={[
                  { ...authStyles.message, ...themedStyles.message },
                  isSuccessMessage ? themedStyles.successMessage : themedStyles.errorMessage,
                ]}
              >
                {message}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
