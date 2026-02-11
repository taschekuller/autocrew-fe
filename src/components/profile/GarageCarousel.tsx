import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Car } from '@/types/profile';
import { Ionicons } from '@expo/vector-icons';

interface GarageCarouselProps {
  cars: Car[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const SPACING = 16;

export const GarageCarousel: React.FC<GarageCarouselProps> = ({ cars }) => {
  const theme = useTheme();

  const renderCarCard = ({ item }: { item: Car }) => {
    return (
      <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.text }]}>
        <Image source={{ uri: item.image }} style={styles.carImage} resizeMode="cover" />

        <View style={styles.cardContent}>
            <View>
                <Text style={[styles.carMake, { color: theme.textSecondary }]}>{item.year} | {item.make}</Text>
                <Text style={[styles.carModel, { color: theme.text }]}>{item.model}</Text>
            </View>

            <View style={[styles.statusBadge, {
                borderColor: item.health === 'All Systems Go' ? theme.accent :
                             item.health === 'Maintenance Due' ? '#FF9F0A' : theme.textSecondary,
                backgroundColor: item.health === 'All Systems Go' ? theme.accent :
                                 item.health === 'Maintenance Due' ? '#FF9F0A20' : 'transparent',
            }]}>
                <Ionicons
                    name={item.health === 'All Systems Go' ? "checkmark-circle" : "warning"}
                    size={14}
                    color={item.health === 'All Systems Go' ? '#2f2e32' : theme.text}
                />
                <Text style={[styles.statusText, {
                    color: item.health === 'All Systems Go' ? '#2f2e32' :
                           item.health === 'Maintenance Due' ? '#FF9F0A' : theme.textSecondary
                }]}>
                    {item.health}
                </Text>
            </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Garage</Text>
        <TouchableOpacity>
            <Text style={[styles.seeAll, { color: theme.text }]}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cars}
        renderItem={renderCarCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
  },
  title: {
      fontSize: 20,
      fontWeight: '700',
  },
  seeAll: {
      fontSize: 14,
      fontWeight: '600',
  },
  listContent: {
      paddingHorizontal: 20,
      gap: SPACING,
  },
  card: {
      width: CARD_WIDTH,
      height: 220,
      borderRadius: 24,
      overflow: 'hidden',
      // Shadow
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
  },
  carImage: {
      width: '100%',
      height: '65%',
  },
  cardContent: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
  },
  carMake: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
  },
  carModel: {
      fontSize: 20,
      fontWeight: '800',
  },
  statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
  },
  statusText: {
      fontSize: 12,
      fontWeight: '700',
  }
});
