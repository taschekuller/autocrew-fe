import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getSession, hasCompletedOnboarding } from '../utils/auth';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectRoute, setRedirectRoute] = useState<string | null>(null);

  useEffect(() => {
    checkState();
  }, []);

  const checkState = async () => {
    try {
      const session = await getSession();
      const onboardingDone = await hasCompletedOnboarding();

      if (session) {
        // User has a session token, go to main app
        setRedirectRoute('/(tabs)');
      } else if (onboardingDone) {
        // User completed onboarding but not logged in (maybe logged out), generic login or main app?
        // For now, let's treat onboarding as the login entry point if not logged in.
        // Or if you have a separate Login screen, go there.
        // Given the requirements, "Onboarding screens shown only once",
        // if they are not logged in, we might need to show a login screen or just show onboarding again
        // but maybe with a different state?
        // For simplicity and "App relaunch keeps user logged in" requirement:
        // If no session, show onboarding (which acts as login screen).
        setRedirectRoute('/onboarding');
      } else {
        // First time user
        setRedirectRoute('/onboarding');
      }
    } catch (e) {
      console.error('Error checking auth state', e);
      setRedirectRoute('/onboarding'); // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <Redirect href={redirectRoute as any} />;
}
