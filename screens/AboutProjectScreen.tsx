import React from 'react';
import { Text, YStack } from 'tamagui';

/**
 * About Project Screen - Placeholder
 * Displays information about the ChessEye project
 */
export default function AboutProjectScreen() {
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingHorizontal="$4"
      paddingVertical="$6"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="$7" fontWeight="700" color="$gray12">
        About ChessEye
      </Text>
      <Text fontSize="$4" color="$gray10" marginTop="$3">
        Content coming soon...
      </Text>
    </YStack>
  );
}
