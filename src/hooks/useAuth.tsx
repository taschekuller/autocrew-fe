import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthContextType } from '../types/user';
import { useRouter } from 'expo-router';
import { getProfile, signOut, loginWithEmail, registerWithEmail } from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userProfile = await getProfile();
        setUser(userProfile);
      } catch (e) {
        console.error('Failed to load user', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      setUser(null);
      router.replace('/onboarding');
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
        setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    try {
      setUser({ ...user, ...updates });
      // await api.updateUser(updates); // In real app
    } catch (e) {
      console.error('Update failed', e);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
        await loginWithEmail(email, password);
        const userProfile = await getProfile();
        setUser(userProfile);
    } catch (e) {
        console.error('Login failed', e);
        throw e;
    } finally {
        setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
      setIsLoading(true);
      try {
          await registerWithEmail(email, password, name);
          // After register, we might want to auto-login or just let the user login
          // The current flow in AuthSheet implies we might want to proceed.
          // Let's assume auto-login for better UX, or just return success.
          // If the backend returns a token on register, we can set it.
          // Our registerWithEmail doesn't return a token currently, so we might need to login after.
          // For now, let's just let the caller handle the flow or update registerWithEmail later.
          // Actually, let's just leave it as is, caller can call login if needed.
      } catch (e) {
          console.error('Registration failed', e);
          throw e;
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
