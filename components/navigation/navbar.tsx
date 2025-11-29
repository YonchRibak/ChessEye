import React from 'react';
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
      paddingVertical="$3"
      alignItems="center"
      justifyContent="space-between"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.05}
      shadowRadius={4}
      elevation={2}
      zIndex={999}
    >
      {/* App Logo/Title */}
      <XStack alignItems="center" gap="$2">
        <Text
          fontSize="$7"
          fontWeight="700"
          color="$gray12"
        >
          ♟️ ChessEye
        </Text>
      </XStack>

      {/* Navigation Menu */}
      <HamburgerMenu />
    </XStack>
  );
}
