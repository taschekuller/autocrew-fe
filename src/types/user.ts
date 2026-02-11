export interface Stats {
  daysActive: number;
  completedTasks: number;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string; // Optional, might use a placeholder
  stats: Stats;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}
