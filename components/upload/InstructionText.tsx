import React from 'react';
import { Text, YStack } from 'tamagui';
import { UPLOAD_CONSTANTS } from '../../constants/upload';

/**
 * Displays instructional text for the upload screen
 * Guides users on what to upload
 */
export function InstructionText() {
  return (
    <YStack alignItems="center" paddingHorizontal="$4">
      <Text fontSize="$5" color="$gray11" textAlign="center" lineHeight="$5">
        {UPLOAD_CONSTANTS.INSTRUCTIONS.TEXT}
      </Text>
    </YStack>
  );
}
