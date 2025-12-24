import React from 'react';
import { Text, YStack } from 'tamagui';
import { PREDICTION_COMPONENT_CONSTANTS } from '../../constants/prediction-components';
import { Card } from '../ui/card';

interface DetectionFailedMessageProps {
  message?: string | null;
}

/**
 * Displays error message when API call fails or prediction is unsuccessful
 * Only renders when predictionData.success is false
 */
export function DetectionFailedMessage({ message }: DetectionFailedMessageProps) {
  const { TITLE, FALLBACK_MESSAGE } = PREDICTION_COMPONENT_CONSTANTS.DETECTION_FAILED;

  return (
    <Card variant="outlined">
      <YStack gap="$2" alignItems="center">
        <Text fontSize="$5" fontWeight="600" color="$red10" textAlign="center">
          {TITLE}
        </Text>
        <Text fontSize="$3" color="$gray11" textAlign="center">
          {message || FALLBACK_MESSAGE}
        </Text>
      </YStack>
    </Card>
  );
}
