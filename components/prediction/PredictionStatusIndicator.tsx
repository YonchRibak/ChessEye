import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { PREDICTION_COMPONENT_CONSTANTS } from '../../constants/prediction-components';
import { Card } from '../ui/card';

interface PredictionStatusIndicatorProps {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Displays loading and error states for prediction operations
 * Used when switching services or re-fetching predictions
 */
export function PredictionStatusIndicator({ isPending, isError, error }: PredictionStatusIndicatorProps) {
  if (!isPending && !isError) {
    return null;
  }

  const { LOADING_MESSAGE, ERROR_TITLE, UNKNOWN_ERROR } = PREDICTION_COMPONENT_CONSTANTS.STATUS;

  if (isPending) {
    return (
      <Card variant="filled">
        <XStack gap="$3" alignItems="center" justifyContent="center">
          <ActivityIndicator size="small" />
          <Text fontSize="$4" color="$gray11">
            {LOADING_MESSAGE}
          </Text>
        </XStack>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card variant="outlined">
        <YStack gap="$2" alignItems="center">
          <Text fontSize="$4" fontWeight="600" color="$red10">
            {ERROR_TITLE}
          </Text>
          <Text fontSize="$3" color="$gray11" textAlign="center">
            {error instanceof Error ? error.message : UNKNOWN_ERROR}
          </Text>
        </YStack>
      </Card>
    );
  }

  return null;
}
