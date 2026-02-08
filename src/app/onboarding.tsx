import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AuthSheet from '../components/AuthSheet';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [showAuth, setShowAuth] = useState(false);

  const contentOpacity = useSharedValue(1);
  const titleTranslateY = useSharedValue(0);

  const handleGetStarted = () => {
    contentOpacity.value = withTiming(0, { duration: 500 });
    titleTranslateY.value = withTiming(-50, { duration: 500 });

    // Show auth sheet after a small delay
    setTimeout(() => {
      setShowAuth(true);
    }, 500);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
    // Reset UI
    contentOpacity.value = withTiming(1, { duration: 500 });
    titleTranslateY.value = withTiming(0, { duration: 500 });
  };

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateY: titleTranslateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ImageBackground
        source={require('../../assets/onboarding/onboarding.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} pointerEvents="none" />

        <Animated.View style={[styles.content, contentStyle]}>
            <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to AutoCrew</Text>
            <Text style={styles.subtitle}>
                Connect with the best mechanics and car enthusiasts in your area.
            </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGetStarted} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </Animated.View>

        <AuthSheet visible={showAuth} onClose={handleCloseAuth} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // Gradient overlay for text readability at bottom
    backgroundColor: 'rgba(0,0,0,0.3)', // Slight tint over image
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 60,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});
