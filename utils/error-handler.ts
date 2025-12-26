/**
 * Global error handler for catching chess.js errors during drag operations
 * These errors occur in event handlers, which Error Boundaries cannot catch
 */
export class GlobalErrorHandler {
  private static originalHandler: any = null;

  /**
   * Install global error handler
   * Should be called once during app initialization
   */
  public static install() {
    console.log('[GlobalErrorHandler] Install called');

    // Check if ErrorHandler is available (it might not be in all environments)
    const ErrorUtils = (global as any).ErrorUtils;

    if (!ErrorUtils) {
      console.warn('[GlobalErrorHandler] ErrorUtils not available - skipping installation');
      return;
    }

    if (this.originalHandler) {
      console.warn('[GlobalErrorHandler] Already installed');
      return;
    }

    try {
      // Save the original error handler
      this.originalHandler = ErrorUtils.getGlobalHandler();

      // Set custom error handler
      ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
        // Check if this is a chess.js error from illegal positions
        const isChessError =
          error?.message?.includes('chess.js') ||
          error?.stack?.includes('Chess#') ||
          error?.stack?.includes('chess-board-editor') ||
          // Only treat generic property errors as chess errors if stack trace confirms it
          (error?.message?.includes("Cannot read property 'type'") &&
            (error?.stack?.includes('Chess') || error?.stack?.includes('chess')));

        if (isChessError) {
          console.warn('[GlobalErrorHandler] Caught chess.js error (non-fatal):', error.message);

          // Don't crash the app for chess validation errors
          // Just log them and continue
          return;
        }

        // For all other errors, call the original handler
        if (this.originalHandler) {
          this.originalHandler(error, isFatal);
        } else {
          // Fallback: log the error
          console.log('[GlobalErrorHandler] Uncaught error:', error);
          if (isFatal) {
            throw error;
          }
        }
      });

      console.log('[GlobalErrorHandler] Installed successfully');
    } catch (error) {
      console.log('[GlobalErrorHandler] Failed to install:', error);
    }
  }

  /**
   * Uninstall global error handler (restore original)
   */
  public static uninstall() {
    const ErrorUtils = (global as any).ErrorUtils;

    if (!ErrorUtils) {
      return;
    }

    if (this.originalHandler) {
      ErrorUtils.setGlobalHandler(this.originalHandler);
      this.originalHandler = null;
      console.log('[GlobalErrorHandler] Uninstalled');
    }
  }
}
