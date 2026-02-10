import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithApple } from '../utils/auth';
import { AntDesign } from '@expo/vector-icons';

interface AppleLoginButtonProps {
  onSuccess: () => void;
  onError: (error: any) => void;
}

export const AppleLoginButton: React.FC<AppleLoginButtonProps> = ({ onSuccess, onError }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock availability or check real availability (usually true on iOS 13+)
    setIsAvailable(true);
  }, []);

  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      await signInWithApple();
      onSuccess();
    } catch (error: any) {
        if (error.code !== 'ERR_REQUEST_CANCELED') {
             onError(error);
        }
    } finally {
      setLoading(false);
    }
  };

  if (!isAvailable) return null;

  return (
    <View style={styles.container}>
        {loading ? (
             <ActivityIndicator size="small" color="#000000" />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleAppleLogin}
            activeOpacity={0.8}
          >
            <AntDesign name="apple" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Sign up with Apple</Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 12, // Match AuthSheet styling
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    marginBottom: 4, // Visual alignment fix
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
