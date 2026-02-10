import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View } from 'react-native';
import { signInWithGoogle } from '../utils/auth';
import { AntDesign } from '@expo/vector-icons';

interface GoogleLoginButtonProps {
  onSuccess: () => void;
  onError: (error: any) => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      onSuccess();
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        {loading ? (
             <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <AntDesign name="google" size={20} color="black" style={styles.icon} />
            <Text style={styles.buttonText}>Sign up with Google</Text>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});
