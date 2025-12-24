import { PREDICTION_CONSTANTS } from '../constants/prediction';
import type * as ApiTypes from '../types/api';
import { ChessUtils } from './chess-utils';

/**
 * Result of position validation with all calculated properties
 */
export interface PositionValidationResult {
  currentFen: string | null;
  isEmptyBoard: boolean;
  pieceCount: number;
  confidenceScore: number;
  isLowConfidence: boolean;
  positionValidationError: string | null;
  hasValidPrediction: boolean | string | null;
}

/**
 * Utility class for prediction-related operations
 */
export class PredictionUtils {
  /**
   * Validates prediction data and returns all calculated properties
   * Used to determine UI states and warnings
   *
   * @param predictionData - The prediction response from the API
   * @param correctedFen - User-corrected FEN if available
   * @returns Object containing all validation properties
   */
  static validatePosition(
    predictionData: ApiTypes.PredictionResponse,
    correctedFen: string | null
  ): PositionValidationResult {
    const currentFen = correctedFen || predictionData.fen;
    const isEmptyBoard = predictionData.fen ? ChessUtils.isEmptyBoard(predictionData.fen) : true;
    const pieceCount = predictionData.fen ? ChessUtils.countPieces(predictionData.fen) : 0;
    const confidenceScore = predictionData.confidence_score || 0;
    const isLowConfidence = confidenceScore < PREDICTION_CONSTANTS.LOW_CONFIDENCE_THRESHOLD;
    const positionValidationError = currentFen
      ? ChessUtils.getPositionValidationError(currentFen)
      : 'No position available';
    const hasValidPrediction =
      predictionData.success &&
      predictionData.fen &&
      !isEmptyBoard &&
      pieceCount >= PREDICTION_CONSTANTS.MIN_PIECE_COUNT;

    return {
      currentFen,
      isEmptyBoard,
      pieceCount,
      confidenceScore,
      isLowConfidence,
      positionValidationError,
      hasValidPrediction,
    };
  }
}
