import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SectionList } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await logout();
            // Router redirection is handled in useAuth logic or here if needed
            // router.replace('/onboarding');
          }
        }
      ]
    );
  };

  interface SettingItem {
    id: string;
    icon: string;
    label: string;
    action: () => void;
    destructive?: boolean;
  }

  interface Section {
    title: string;
    data: SettingItem[];
  }

  const sections: Section[] = [
    {
      title: 'Account',
      data: [
        { id: 'profile', icon: 'person-outline', label: 'Edit Profile', action: () => {} },
        { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', action: () => {} },
        { id: 'privacy', icon: 'lock-closed-outline', label: 'Privacy', action: () => {} },
      ],
    },
    {
      title: 'Support',
      data: [
        { id: 'help', icon: 'help-circle-outline', label: 'Help & Support', action: () => {} },
        { id: 'about', icon: 'information-circle-outline', label: 'About', action: () => {} },
      ],
    },
    {
      title: 'Actions',
      data: [
         { id: 'logout', icon: 'log-out-outline', label: 'Log Out', action: handleLogout, destructive: true },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={item.action}
            activeOpacity={0.7}
          >
            <View style={styles.itemLeft}>
              <Ionicons
                name={item.icon as any}
                size={22}
                color={item.destructive ? '#FF3B30' : '#007AFF'}
              />
              <Text style={[styles.itemLabel, item.destructive && styles.destructiveLabel]}>
                {item.label}
              </Text>
            </View>
            {!item.destructive && (
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            )}
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        initialNumToRender={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    paddingVertical: 20,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  item: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 17,
    color: '#000000',
    marginLeft: 12,
  },
  destructiveLabel: {
    color: '#FF3B30',
  },
  separator: {
    height: 1, // StyleSheet.hairlineWidth might be too thin for some preferences but usually better
    backgroundColor: '#C6C6C8',
    marginLeft: 50, // Indent separator to align with text
  },
});
