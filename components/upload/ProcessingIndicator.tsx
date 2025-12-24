import React from 'react';
import { Text, YStack } from 'tamagui';
import { UPLOAD_CONSTANTS } from '../../constants/upload';

interface ProcessingIndicatorProps {
  isVisible: boolean;
  message?: string;
}

/**
 * Displays a processing indicator with optional message
 * Used when analyzing/uploading images
 */
export function ProcessingIndicator({ isVisible, message }: ProcessingIndicatorProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <YStack gap="$2" alignItems="center">
      <Text fontSize="$4" color="$gray10">
        {message || UPLOAD_CONSTANTS.PROCESSING.MESSAGE}
      </Text>
    </YStack>
  );
}
