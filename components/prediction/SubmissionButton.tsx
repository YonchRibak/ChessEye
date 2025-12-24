import React from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import { Text, XStack } from 'tamagui';
import { PREDICTION_COMPONENT_CONSTANTS } from '../../constants/prediction-components';
import { Button } from '../ui/button';

type SubmissionState = 'idle' | 'success' | 'redirect';

interface SubmissionButtonProps {
  submissionState: SubmissionState;
  isLoading: boolean;
  disabled: boolean;
  onSubmit: () => void;
  onOpenLichess: () => void;
  scaleAnim: Animated.Value;
  opacityAnim: Animated.Value;
}

/**
 * Multi-state button that handles correction submission and Lichess redirect
 * States:
 * - Loading: Shows spinner while submitting
 * - Success: Shows checkmark confirmation (1.5s)
 * - Redirect: Animated Lichess button
 * - Idle: Default submit button
 */
export function SubmissionButton({
  submissionState,
  isLoading,
  disabled,
  onSubmit,
  onOpenLichess,
  scaleAnim,
  opacityAnim,
}: SubmissionButtonProps) {
  const { SUBMITTING_TEXT, SUCCESS_TEXT, LICHESS_BUTTON_TEXT, SUBMIT_BUTTON_TEXT, BUTTON_TEXT_COLOR } =
    PREDICTION_COMPONENT_CONSTANTS.SUBMISSION;

  // Loading state - show spinner + text
  if (isLoading) {
    return (
      <Button variant="primary" size="$5" disabled={true}>
        <XStack gap="$2" alignItems="center">
          <ActivityIndicator size="small" color={BUTTON_TEXT_COLOR} />
          <Text color={BUTTON_TEXT_COLOR}>{SUBMITTING_TEXT}</Text>
        </XStack>
      </Button>
    );
  }

  // Success state - show checkmark message (displays for 1.5s)
  if (submissionState === 'success') {
    return (
      <Button variant="primary" size="$5" disabled={true}>
        {SUCCESS_TEXT}
      </Button>
    );
  }

  // Redirect state - Lichess button (dark purple) with animation
  if (submissionState === 'redirect') {
    return (
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Button
          variant="primary"
          size="$5"
          backgroundColor="$purple10"
          borderColor="$purple10"
          onPress={onOpenLichess}
          disabled={false}
        >
          {LICHESS_BUTTON_TEXT}
        </Button>
      </Animated.View>
    );
  }

  // Idle state - default submit button
  return (
    <Button variant="primary" size="$5" onPress={onSubmit} disabled={disabled}>
      {SUBMIT_BUTTON_TEXT}
    </Button>
  );
}
