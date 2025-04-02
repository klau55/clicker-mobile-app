import axios, { AxiosError } from 'axios';
import { AuthRequest, AuthResponse, ApiError, ValidationErrors, User } from '../types';
import { BASE_URL } from '../constants/constants';

/**
 * Validate login/registration form
 */
export const validateAuthForm = (username: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!username.trim()) {
    errors.username = 'Username is required';
  } else if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

/**
 * Handle API authentication errors
 */
export const handleAuthError = (error: AxiosError<ApiError>): string => {
  console.log('Auth error:', error.response?.data || error.message);

  if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.response?.status === 429) {
    return 'Too many attempts. Please try again later.';
  } else {
    return 'Authentication failed. Please try again later.';
  }
};

/**
 * Login user
 */
export const loginUser = async (
  username: string,
  password: string
): Promise<{ user?: User; message?: string }> => {
  try {
    const requestData: AuthRequest = { username, password };
    const response = await axios.post<AuthResponse>(`${BASE_URL}/api/login`, requestData);

    if (response.data?.user) {
      return {
        user: response.data.user,
        message: 'Login successful!',
      };
    }

    return { message: response.data?.message || 'Login failed' };
  } catch (error) {
    return {
      message: handleAuthError(error as AxiosError<ApiError>),
    };
  }
};

/**
 * Register user
 */
export const registerUser = async (
  username: string,
  password: string
): Promise<{ user?: User; message?: string }> => {
  try {
    const requestData: AuthRequest = { username, password };
    const response = await axios.post<AuthResponse>(`${BASE_URL}/api/register`, requestData);

    if (response.data?.user) {
      const loginResponse = await loginUser(username, password);
      return loginResponse;
    }

    return { message: response.data?.message || 'Registration failed' };
  } catch (error) {
    return {
      message: handleAuthError(error as AxiosError<ApiError>),
    };
  }
};
