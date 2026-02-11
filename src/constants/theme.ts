/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

import { Colors as Pallete } from './Colors';

export const Colors = {
  light: {
    text: Pallete.light.text,
    background: Pallete.light.background,
    backgroundElement: Pallete.light.surface,
    backgroundSelected: '#E0E1E6', // Keeping existing or updating if needed
    textSecondary: Pallete.light.textSecondary,
    tint: Pallete.light.accent,
    tabIconDefault: '#687076',
    tabIconSelected: Pallete.light.accent, // Using accent for active tab
    tabBarBackground: 'rgba(255, 255, 255, 0.5)',
    indicator: '#e5e5e5',
    // New design tokens
    surface: Pallete.light.surface,
    accent: Pallete.light.accent,
    border: Pallete.light.border,
    error: Pallete.light.error,
  },
  dark: {
    text: Pallete.dark.text,
    background: Pallete.dark.background,
    backgroundElement: Pallete.dark.surface,
    backgroundSelected: '#2E3135',
    textSecondary: Pallete.dark.textSecondary,
    tint: Pallete.dark.accent,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Pallete.dark.accent,
    tabBarBackground: 'rgba(0, 0, 0, 0.5)',
    indicator: '#333333',
    // New design tokens
    surface: Pallete.dark.surface,
    accent: Pallete.dark.accent,
    border: Pallete.dark.border,
    error: Pallete.dark.error,
  },
  gradients: {
    home: ['#8E2DE2', '#4A00E0'] as const,
    profile: ['#00c6ff', '#0072ff'] as const,
    myCar: ['#f12711', '#f5af19'] as const,
    servicePoints: ['#11998e', '#38ef7d'] as const,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
