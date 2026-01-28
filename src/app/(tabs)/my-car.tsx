import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/theme';

export default function MyCarScreen() {
  return (
    <LinearGradient
      colors={Colors.gradients.myCar} // Orange/Red Gradient
      style={styles.container}
    >
      <Text style={styles.text}>My Car Screen</Text>
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
