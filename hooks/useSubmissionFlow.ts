import { useEffect, useState } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';
import { PREDICTION_CONSTANTS } from '../constants/prediction';
import type { CorrectionRequest, CorrectionResponse } from '../types/api';
import { LichessUtils } from '../utils/lichess-utils';

/**
 * Submission state enum for button state transitions
 * - idle: Ready to submit correction
 * - success: Correction submitted successfully (shows briefly)
 * - redirect: Ready to open Lichess editor
 */
export type SubmissionState = 'idle' | 'success' | 'redirect';

interface UseSubmissionFlowParams {
  correctionMutation: UseMutationResult<CorrectionResponse, Error, CorrectionRequest, unknown>;
  predictionId: number | null | undefined;
  correctedFen: string | null;
}

/**
 * Custom hook to manage correction submission and Lichess redirect flow
 * Handles state transitions: idle → success → redirect
 * Includes automatic timer cleanup to prevent memory leaks
 */
export function useSubmissionFlow({ correctionMutation, predictionId, correctedFen }: UseSubmissionFlowParams) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [successTimer, setSuccessTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (successTimer) {
        clearTimeout(successTimer);
      }
    };
  }, [successTimer]);

  const handleSubmit = async () => {
    if (!correctedFen || !predictionId) {
      return;
    }

    try {
      await correctionMutation.mutateAsync({
        prediction_id: predictionId,
        corrected_fen: correctedFen,
      });

      // Clear any existing timer to prevent memory leaks
      if (successTimer) {
        clearTimeout(successTimer);
      }

      // Show success message
      setSubmissionState('success');

      // After configured duration, transform to Lichess button
      const timer = setTimeout(() => {
        setSubmissionState('redirect');
      }, PREDICTION_CONSTANTS.SUCCESS_MESSAGE_DURATION);

      setSuccessTimer(timer);
    } catch (error) {
      console.log('Failed to submit correction:', error);
      // Reset to idle state on error to allow retry
      setSubmissionState('idle');
    }
  };

  const handleOpenLichess = async () => {
    if (!correctedFen) {
      return;
    }

    try {
      await LichessUtils.openLichessEditor(correctedFen);
      // Stay on screen (per user preference)
    } catch (error) {
      console.log('Failed to open Lichess editor:', error);
    }
  };

  return {
    submissionState,
    handleSubmit,
    handleOpenLichess,
  };
}
