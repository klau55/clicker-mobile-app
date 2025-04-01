import { TextInputProps, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export type User = {
  id: number;
  username: string;
  total_taps: number;
  created_at?: string;
  login_count?: number;
};

export type UserStats = {
  username: string;
  total_taps: number;
  created_at: string;
  last_active: string;
  tap_count_today: number;
  last_login: string;
  login_count: number;
};

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  message?: string;
  user?: User;
};

export type LeaderboardEntry = {
  username: string;
  total_taps: number;
  rank?: number;
  hours_since_active?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export type FightStyle = 'punch' | 'kick' | 'rightPunch';

export type FightMove = {
  style: FightStyle;
  power: number;
  animationDuration: number;
  soundEffect?: string;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  error: string;
  success: string;
};

export type HomeScreenProps = {
  user: User;
  setUser: UserSetterType;
};

export type UserSetterType = React.Dispatch<React.SetStateAction<User | null>>;
export type ThemeSetterType = React.Dispatch<React.SetStateAction<ThemeColors>>;

export type RootStackParamList = {
  Home: { user: User };
  Leaderboard: undefined;
  Settings: { setUser: UserSetterType };
  Profile: { userId: number };
};

export type ValidationErrors = {
  username?: string;
  password?: string;
};

export type ApiError = {
  message: string;
  [key: string]: any;
};

export type AuthScreenProps = {
  setUser: UserSetterType;
};

export type FormInputProps = TextInputProps & {
  label?: string;
  error?: string;
  showError?: boolean;
  themedStyles?: any;
};

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  secondary?: boolean;
  themedStyles?: any;
};

export type LeaderboardScreenProps = {
  navigation: any;
  user?: User;
};

export type PodiumDisplayProps = {
  leaders: LeaderboardEntry[];
};

export type UserRankCardProps = {
  user: User;
  userRank: number;
  userEntry?: LeaderboardEntry;
};

export type SettingsScreenProps = {
  setUser: UserSetterType;
};

export type ThemeToggleProps = {
  onToggle?: () => void;
};

export type SettingsGroupProps = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type LogoutButtonProps = {
  setUser: UserSetterType;
  style?: StyleProp<ViewStyle>;
}; 