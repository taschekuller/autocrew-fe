import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginWithEmail, registerWithEmail, setOnboardingCompleted, signInWithApple, signInWithGoogle } from '../utils/auth';

interface AuthSheetProps {
  visible: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthSheet({ visible, onClose, initialMode = 'register' }: AuthSheetProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && initialMode) {
      setMode(initialMode);
      setError(null);
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [visible, initialMode]);

  if (!visible) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
        if (mode === 'login') {
            await loginWithEmail(email, password);
        } else {
            await registerWithEmail(email, password, name);
            // Auto login after register? Or just proceed?
            // Assuming successful register logs you in or we can proceed.
        }
        await setOnboardingCompleted();
        router.replace('/(tabs)');
    } catch (err: any) {
        setError(err.message || 'Authentication failed');
    } finally {
        setLoading(false);
    }
  };

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

  const toggleMode = () => {
      setMode(prev => prev === 'login' ? 'register' : 'login');
      setError(null);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.avoidingView}>
      <View style={styles.sheet}>
        <Text style={styles.title}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</Text>
        <Text style={styles.subtitle}>
            {mode === 'login' ? 'Sign in to continue to AutoCrew' : 'Join the community of car enthusiasts'}
        </Text>

        <View style={styles.form}>
            {mode === 'register' && (
                <TextInput
                    placeholder="Full Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            )}
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>{mode === 'login' ? 'Log In' : 'Sign Up'}</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleButton} onPress={toggleMode}>
                <Text style={styles.toggleButtonText}>
                    {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Log In'}
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.divider}>
             <View style={styles.line} />
             <Text style={styles.dividerText}>OR</Text>
             <View style={styles.line} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
            <Text style={styles.appleButtonText}>Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <Text style={styles.googleButtonText}>Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
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
  avoidingView: {
      flex: 1,
      justifyContent: 'flex-end',
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
    marginBottom: 24,
  },
  form: {
      width: '100%',
      gap: 12,
      marginBottom: 20,
  },
  input: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      borderRadius: 12,
      fontSize: 16,
      width: '100%',
  },
  submitButton: {
      backgroundColor: '#000',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
  },
  submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
  },
  errorText: {
      color: 'red',
      textAlign: 'center',
  },
  toggleButton: {
      alignItems: 'center',
      marginTop: 8,
  },
  toggleButtonText: {
      color: '#000',
      fontWeight: '600',
  },
  divider: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
  },
  line: {
      flex: 1,
      height: 1,
      backgroundColor: '#e0e0e0',
  },
  dividerText: {
      marginHorizontal: 10,
      color: '#999',
      fontWeight: '600',
  },
  socialButtons: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  appleButton: {
    flex: 1,
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
    flex: 1,
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
