import React from 'react';
import { Image } from 'react-native';
import { Text, XStack } from 'tamagui';
import { HamburgerMenu } from './hamburger-menu';

/**
 * Global navigation bar component
 *
 * @example
 * ```tsx
 * <Navbar />
 * <NavigationContainer>
 *   <AppNavigator />
 * </NavigationContainer>
 * ```
 */
export function Navbar() {
  return (
    <XStack
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$gray6"
      paddingHorizontal="$4"
      paddingTop="$10"
      paddingBottom="$3"
      alignItems="center"
      justifyContent="space-between"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.05}
      shadowRadius={4}
      elevation={2}
      zIndex={999}
    >
      {/* App Logo on Left */}
      <Image
        source={require('../../assets/chesseye-logo.png')}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />

      {/* Centered Title */}
      <XStack flex={1} alignItems="center" justifyContent="center">
        <Text
          fontSize="$7"
          fontWeight="700"
          color="$gray12"
        >
          ChessEye
        </Text>
      </XStack>

      {/* Navigation Menu on Right */}
      <HamburgerMenu />
    </XStack>
  );
}
