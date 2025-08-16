import { User, AuthResponse } from '../types/auth';

const STORAGE_KEYS = {
  USERS: 'ssp_users',
  CURRENT_TOKEN: 'ssp_token',
  CURRENT_ROLE: 'ssp_role',
  CURRENT_STATUS: 'ssp_status'
};

// Initialize with admin user
const initializeUsers = (): User[] => {
  const existing = localStorage.getItem(STORAGE_KEYS.USERS);
  if (existing) {
    return JSON.parse(existing);
  }
  
  const defaultUsers: User[] = [
    {
      id: 'admin-1',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      status: 'approved',
      createdAt: new Date().toISOString()
    }
  ];
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  return defaultUsers;
};

const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`;
};

const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const mockApi = {
  async login(username: string, password: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    const users = initializeUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    if (user.role === 'user' && user.status !== 'approved') {
      throw new Error('Account not approved yet');
    }
    
    const token = generateToken(user.id);
    
    // Store session info
    localStorage.setItem(STORAGE_KEYS.CURRENT_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, user.role);
    localStorage.setItem(STORAGE_KEYS.CURRENT_STATUS, user.status);
    
    return {
      token,
      role: user.role,
      status: user.status,
      message: 'Login successful'
    };
  },

  async register(username: string, password: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    const users = initializeUsers();
    
    if (users.some(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      username,
      password,
      role: 'user',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return {
      token: '',
      role: 'user',
      status: 'pending',
      message: 'Registration successful. Awaiting admin approval.'
    };
  },

  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = initializeUsers();
    return users.filter(u => u.role !== 'admin'); // Don't show admin users in admin panel
  },

  async updateUserStatus(userId: string, status: 'approved' | 'rejected' | 'revoked'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const users = initializeUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex].status = status;
    saveUsers(users);
    
    // If user is currently logged in and their status changed, update session
    const currentSession = this.getCurrentSession();
    if (currentSession.token) {
      const currentUser = users.find(u => u.id === userId);
      if (currentUser && currentUser.role === 'user') {
        localStorage.setItem(STORAGE_KEYS.CURRENT_STATUS, status);
      }
    }
  },

  getCurrentSession() {
    return {
      token: localStorage.getItem(STORAGE_KEYS.CURRENT_TOKEN),
      role: localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE),
      status: localStorage.getItem(STORAGE_KEYS.CURRENT_STATUS)
    };
  },

  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ROLE);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STATUS);
  }
};