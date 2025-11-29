import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './config/queryClient';
import AppNavigator from './navigation/AppNavigator';


export default function App() {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    </SafeAreaProvider>
  );
}