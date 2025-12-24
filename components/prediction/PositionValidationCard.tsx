import React from 'react';
import { Text, XStack, YStack } from 'tamagui';
import { PREDICTION_COMPONENT_CONSTANTS } from '../../constants/prediction-components';
import { Card } from '../ui/card';

interface PositionValidationCardProps {
  confidenceScore: number;
  isLowConfidence: boolean;
  positionValidationError: string | null;
}

/**
 * Displays confidence score, validation errors, and warnings
 * Shows visual indicators for low confidence predictions
 */
export function PositionValidationCard({
  confidenceScore,
  isLowConfidence,
  positionValidationError,
}: PositionValidationCardProps) {
  const { CONFIDENCE_LABEL, INVALID_POSITION_TITLE, LOW_CONFIDENCE_WARNING, MIN_CARD_WIDTH } =
    PREDICTION_COMPONENT_CONSTANTS.VALIDATION;

  return (
    <>
      {/* Confidence and Warnings Row */}
      <XStack gap="$3" flexWrap="wrap">
        {confidenceScore > 0 && (
          <Card variant="filled" flex={1} minWidth={MIN_CARD_WIDTH}>
            <XStack gap="$2" alignItems="center">
              <Text fontSize="$4" color="$gray11">
                {CONFIDENCE_LABEL}
              </Text>
              <Text fontSize="$6" fontWeight="700" color={isLowConfidence ? '$orange10' : '$blue10'}>
                {`${(confidenceScore * 100).toFixed(1)}%`}
              </Text>
            </XStack>
          </Card>
        )}

        {positionValidationError && (
          <Card variant="outlined" flex={1} minWidth={MIN_CARD_WIDTH}>
            <YStack gap="$2">
              <Text fontSize="$3" fontWeight="600" color="$orange10" textAlign="center">
                {INVALID_POSITION_TITLE}
              </Text>
              <Text fontSize="$2" color="$gray11" textAlign="center">
                {positionValidationError}
              </Text>
            </YStack>
          </Card>
        )}
      </XStack>

      {/* Low Confidence Warning */}
      {isLowConfidence && (
        <Card variant="outlined">
          <Text fontSize="$3" color="$orange10" textAlign="center">
            {LOW_CONFIDENCE_WARNING}
          </Text>
        </Card>
      )}
    </>
  );
}
