import * as SecureStore from 'expo-secure-store';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as GoogleSignIn from '@react-native-google-signin/google-signin';

const TOKEN_KEY = 'auth_token';
const ONBOARDING_KEY = 'onboarding_completed';

// Mock Configuration
console.log('Mock Auth configured');

const API_URL = 'http://localhost:3000'; // Use 10.0.2.2 for Android Emulator, localhost for iOS

export const signInWithGoogle = async () => {
  // In a real app, you'd get the token from Google SDK first
  // const { idToken } = await GoogleSignIn.signIn();
  const mockGoogleToken = 'mock-google-token-from-sdk';

  try {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: mockGoogleToken }),
    });

    if (!response.ok) throw new Error('Google Sign-In failed');

    // Assuming backend returns token/user in body, adjust based on actual response
    // const data = await response.json();
    // await SecureStore.setItemAsync(TOKEN_KEY, data.token);

    const mockToken = 'mock-jwt-from-backend';
    await SecureStore.setItemAsync(TOKEN_KEY, mockToken);
    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signInWithApple = async () => {
    // const credential = await AppleAuthentication.signInAsync(...);
    const mockAppleToken = 'mock-apple-token-from-sdk';

    try {
        const response = await fetch(`${API_URL}/auth/apple`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identityToken: mockAppleToken, firstName: 'John', lastName: 'Doe' }),
        });

        if (!response.ok) throw new Error('Apple Sign-In failed');

        const mockToken = 'mock-jwt-from-backend';
        await SecureStore.setItemAsync(TOKEN_KEY, mockToken);
        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        // Assuming 201 Created and maybe returns token?
        // Docs say 201 No links, implying maybe just success?
        // Usually login returns a token. For now, mocking token storage on success.
        const mockToken = 'mock-jwt-from-backend';
        await SecureStore.setItemAsync(TOKEN_KEY, mockToken);
        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const registerWithEmail = async (email: string, password: string, name: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        return { success: true };
    } catch (error) {
         console.error(error);
         throw error;
    }
};


export const signOut = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const getSession = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const getProfile = async () => {
    try {
        const token = await getSession();
        if (!token) return null;

        // If using mock, return mock data
        if (token.startsWith('mock-')) {
             return { name: 'Demo User', email: 'demo@autocrew.com' };
        }

        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                await signOut();
                return null;
            }
            throw new Error('Failed to fetch profile');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null; // Return null gracefully so UI can handle it (e.g., show login or placeholder)
    }
};

export const setOnboardingCompleted = async () => {
  await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
};

export const hasCompletedOnboarding = async () => {
  // Always return false as requested for testing
  return false;
};
