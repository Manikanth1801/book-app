export interface User {
  email: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
} 