import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { TamaguiProvider, YStack } from 'tamagui';
import { Navbar } from './components/navigation/navbar';
import { toastConfig } from './components/ui/toast-config';
import { queryClient } from './config/queryClient';
import AppNavigator from './navigation/AppNavigator';
import tamaguiConfig from './tamagui.config';
import { GlobalErrorHandler } from './utils/error-handler';

// Configure Reanimated logger to suppress strict mode warnings
// These warnings come from react-native-chessboard library's internal usage
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode warnings
});

// Install global error handler to catch chess.js errors from illegal positions
// This prevents app crashes when dragging pieces on invalid chess positions
GlobalErrorHandler.install();


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <YStack flex={1}>
                <Navbar />
                <AppNavigator />
              </YStack>
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaProvider>
        <Toast config={toastConfig} />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}