import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from '../screens/HomeScreen';
import { appTheme } from '../shared/theme';

export function AppProvider() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={appTheme}>
          <StatusBar style="dark" />
          <HomeScreen />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
