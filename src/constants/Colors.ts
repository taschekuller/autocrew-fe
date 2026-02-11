/**
 * 60-30-10 Color Rule Palette
 *
 * 60% - Background (White/Black)
 * 30% - Surface (Light Gray/Dark Gray)
 * 10% - Accent (Neon Lime)
 */

export const Colors = {
  light: {
    background: '#FFFFFF', // 60%
    surface: '#F2F2F7',    // 30%
    accent: '#d1ff6e',     // 10%
    text: '#000000',
    textSecondary: '#60646C',
    border: '#E5E5EA',
    error: '#FF3B30',
  },
  dark: {
    background: '#000000', // 60%
    surface: '#1C1C1E',    // 30%
    accent: '#d1ff6e',     // 10%
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    border: '#38383A',
    error: '#FF453A',
  },
} as const;

export type ColorTheme = keyof typeof Colors.light;
