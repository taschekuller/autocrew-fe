import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Colors
  const activeColor = isDark ? '#fff' : '#000';
  const inactiveColor = isDark ? '#888' : '#666';
  const backgroundColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(178, 178, 178, 0.5)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
            experimentalBlurMethod='dimezisBlurView'
          />
        ),
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-car"
        options={{
          title: 'My Car',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="car" color={color} />,
        }}
      />
      <Tabs.Screen
        name="service-points"
        options={{
          title: 'Service Points',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
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
    overflow: 'hidden', // Required for BlurView to respect borderRadius on some versions
    backgroundColor: 'transparent', // Let BlurView show through
  },
  tabBarItem: {
    paddingTop: 8,
    paddingBottom: 8,
  }
});
