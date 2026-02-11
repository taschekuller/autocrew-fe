import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { USER_PROFILE } from '@/data/mockProfile';

// Components
import { ProfileHero } from '@/components/profile/ProfileHero';
import { GarageCarousel } from '@/components/profile/GarageCarousel';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { ContentTabs } from '@/components/profile/ContentTabs';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'Timeline' | 'Garage' | 'Saved'>('Garage');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // We use a custom header in ProfileHero
    });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[3]} // Make tabs sticky (index 3 in children array: Hero, Garage, Stats, Tabs)
      >
        <ProfileHero user={USER_PROFILE} />

        <GarageCarousel cars={USER_PROFILE.garage} />

        <StatsGrid stats={USER_PROFILE.stats} />

        <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Placeholder for Tab Content - e.g. Timeline or Grid of posts */}
        <View style={{ height: 500, paddingHorizontal: 20 }}>
            {/* Just a placeholder to allow scrolling and testing sticky header */}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
      paddingBottom: 80, // Space for bottom tab bar
  }
});

