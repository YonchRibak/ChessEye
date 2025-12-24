import { Chess } from 'chess.js';
import type { BoardMatrix } from '../types/api';

/**
 * Utility class for chess-related operations
 * Leverages chess.js from react-native-chessboard for FEN validation
 */
export class ChessUtils {
  /**
   * Convert FEN notation to 8x8 board matrix
   * @param fen - FEN notation string
   * @returns 8x8 matrix where each cell contains piece notation or empty string
   */
  public static fenToMatrix = (fen: string): BoardMatrix => {
    const chess = new Chess(fen);
    const board = chess.board();

    return board.map((row) =>
      row.map((square) => (square ? square.type.toUpperCase() + (square.color === 'w' ? '' : square.type) : ''))
    );
  };

  /**
   * Validate FEN notation using chess.js
   * @param fen - FEN notation string
   * @returns true if valid FEN
   */
  public static validateFen = (fen: string): boolean => {
    try {
      const chess = new Chess(fen);
      return chess.fen() !== undefined;
    } catch {
      return false;
    }
  };

  /**
   * Check if a FEN represents a valid, playable chess position
   * A valid playable position must have:
   * - Valid FEN syntax
   * - Both kings present
   * - No syntax errors when chess.js tries to parse it
   * @param fen - FEN notation string
   * @returns true if position is valid and playable
   */
  public static isValidPlayablePosition = (fen: string): boolean => {
    try {
      const chess = new Chess(fen);

      // Try to get the board state - this will fail if position is invalid
      const board = chess.board();

      // Check that both kings are present
      let whiteKingFound = false;
      let blackKingFound = false;

      for (const row of board) {
        for (const square of row) {
          if (square && square.type === 'k') {
            if (square.color === 'w') {
              whiteKingFound = true;
            } else if (square.color === 'b') {
              blackKingFound = true;
            }
          }
        }
      }

      // Position is valid if both kings are present
      return whiteKingFound && blackKingFound;
    } catch (error) {
      console.warn('[ChessUtils] Invalid chess position:', error);
      return false;
    }
  };

  /**
   * Get default starting position FEN
   * @returns Starting position FEN
   */
  public static getStartingFen = (): string => {
    return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  };

  /**
   * Extract position part from full FEN (removes turn, castling, etc.)
   * @param fen - Full FEN notation
   * @returns Position part only
   */
  public static getPositionFromFen = (fen: string): string => {
    return fen.split(' ')[0];
  };

  /**
   * Check if a FEN represents an empty board (no pieces)
   * @param fen - FEN notation string
   * @returns true if board is empty
   */
  public static isEmptyBoard = (fen: string): boolean => {
    if (!fen || fen.trim() === '') {
      return true;
    }

    // Extract position part (before first space)
    const position = fen.split(' ')[0];

    // Empty board FEN position is "8/8/8/8/8/8/8/8" (all ranks are empty)
    return position === '8/8/8/8/8/8/8/8';
  };

  /**
   * Count total pieces on the board
   * @param fen - FEN notation string
   * @returns Number of pieces on the board
   */
  public static countPieces = (fen: string): number => {
    if (!fen || fen.trim() === '') {
      return 0;
    }

    const position = fen.split(' ')[0];

    // Count all letters (pieces) in the position string
    // Pieces are represented by letters: K, Q, R, B, N, P (white) and k, q, r, b, n, p (black)
    const pieceCount = (position.match(/[a-zA-Z]/g) || []).length;

    return pieceCount;
  };

  /**
   * Get detailed validation error for a chess position
   * @param fen - FEN notation string
   * @returns Error message string if invalid, null if valid
   */
  public static getPositionValidationError = (fen: string): string | null => {
    try {
      const chess = new Chess(fen);
      const board = chess.board();

      // Count kings
      let whiteKingCount = 0;
      let blackKingCount = 0;

      for (const row of board) {
        for (const square of row) {
          if (square && square.type === 'k') {
            if (square.color === 'w') {
              whiteKingCount++;
            } else if (square.color === 'b') {
              blackKingCount++;
            }
          }
        }
      }

      // Check for missing kings
      if (whiteKingCount === 0 && blackKingCount === 0) {
        return 'Both kings missing';
      }
      if (whiteKingCount === 0) {
        return 'White king missing';
      }
      if (blackKingCount === 0) {
        return 'Black king missing';
      }

      // Check for too many kings
      if (whiteKingCount > 1 && blackKingCount > 1) {
        return 'Too many kings';
      }
      if (whiteKingCount > 1) {
        return 'Too many white kings';
      }
      if (blackKingCount > 1) {
        return 'Too many black kings';
      }

      // Position is valid
      return null;
    } catch (error) {
      // Chess.js threw an error (invalid FEN structure, illegal position, etc.)
      return 'Invalid position structure';
    }
  };
}
