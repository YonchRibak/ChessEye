import { ChessUtils } from '@/utils/chess-utils';

describe('ChessUtils', () => {
  describe('validateFen()', () => {
    test('returns true for valid starting position', () => {
      const validFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.validateFen(validFen)).toBe(true);
    });

    test('returns true for valid mid-game position', () => {
      const midGameFen = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1';
      expect(ChessUtils.validateFen(midGameFen)).toBe(true);
    });

    test('returns false for invalid FEN (missing parts)', () => {
      const invalidFen = 'rnbqkbnr/pppppppp'; // Missing metadata
      expect(ChessUtils.validateFen(invalidFen)).toBe(false);
    });

    test('returns false for malformed FEN string', () => {
      const malformedFen = 'not-a-valid-fen-string';
      expect(ChessUtils.validateFen(malformedFen)).toBe(false);
    });

    test('handles empty string gracefully', () => {
      expect(ChessUtils.validateFen('')).toBe(false);
    });
  });

  describe('isValidPlayablePosition()', () => {
    test('returns true when both kings are present', () => {
      const validFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.isValidPlayablePosition(validFen)).toBe(true);
    });

    test('returns false when white king is missing', () => {
      // Missing white king (replaced with empty square)
      const noWhiteKingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
      expect(ChessUtils.isValidPlayablePosition(noWhiteKingFen)).toBe(false);
    });

    test('returns false when black king is missing', () => {
      // Missing black king
      const noBlackKingFen = 'rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.isValidPlayablePosition(noBlackKingFen)).toBe(false);
    });

    test('returns false when both kings are missing', () => {
      const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
      expect(ChessUtils.isValidPlayablePosition(emptyBoardFen)).toBe(false);
    });

    test('handles chess.js errors gracefully', () => {
      const invalidFen = 'invalid-fen-string';
      expect(ChessUtils.isValidPlayablePosition(invalidFen)).toBe(false);
    });
  });

  describe('isEmptyBoard()', () => {
    test('returns true for empty board FEN', () => {
      const emptyFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
      expect(ChessUtils.isEmptyBoard(emptyFen)).toBe(true);
    });

    test('returns true for empty string', () => {
      expect(ChessUtils.isEmptyBoard('')).toBe(true);
    });

    test('returns false for starting position', () => {
      const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.isEmptyBoard(startingFen)).toBe(false);
    });

    test('returns false for position with any pieces', () => {
      const singlePieceFen = '8/8/8/8/4P3/8/8/8 w KQkq - 0 1'; // Just one pawn
      expect(ChessUtils.isEmptyBoard(singlePieceFen)).toBe(false);
    });
  });

  describe('getPositionValidationError()', () => {
    test('returns null for valid position with both kings', () => {
      const validFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.getPositionValidationError(validFen)).toBeNull();
    });

    test('returns "White king missing" when white king is absent', () => {
      const noWhiteKingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
      expect(ChessUtils.getPositionValidationError(noWhiteKingFen)).toBe('White king missing');
    });

    test('returns "Black king missing" when black king is absent', () => {
      const noBlackKingFen = 'rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.getPositionValidationError(noBlackKingFen)).toBe('Black king missing');
    });

    test('returns "Both kings missing" for empty board', () => {
      const emptyFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
      expect(ChessUtils.getPositionValidationError(emptyFen)).toBe('Both kings missing');
    });

    test('returns "Too many white kings" when multiple white kings present', () => {
      const twoWhiteKingsFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/KNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.getPositionValidationError(twoWhiteKingsFen)).toBe('Too many white kings');
    });

    test('returns "Too many black kings" when multiple black kings present', () => {
      const twoBlackKingsFen = 'knbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.getPositionValidationError(twoBlackKingsFen)).toBe('Too many black kings');
    });

    test('returns "Invalid position" for chess.js errors', () => {
      const invalidFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR invalid-metadata';
      expect(ChessUtils.getPositionValidationError(invalidFen)).toBe('Invalid position');
    });

    test('handles null/undefined FEN gracefully', () => {
      expect(ChessUtils.getPositionValidationError(null as any)).toBe('No position available');
    });
  });

  describe('getStartingFen()', () => {
    test('returns correct starting position FEN', () => {
      const expectedFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(ChessUtils.getStartingFen()).toBe(expectedFen);
    });
  });

  describe('getPositionFromFen()', () => {
    test('extracts position part from full FEN', () => {
      const fullFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const expectedPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      expect(ChessUtils.getPositionFromFen(fullFen)).toBe(expectedPosition);
    });

    test('handles FEN with en passant metadata', () => {
      const fenWithEnPassant = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq e6 0 3';
      const expectedPosition = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R';
      expect(ChessUtils.getPositionFromFen(fenWithEnPassant)).toBe(expectedPosition);
    });

    test('returns position part for single-word input', () => {
      expect(ChessUtils.getPositionFromFen('invalid')).toBe('invalid');
    });
  });
});
