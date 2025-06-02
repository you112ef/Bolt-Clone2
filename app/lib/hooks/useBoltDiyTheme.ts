import { useState, useEffect, useCallback } from 'react';

export type BoltDiyTheme = 'dark-oled' | 'light' | 'dark-blue-neon'; // Add more as defined
const THEME_STORAGE_KEY = 'bolt_diy_theme';
const DEFAULT_THEME: BoltDiyTheme = 'dark-oled'; // Default to OLED dark

export function useBoltDiyTheme() {
  const [theme, setThemeState] = useState<BoltDiyTheme>(DEFAULT_THEME);

  // Apply theme to HTML element
  const applyTheme = useCallback((newTheme: BoltDiyTheme) => {
    document.documentElement.setAttribute('data-boltdiy-theme', newTheme);
  }, []);

  // Set and persist theme
  const setTheme = useCallback((newTheme: BoltDiyTheme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    setThemeState(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // Effect to load initial theme from localStorage or prefers-color-scheme
  useEffect(() => {
    let initialTheme: BoltDiyTheme = DEFAULT_THEME;
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as BoltDiyTheme | null;
      if (storedTheme && ['dark-oled', 'light', 'dark-blue-neon'].includes(storedTheme)) { // Validate stored theme
        initialTheme = storedTheme;
      } else {
        // Check prefers-color-scheme if no valid theme is stored
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          initialTheme = 'dark-oled'; // Or another default dark theme if 'dark-oled' isn't the system default preference
        } else {
          initialTheme = 'light';
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      // Fallback to prefers-color-scheme if localStorage fails
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark-oled' : 'light';
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [applyTheme]);

  // Effect to listen for changes in prefers-color-scheme (if no theme is manually set)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no theme has been explicitly set by the user via localStorage
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) {
        const newSystemTheme: BoltDiyTheme = e.matches ? 'dark-oled' : 'light';
        setThemeState(newSystemTheme);
        applyTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  // It might be useful to also return the list of available themes
  const availableThemes: BoltDiyTheme[] = ['dark-oled', 'light', 'dark-blue-neon'];


  return { theme, setTheme, availableThemes };
}

// It's also good practice to have a component that applies the theme wrapper class
// or ensure the root component for bolt.diy uses it.
// For example, in your main bolt.diy layout component:
// import { useBoltDiyTheme } from '~/lib/hooks/useBoltDiyTheme';
// import themeStyles from '~/styles/boltdiy-theme.scss'; // If you need to access class names directly
//
// function BoltDiyLayout({ children }) {
//   useBoltDiyTheme(); // Initialize theme system
//   return <div className="boltdiy-theme-wrapper">{children}</div>;
// }
// This part is conceptual for integration.
