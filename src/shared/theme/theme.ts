import { MD3LightTheme, type MD3Theme } from 'react-native-paper';

export const appTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1565C0',
    primaryContainer: '#BBDEFB',
    secondary: '#455A64',
    surface: '#FAFBFC',
    surfaceVariant: '#ECEFF1',
    outline: '#B0BEC5',
    error: '#C62828',
  },
  roundness: 12,
};
