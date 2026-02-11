import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '@/types/profile';

interface StatsGridProps {
  stats: UserProfile['stats'];
}

const { width } = Dimensions.get('window');
const GAP = 12;
const PADDING = 20;
const COLUMN_WIDTH = (width - (PADDING * 2) - GAP) / 2;

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Dashboard</Text>

      <View style={styles.grid}>
        {/* Box 1: Garage Health (Wide) */}
        <View style={[styles.card, styles.cardWide, { backgroundColor: theme.surface }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: theme.text + '10' }]}>
                    <Ionicons name="pulse" size={20} color={theme.text} />
                </View>
                {/* <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} /> */}
            </View>
            <View>
                <Text style={[styles.value, { color: theme.text }]}>{stats.garageHealth}</Text>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Garage Health</Text>
            </View>
        </View>

        {/* Box 2: Total KM (Square) */}
        <View style={[styles.card, styles.cardSquare, { backgroundColor: theme.surface }]}>
            <View style={[styles.iconBox, { backgroundColor: theme.text + '10', marginBottom: 12 }]}>
                <Ionicons name="speedometer" size={24} color={theme.text} />
            </View>
            <Text style={[styles.value, { color: theme.text }]}>{stats.totalKm}</Text>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Total KM</Text>
        </View>

        {/* Box 3: Community Score (Square) */}
        <View style={[styles.card, styles.cardSquare, { backgroundColor: theme.surface }]}>
            <View style={[styles.iconBox, { backgroundColor: theme.text + '10', marginBottom: 12 }]}>
                <Ionicons name="people" size={24} color={theme.text} />
            </View>
            <Text style={[styles.value, { color: theme.text }]}>{stats.communityScore}</Text>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Trust Score</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: GAP,
  },
  card: {
      borderRadius: 20,
      padding: 16,
      justifyContent: 'space-between',
  },
  cardWide: {
      width: '100%',
      height: 110,
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardSquare: {
      width: COLUMN_WIDTH,
      height: COLUMN_WIDTH,
      justifyContent: 'flex-start',
  },
  cardHeader: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: 60, // Fixed width for icon box area in wide card
  },
  iconBox: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  value: {
      fontSize: 24,
      fontWeight: '800',
      marginBottom: 4,
  },
  label: {
      fontSize: 13,
      fontWeight: '600',
  }
});
