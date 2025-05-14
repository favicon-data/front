// src/components/ThemeProvider.tsx
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1db954',
  },
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
