import { PredictionUtils } from '@/utils/prediction-utils';
import { ChessUtils } from '@/utils/chess-utils';
import type { PredictionResponse } from '@/types/api';

// Mock ChessUtils methods for controlled testing
jest.mock('@/utils/chess-utils');

describe('PredictionUtils', () => {
  describe('validatePosition()', () => {
    const mockPredictionData: PredictionResponse = {
      success: true,
      prediction_id: 123,
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      board_matrix: null,
      confidence_score: 0.95,
      processing_time_ms: 1200,
      board_detected: true,
      message: 'Success',
    };

    beforeEach(() => {
      // Set default mock returns
      (ChessUtils.isEmptyBoard as jest.Mock).mockReturnValue(false);
      (ChessUtils.getPositionValidationError as jest.Mock).mockReturnValue(null);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('returns correctedFen when available', () => {
      const result = PredictionUtils.validatePosition(mockPredictionData, 'corrected-fen-string');
      expect(result.currentFen).toBe('corrected-fen-string');
    });

    test('returns predicted FEN when correctedFen is null', () => {
      const result = PredictionUtils.validatePosition(mockPredictionData, null);
      expect(result.currentFen).toBe(mockPredictionData.fen);
    });

    test('detects empty board correctly', () => {
      (ChessUtils.isEmptyBoard as jest.Mock).mockReturnValue(true);
      const result = PredictionUtils.validatePosition(mockPredictionData, null);
      expect(result.isEmptyBoard).toBe(true);
    });

    test('calculates isLowConfidence when score < 0.3', () => {
      const lowConfData = { ...mockPredictionData, confidence_score: 0.25 };
      const result = PredictionUtils.validatePosition(lowConfData, null);
      expect(result.isLowConfidence).toBe(true);
      expect(result.confidenceScore).toBe('25%');
    });

    test('returns null positionValidationError for valid position', () => {
      (ChessUtils.getPositionValidationError as jest.Mock).mockReturnValue(null);
      const result = PredictionUtils.validatePosition(mockPredictionData, null);
      expect(result.positionValidationError).toBeNull();
    });

    test('returns error message for invalid position', () => {
      (ChessUtils.getPositionValidationError as jest.Mock).mockReturnValue('White king missing');
      const result = PredictionUtils.validatePosition(mockPredictionData, null);
      expect(result.positionValidationError).toBe('White king missing');
    });

    test('handles null FEN gracefully', () => {
      const nullFenData = { ...mockPredictionData, fen: null as any };
      const result = PredictionUtils.validatePosition(nullFenData, null);
      expect(result.positionValidationError).toBe('No position available');
    });
  });
});
