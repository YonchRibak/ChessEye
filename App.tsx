import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';
import { Navbar } from './components/navigation/navbar';
import { queryClient } from './config/queryClient';
import AppNavigator from './navigation/AppNavigator';


export default function App() {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
            <YStack flex={1}>
                <Navbar />
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </YStack>
        </QueryClientProvider>
    </SafeAreaProvider>
  );
}