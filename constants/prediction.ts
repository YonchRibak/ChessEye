/**
 * Constants for prediction screen functionality
 * Centralizes thresholds, timing, styling, and messages
 */

export const PREDICTION_CONSTANTS = {
  // Thresholds
  LOW_CONFIDENCE_THRESHOLD: 0.3,
  MIN_PIECE_COUNT: 2,

  // Timing (in milliseconds)
  SUCCESS_MESSAGE_DURATION: 1500,
  ANIMATION_DURATION: 400,

  // Animation parameters
  SPRING_FRICTION: 4,
  SPRING_TENSION: 100,
  ANIMATION_INITIAL_SCALE: 0.95,
  ANIMATION_INITIAL_OPACITY: 0.7,

  // Board styling
  BOARD_CONFIG: {
    squareSize: 36,
    lightSquareColor: '#F0D9B5',
    darkSquareColor: '#B58863',
    pieceBankSize: 36,
  },
} as const;
