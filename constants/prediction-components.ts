/**
 * UI Constants for Prediction Components
 * Centralizes all text, messages, and UI values used in prediction-related components
 */

export const PREDICTION_COMPONENT_CONSTANTS = {
  // EmptyBoardMessage
  EMPTY_BOARD: {
    TITLE: 'Empty Board Detected',
    DESCRIPTION: 'No chess pieces were detected on the board. Please ensure the image is clear and well-lit.',
  },

  DETECTION_FAILED: {
    TITLE: 'Detection Failed',
    FALLBACK_MESSAGE: 'Unable to detect chess position. Please try another image.',
  },

  // PositionValidationCard
  VALIDATION: {
    CONFIDENCE_LABEL: 'Confidence:',
    INVALID_POSITION_TITLE: '⚠️ Invalid Position',
    LOW_CONFIDENCE_WARNING: '⚠️ Low confidence prediction - please review carefully',
    MIN_CARD_WIDTH: 150,
  },

  // PredictionStatusIndicator
  STATUS: {
    LOADING_MESSAGE: 'Getting prediction from new service...',
    ERROR_TITLE: 'Failed to get new prediction',
    UNKNOWN_ERROR: 'Unknown error occurred',
  },

  // SubmissionButton
  SUBMISSION: {
    SUBMITTING_TEXT: 'Submitting...',
    SUCCESS_TEXT: '✓ Correction Submitted!',
    LICHESS_BUTTON_TEXT: 'Lichess Board Editor',
    SUBMIT_BUTTON_TEXT: 'Submit Correction',
    BUTTON_TEXT_COLOR: 'white',
  },
} as const;
