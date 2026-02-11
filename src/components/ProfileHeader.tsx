import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { getProfile, signOut } from '../utils/auth';

export default function ProfileHeader() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // In a real app, you might want to use a context or global store for this to avoid refetching constantly
    const data = await getProfile();
    setProfile(data);
    setLoading(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  if (loading) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="small" />
          </View>
      );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${profile?.name || 'User'}&background=random&color=fff` }}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
