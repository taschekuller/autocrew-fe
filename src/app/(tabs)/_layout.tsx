import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderTabBarBackground = () => (
    <BlurView
      intensity={80}
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      style={[
        StyleSheet.absoluteFill,
        {
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: theme.tabBarBackground,
        },
      ]}
      experimentalBlurMethod='dimezisBlurView'
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        headerShown: true,
        tabBarShowLabel: true,
        tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 0,
            right: 0,
            marginHorizontal: '5%', // 90% width
            height: 60,
            borderRadius: 30,
            borderTopWidth: 0,
            elevation: 0, // Remove shadow on Android
            shadowColor: '#000', // Shadow for iOS
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            backgroundColor: 'transparent', // Let BlurView show through
        },
        tabBarBackground: renderTabBarBackground,
        tabBarItemStyle: {
            paddingTop: 8,
            paddingBottom: 8,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} name="home" color={color} indicatorColor={theme.indicator} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} name="person" color={color} indicatorColor={theme.indicator} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-car"
        options={{
          title: 'My Car',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} name="car" color={color} indicatorColor={theme.indicator} />
          ),
        }}
      />
      <Tabs.Screen
        name="service-points"
        options={{
          title: 'Service Points',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} name="map" color={color} indicatorColor={theme.indicator} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({
  name,
  color,
  focused,
  indicatorColor,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  focused: boolean;
  indicatorColor: string;
}) {
  return (
    <View style={[styles.iconContainer, focused && { backgroundColor: indicatorColor }]}>
      <Ionicons size={24} name={name} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
