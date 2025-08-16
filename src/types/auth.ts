export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  status: 'pending' | 'approved' | 'rejected' | 'revoked';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  status: string;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
}