import * as SecureStore from 'expo-secure-store';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const TOKEN_KEY = 'auth_token';
const ONBOARDING_KEY = 'onboarding_completed';

// Configure Google Sign-In
// GoogleSignin.configure({
//   webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
//   iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
//   offlineAccess: true,
// });

const API_URL = 'http://localhost:3000'; // Use 10.0.2.2 for Android Emulator, localhost for iOS

export const signInWithGoogle = async () => {
    console.log('Mocking Google Sign-In');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    await SecureStore.setItemAsync(TOKEN_KEY, 'mock-google-token');
    return { success: true };
    /*
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.data?.idToken) {
        const response = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: userInfo.data.idToken }),
      });

      if (!response.ok) throw new Error('Google Sign-In failed');

      const data = await response.json();
      await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
      return { success: true };
    } else {
        throw new Error('No ID token present');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  */
};


export const signInWithApple = async () => {
    console.log('Mocking Apple Sign-In');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    await SecureStore.setItemAsync(TOKEN_KEY, 'mock-apple-token');
    return { success: true };
    /*
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });

        // identityToken is what validates the user to the backend
        if (credential.identityToken) {
            const response = await fetch(`${API_URL}/auth/apple`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identityToken: credential.identityToken,
                    firstName: credential.fullName?.givenName,
                    lastName: credential.fullName?.familyName,
                    email: credential.email // Note: Email is only provided on the first sign in
                }),
            });

            if (!response.ok) {
                 const errorText = await response.text();
                 throw new Error(`Apple Sign-In failed: ${errorText}`);
            }

            const data = await response.json();
            await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
            return { success: true };
        } else {
            throw new Error('No identity token present');
        }
    } catch (error: any) {
        if (error.code === 'ERR_REQUEST_CANCELED') {
            // handle that the user canceled the sign-in flow
             console.log('User canceled Apple Sign-In');
             throw error; // Re-throw so caller knows
        } else {
            // handle other errors
             console.error(error);
             throw error;
        }
    }
    */
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

        const data = await response.json();
        await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
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
