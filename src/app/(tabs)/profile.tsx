import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/theme';

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={Colors.gradients.profile} // Blue/Teal Gradient
      style={styles.container}
    >
      <Text style={styles.text}>Profile Screen</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
