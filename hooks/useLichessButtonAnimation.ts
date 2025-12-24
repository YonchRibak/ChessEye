import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { PREDICTION_CONSTANTS } from '../constants/prediction';
import type { SubmissionState } from './useSubmissionFlow';

/**
 * Custom hook to manage Lichess button animation
 * Animates scale and opacity when transitioning to redirect state
 * Uses spring animation for scale and smooth fade for opacity
 */
export function useLichessButtonAnimation(submissionState: SubmissionState) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (submissionState === 'redirect') {
      // Reset to starting values
      scaleAnim.setValue(PREDICTION_CONSTANTS.ANIMATION_INITIAL_SCALE);
      opacityAnim.setValue(PREDICTION_CONSTANTS.ANIMATION_INITIAL_OPACITY);

      // Animate with spring effect for scale and smooth fade for opacity
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: PREDICTION_CONSTANTS.SPRING_FRICTION,
          tension: PREDICTION_CONSTANTS.SPRING_TENSION,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: PREDICTION_CONSTANTS.ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [submissionState, scaleAnim, opacityAnim]);

  return {
    scaleAnim,
    opacityAnim,
  };
}
