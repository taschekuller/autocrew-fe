import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { setOnboardingCompleted, signInWithApple, signInWithGoogle } from '../utils/auth';

interface AuthSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function AuthSheet({ visible, onClose }: AuthSheetProps) {
  const router = useRouter();

  if (!visible) return null;

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      await setOnboardingCompleted();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Google Sign-In failed', error);
      // Show error to user
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
      await setOnboardingCompleted();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Apple Sign-In failed', error);
      // Show error to user
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sheet}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue to AutoCrew</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
            <Text style={styles.appleButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  appleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cancelButton: {
    marginTop: 16,
    padding: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});
