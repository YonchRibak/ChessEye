import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

/**
 * Utility class for Lichess board editor integration
 * Centralizes URL generation and browser opening logic
 */
export class LichessUtils {
  /**
   * Base URL for Lichess board editor
   */
  private static readonly EDITOR_BASE_URL = 'https://lichess.org/editor';

  /**
   * Generates a Lichess editor URL with the provided FEN position
   * @param fen - Chess position in FEN notation
   * @returns Fully formatted Lichess editor URL with encoded FEN
   *
   * @example
   * // Starting position
   * const url = LichessUtils.generateEditorUrl('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
   * // Returns: 'https://lichess.org/editor/rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201'
   */
  public static generateEditorUrl = (fen: string): string => {
    if (!fen || fen.trim() === '') {
      throw new Error('FEN notation cannot be empty');
    }

    // URL encode the FEN string to handle special characters (/, spaces, etc.)
    const encodedFen = encodeURIComponent(fen.trim());

    return `${LichessUtils.EDITOR_BASE_URL}/${encodedFen}`;
  };

  /**
   * Opens the Lichess board editor in a browser with the specified FEN position
   * - On native (iOS/Android): Opens in-app browser
   * - On web: Opens in new tab
   *
   * @param fen - Chess position in FEN notation
   * @returns Promise that resolves when browser is opened
   * @throws Error if FEN is invalid or browser fails to open
   *
   * @example
   * await LichessUtils.openLichessEditor('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
   */
  public static openLichessEditor = async (fen: string): Promise<void> => {
    try {
      const url = LichessUtils.generateEditorUrl(fen);

      // On native platforms, use in-app browser
      // On web, this will open in a new tab via standard behavior
      if (process.env.EXPO_OS !== 'web') {
        await openBrowserAsync(url, {
          presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
        });
      } else {
        // Web fallback - open in new tab
        window.open(url, '_blank');
      }

      console.log(`Opened Lichess editor with FEN: ${fen}`);
    } catch (error) {
      console.error('Failed to open Lichess editor:', error);
      throw new Error(
        error instanceof Error
          ? `Failed to open Lichess: ${error.message}`
          : 'Failed to open Lichess editor'
      );
    }
  };

  /**
   * Validates if a FEN string has the basic structure required for Lichess
   * Note: This is a basic validation, not a complete chess rules validation
   *
   * @param fen - FEN notation string to validate
   * @returns true if FEN has valid structure, false otherwise
   */
  public static isValidFenStructure = (fen: string): boolean => {
    if (!fen || typeof fen !== 'string') {
      return false;
    }

    // Basic FEN structure: should have at least board position and turn
    // Full FEN: "position turn castling enpassant halfmove fullmove"
    const parts = fen.trim().split(/\s+/);

    // Must have at least 2 parts (position and turn)
    if (parts.length < 2) {
      return false;
    }

    // Board position should have 8 ranks separated by /
    const position = parts[0];
    const ranks = position.split('/');

    return ranks.length === 8;
  };
}
