import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = colorScheme === 'dark' ? '#fff' : '#0a7ea4';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-car"
        options={{
          title: 'My Car',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="car" color={color} />,
        }}
      />
      <Tabs.Screen
        name="service-points"
        options={{
          title: 'Service Points',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}
