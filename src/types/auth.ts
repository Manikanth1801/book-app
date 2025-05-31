export interface User {
  email: string;
  role: string;
  name?: string;
  number?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
} 