import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '../hooks/useAuth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="settings/index" options={{ title: 'Settings', presentation: 'modal' }} />
        <Stack.Screen name="profile/index" options={{ title: 'Profile', headerShown: true }} />
      </Stack>
    </AuthProvider>
  );
}
