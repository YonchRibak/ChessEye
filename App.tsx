import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './config/queryClient';

function AppContent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App is ready and using TanStack Query!</Text>
      {/* Your navigation or screens go here */}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
        </QueryClientProvider>
    </SafeAreaProvider>
  );
}