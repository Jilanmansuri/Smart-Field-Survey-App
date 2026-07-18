/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2563eb';
const tintColorDark = '#3b82f6';

export const Colors = {
  light: {
    text: '#0f172a',          // slate-900
    textSecondary: '#64748b', // slate-500
    background: '#f8fafc',    // slate-50
    card: '#ffffff',
    border: '#e2e8f0',        // slate-200
    primary: '#2563eb',       // blue-600
    primaryLight: '#eff6ff',  // blue-50
    inputBg: '#ffffff',
    inputBorder: '#cbd5e1',   // slate-300
    buttonText: '#ffffff',
    success: '#16a34a',       // green-600
    error: '#dc2626',         // red-600
    warning: '#ea580c',       // orange-600
    icon: '#64748b',          // slate-500
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#2563eb',
    tint: tintColorLight,
  },
  dark: {
    text: '#f8fafc',          // slate-50
    textSecondary: '#94a3b8', // slate-400
    background: '#090d16',    // custom deep dark blue/slate
    card: '#131c2e',          // custom card background
    border: '#1e293b',        // slate-800
    primary: '#3b82f6',       // blue-500
    primaryLight: '#1d4ed8',  // dark blue highlight
    inputBg: '#0f172a',       // slate-900
    inputBorder: '#334155',   // slate-700
    buttonText: '#ffffff',
    success: '#22c55e',       // green-500
    error: '#ef4444',         // red-500
    warning: '#f59e0b',       // orange-500
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: '#3b82f6',
    tint: tintColorDark,
  },
};

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
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
