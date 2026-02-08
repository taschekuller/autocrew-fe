import * as SecureStore from 'expo-secure-store';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as GoogleSignIn from '@react-native-google-signin/google-signin';

const TOKEN_KEY = 'auth_token';
const ONBOARDING_KEY = 'onboarding_completed';

// Mock Configuration
console.log('Mock Auth configured');

export const signInWithGoogle = async () => {
  console.log('Mocking Google Sign In...');
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  // Return a mock user object or token
  const mockToken = 'mock-google-token-123';
  await SecureStore.setItemAsync(TOKEN_KEY, mockToken);
  return { data: { idToken: mockToken, user: { name: 'Mock User', email: 'mock@gmail.com' } } };
};

export const signInWithApple = async () => {
  console.log('Mocking Apple Sign In...');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockToken = 'mock-apple-token-456';
  await SecureStore.setItemAsync(TOKEN_KEY, mockToken);
  return { identityToken: mockToken, email: 'mock@icloud.com' };
};

export const signOut = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const getSession = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const setOnboardingCompleted = async () => {
  // User requested "do not need for now, user can see again and again"
  // So we effectively do nothing or maybe set it but our check will ignore it?
  // Let's set it just in case, but we can change the check to ignore it if needed.
  // Actually, to strictly follow "user can see again and again", we might want to NOT set this,
  // OR change hasCompletedOnboarding to return false.
  // For now, I'll store it but I will modify hasCompletedOnboarding to return false as requested.
  await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
};

export const hasCompletedOnboarding = async () => {
  // "do not need for now, user can see again and again"
  // Always return false so the user is always redirected to Onboarding on reload
  return false;

  // Original logic:
  // const value = await SecureStore.getItemAsync(ONBOARDING_KEY);
  // return value === 'true';
};
