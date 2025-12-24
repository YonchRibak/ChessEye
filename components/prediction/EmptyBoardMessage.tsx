import React from 'react';
import { Text, YStack } from 'tamagui';
import { PREDICTION_COMPONENT_CONSTANTS } from '../../constants/prediction-components';
import { Card } from '../ui/card';

interface EmptyBoardMessageProps {
  isEmptyBoard: boolean;
  pieceCount: number;
  message?: string | null;
}

/**
 * Displays error message when prediction fails or board is empty
 * Shows different messages based on detection failure type
 */
export function EmptyBoardMessage({ isEmptyBoard, pieceCount, message }: EmptyBoardMessageProps) {
  const title = isEmptyBoard
    ? PREDICTION_COMPONENT_CONSTANTS.EMPTY_BOARD.TITLE
    : PREDICTION_COMPONENT_CONSTANTS.DETECTION_FAILED.TITLE;

  const description = isEmptyBoard
    ? PREDICTION_COMPONENT_CONSTANTS.EMPTY_BOARD.DESCRIPTION
    : pieceCount < 2
    ? `Only ${pieceCount} piece(s) detected. This may not be a valid chess position.`
    : message || PREDICTION_COMPONENT_CONSTANTS.DETECTION_FAILED.FALLBACK_MESSAGE;

  return (
    <Card variant="outlined">
      <YStack gap="$2" alignItems="center">
        <Text fontSize="$5" fontWeight="600" color="$red10" textAlign="center">
          {title}
        </Text>
        <Text fontSize="$3" color="$gray11" textAlign="center">
          {description}
        </Text>
      </YStack>
    </Card>
  );
}
