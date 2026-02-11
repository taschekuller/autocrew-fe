import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SectionList, Platform } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
    value?: string;
  }

  interface Section {
    title: string;
    data: SettingItem[];
  }

  const sections: Section[] = [
    {
      title: 'Account',
      data: [
        { id: 'profile', icon: 'person', label: 'Personal Information', action: () => {} },
        { id: 'notifications', icon: 'notifications', label: 'Notifications', action: () => {} },
        { id: 'privacy', icon: 'lock-closed', label: 'Privacy & Security', action: () => {} },
      ],
    },
    {
      title: 'Support',
      data: [
         { id: 'help', icon: 'help-circle', label: 'Help & Support', action: () => {} },
         { id: 'about', icon: 'information-circle', label: 'About', action: () => {}, value: 'v1.0.0' },
      ],
    },
    {
      title: 'Actions',
      data: [
         { id: 'logout', icon: 'log-out', label: 'Log Out', action: handleLogout, destructive: true },
      ]
    }
  ];

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>{title.toUpperCase()}</Text>
  );

  const renderItem = ({ item, index, section }: { item: SettingItem, index: number, section: Section }) => {
    const isFirst = index === 0;
    const isLast = index === section.data.length - 1;

    return (
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity
            style={[
                styles.itemContainer,
                { backgroundColor: theme.surface },
                isFirst && styles.itemFirst,
                isLast && styles.itemLast,
                !isLast && { borderBottomWidth: 0.5, borderBottomColor: theme.border }
            ]}
            onPress={item.action}
            activeOpacity={0.7}
        >
            <View style={styles.itemContent}>
                <View style={[styles.iconContainer, { backgroundColor: item.destructive ? theme.error + '20' : 'transparent' }]}>
                    <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={item.destructive ? theme.error : theme.text}
                    />
                </View>
                <Text style={[styles.itemLabel, { color: item.destructive ? theme.error : theme.text }]}>
                    {item.label}
                </Text>
            </View>

            <View style={styles.itemRight}>
                {item.value && <Text style={[styles.itemValue, { color: theme.textSecondary }]}>{item.value}</Text>}
                {!item.destructive && (
                    <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} style={{ opacity: 0.5 }} />
                )}
            </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        // SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 20 }
        ]}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 24,
    marginLeft: 32, // Indent to align with card content
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemFirst: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
  },
  itemLast: {
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      marginBottom: 8,
  },
  itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  itemValue: {
      fontSize: 16,
  },
});
