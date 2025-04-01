export interface User {
  id: number;
  username: string;
  total_taps: number;
  created_at?: string;
  login_count?: number;
}

export interface UserStats {
  username: string;
  total_taps: number;
  created_at: string;
  last_active: string;
  tap_count_today: number;
  last_login: string;
  login_count: number;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface LeaderboardEntry {
  username: string;
  total_taps: number;
  rank?: number;
  hours_since_active?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type FightStyle = 'punch' | 'kick' | 'rightPunch';

export interface FightMove {
  style: FightStyle;
  power: number;
  animationDuration: number;
  soundEffect?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  error: string;
  success: string;
}

export interface HomeScreenProps {
  user: User;
  setUser: UserSetterType;
}

export type UserSetterType = React.Dispatch<React.SetStateAction<User | null>>;
export type ThemeSetterType = React.Dispatch<React.SetStateAction<ThemeColors>>;

export type RootStackParamList = {
  Home: { user: User };
  Leaderboard: undefined;
  Settings: { setUser: UserSetterType };
  Profile: { userId: number };
};

export class ApiError extends Error {
  status: number;
  errors?: string[];

  constructor(message: string, status: number = 500, errors?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
} 