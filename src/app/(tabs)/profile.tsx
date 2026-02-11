import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2; // 2 columns with 16px padding on sides and 16px gap

export default function ProfileScreen() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerBackground: () => (
        <BlurView intensity={80} tint={theme.background === '#000000' ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.headerButton}
        >
          <Ionicons name="settings-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router, theme]);

  if (!user && !isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>User not found</Text>
      </View>
    );
  }

  // Use optional chaining with default values for safe rendering
  const daysActive = user?.stats?.daysActive ?? 0;
  const completedTasks = user?.stats?.completedTasks ?? 0;
  const rating = user?.stats?.rating ?? 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 60 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header Section */}
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&color=fff&size=200` }}
            style={styles.avatar}
          />
          <View style={[styles.activeBadge, { backgroundColor: theme.accent }]} />
        </View>
        <Text style={[styles.name, { color: theme.text }]}>{user?.name || 'Loading...'}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>{user?.email || '...'}</Text>

        <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.accent }]}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Bento Box Stats Grid */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Dashboard</Text>
      <View style={styles.gridContainer}>
        {/* Large Card - Tasks */}
        <View style={[styles.bentoCard, styles.cardLarge, { backgroundColor: theme.surface }]}>
          <View style={[styles.iconContainer, { backgroundColor: theme.accent }]}>
             <Ionicons name="checkbox" size={24} color="#2f2e32" />
          </View>
          <Text style={[styles.statValue, { color: theme.text }]}>{completedTasks}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Tasks Completed</Text>
        </View>

        {/* Small Card - Days */}
        <View style={[styles.bentoCard, styles.cardSmall, { backgroundColor: theme.surface }]}>
           <Ionicons name="calendar" size={28} color={theme.accent} style={{marginBottom: 8}} />
           <Text style={[styles.statValue, { color: theme.text }]}>{daysActive}</Text>
           <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Days Active</Text>
        </View>

         {/* Small Card - Rating */}
         <View style={[styles.bentoCard, styles.cardSmall, { backgroundColor: theme.surface }]}>
           <Ionicons name="star" size={28} color={theme.accent} style={{marginBottom: 8}} />
           <Text style={[styles.statValue, { color: theme.text }]}>{rating}</Text>
           <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Rating</Text>
        </View>

        {/* Medium Card - Activity (Placeholder) */}
        <View style={[styles.bentoCard, styles.cardMedium, { backgroundColor: theme.surface }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Recent Activity</Text>
             <View style={styles.placeholderGraph}>
                <View style={[styles.graphBar, { height: 20, backgroundColor: theme.textSecondary, opacity: 0.3 }]} />
                <View style={[styles.graphBar, { height: 35, backgroundColor: theme.textSecondary, opacity: 0.5 }]} />
                <View style={[styles.graphBar, { height: 50, backgroundColor: theme.accent }]} />
                <View style={[styles.graphBar, { height: 30, backgroundColor: theme.textSecondary, opacity: 0.4 }]} />
             </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  headerButton: {
      marginRight: 10,
      padding: 5,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
      position: 'relative',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  activeBadge: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: '#fff', // Or dynamic background color if needed
  },
  name: {
    fontSize: 28,
    fontWeight: '800', // San Francisco Bold/Heavy
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  email: {
    fontSize: 16,
    marginBottom: 24,
  },
  editButton: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 30,
      shadowColor: '#d1ff6e', // Accent glow
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
  },
  editButtonText: {
      color: '#000', // Black text on neon
      fontSize: 16,
      fontWeight: '700',
  },
  sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 16,
      marginLeft: 4,
  },
  gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
  },
  bentoCard: {
      padding: 16,
      borderRadius: 24,
      justifyContent: 'center',
  },
  cardLarge: {
      width: '100%',
      height: 140,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
  },
  iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
  },
  cardSmall: {
      width: COLUMN_WIDTH,
      height: COLUMN_WIDTH, // Square
      alignItems: 'flex-start',
      justifyContent: 'space-between',
  },
  cardMedium: {
      width: '100%',
      height: 100,
      marginTop: 8,
  },
  statValue: {
      fontSize: 28,
      fontWeight: '700',
  },
  statLabel: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 4,
  },
  cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
  },
  placeholderGraph: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 8,
      height: 50,
  },
  graphBar: {
      width: 8,
      borderRadius: 4,
  }
});

