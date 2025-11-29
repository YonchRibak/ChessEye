import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, YStack } from 'tamagui';
import { Navbar } from './components/navigation/navbar';
import { queryClient } from './config/queryClient';
import AppNavigator from './navigation/AppNavigator';
import tamaguiConfig from './tamagui.config';


export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <YStack flex={1}>
              <Navbar />
              <AppNavigator />
            </YStack>
          </NavigationContainer>
        </QueryClientProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}