/**
 * Toast notification configuration constants
 * Following the existing constants pattern in ChessEye
 */

export const TOAST_CONSTANTS = {
  /**
   * Toast duration values in milliseconds
   */
  DURATION: {
    /** Short duration for simple success/error messages - 2 seconds */
    SHORT: 2000,
    /** Medium duration for standard messages - 4 seconds */
    MEDIUM: 4000,
    /** Long duration for detailed error messages - 6 seconds */
    LONG: 6000,
    /** No auto-dismiss - requires manual dismissal */
    PERSISTENT: 0,
  },

  /**
   * Toast positioning on screen
   */
  POSITION: {
    /** Top of screen (below navbar) */
    DEFAULT: 'top' as const,
    /** Bottom of screen */
    BOTTOM: 'bottom' as const,
  },

  /**
   * Offset from screen edges in pixels
   */
  OFFSET: {
    /** Top offset to position below navbar */
    TOP: 60,
    /** Bottom offset for spacing */
    BOTTOM: 20,
  },

  /**
   * Animation configuration
   */
  ANIMATION: {
    /** Animation duration in milliseconds */
    DURATION: 300,
  },
} as const;
