import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

type Tab = 'Timeline' | 'Garage' | 'Saved';

interface ContentTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, onTabChange }) => {
  const theme = useTheme();
  const tabs: Tab[] = ['Timeline', 'Garage', 'Saved'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => onTabChange(tab)}
        >
            <Text style={[
                styles.tabText,
                { color: activeTab === tab ? theme.text : theme.textSecondary }
            ]}>
                {tab}
            </Text>
            {activeTab === tab && (
                <View style={[styles.indicator, { backgroundColor: theme.accent }]} />
            )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    marginRight: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTab: {
      //
  },
  tabText: {
      fontSize: 16,
      fontWeight: '600',
  },
  indicator: {
      position: 'absolute',
      bottom: -1, // Overlap border
      left: 0,
      right: 0,
      height: 3,
      borderRadius: 1.5,
  }
});
