import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { UserProfile } from '@/types/profile';

interface ProfileHeroProps {
  user: UserProfile;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ user }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Image or Gradient could go here, for now just relying on screen background */}

      <BlurView
        intensity={80}
        tint={theme.background === '#000000' ? 'dark' : 'light'}
        style={[styles.blurContainer, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
                {/* Placeholder for back button if needed, or just specific brand icon */}
            </View>
            <View style={styles.headerRight}>
                 <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
                    <Ionicons name="share-outline" size={24} color={theme.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
                    <Ionicons name="settings-outline" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                {user.isVerified && (
                    <View style={[styles.verifiedBadge, { backgroundColor: theme.background }]}>
                        <Ionicons name="checkmark-circle" size={24} color={theme.accent} />
                    </View>
                )}
            </View>

            <View style={styles.nameContainer}>
                <Text style={[styles.name, { color: theme.text }]}>{user.name}</Text>
                {/* Interactive Badge? */}
            </View>

            <View style={styles.statsRow}>
                <View style={styles.stat}>
                     <Ionicons name="location-sharp" size={14} color={theme.textSecondary} />
                     <Text style={[styles.statText, { color: theme.textSecondary }]}>{user.location}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.stat}>
                     <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                     <Text style={[styles.statText, { color: theme.textSecondary }]}>Member since {user.memberSince}</Text>
                </View>
            </View>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  blurContainer: {
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 10,
  },
  headerLeft: {
      width: 40,
  },
  headerRight: {
      flexDirection: 'row',
      gap: 15,
  },
  iconButton: {
      padding: 5,
  },
  profileInfo: {
      alignItems: 'center',
  },
  avatarContainer: {
      position: 'relative',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
  },
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
  },
  verifiedBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderRadius: 12,
      padding: 2,
  },
  nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
  },
  name: {
      fontSize: 24,
      fontWeight: '800',
      fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  stat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  statText: {
      fontSize: 13,
      fontWeight: '500',
  },
  separator: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: '#8E8E93',
  }
});
