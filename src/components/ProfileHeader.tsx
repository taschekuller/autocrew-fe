import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  const handleLogout = async () => {
      Alert.alert(
          "Log Out",
          "Are you sure you want to log out?",
          [
              { text: "Cancel", style: "cancel" },
              {
                  text: "Log Out",
                  style: "destructive",
                  onPress: async () => {
                    await signOut();
                    setModalVisible(false);
                    router.replace('/onboarding');
                  }
              }
          ]
      );
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(profile?.name || profile?.email)}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
        >
            <View style={styles.menuContainer}>
                <View style={styles.menuHeader}>
                    <View style={[styles.avatar, styles.largeAvatar]}>
                         <Text style={[styles.avatarText, styles.largeAvatarText]}>{getInitials(profile?.name || profile?.email)}</Text>
                    </View>
                    <Text style={styles.userName}>{profile?.name || 'User'}</Text>
                    <Text style={styles.userEmail}>{profile?.email || ''}</Text>
                </View>

                <View style={styles.menuDivider} />

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="red" />
                    <Text style={[styles.menuItemText, { color: 'red' }]}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 60, // Adjust based on header height
      paddingRight: 16,
  },
  menuContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      width: 250,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  menuHeader: {
      alignItems: 'center',
      marginBottom: 16,
  },
  largeAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 8,
      backgroundColor: '#000',
  },
  largeAvatarText: {
      fontSize: 24,
  },
  userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
  },
  userEmail: {
      fontSize: 14,
      color: '#666',
  },
  menuDivider: {
      height: 1,
      backgroundColor: '#f0f0f0',
      marginBottom: 8,
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 12,
  },
  menuItemText: {
      fontSize: 16,
      fontWeight: '500',
  }
});
