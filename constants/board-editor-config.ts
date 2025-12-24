import type { BoardEditorUIConfig } from 'react-native-chess-board-editor';
import { PREDICTION_CONSTANTS } from './prediction';

/**
 * Default UI configuration for the BoardEditor component
 * Used in PredictionScreen for displaying and editing chess positions
 */
export const DEFAULT_BOARD_EDITOR_CONFIG: BoardEditorUIConfig = {
  flipped: false,
  pieceBank: {
    show: true,
    layout: 'horizontal',
    pieceSize: PREDICTION_CONSTANTS.BOARD_CONFIG.pieceBankSize,
  },
  editableBoard: {
    coordinateLabels: {
      show: true,
    },
  },
  fenDisplay: {
    show: true,
    editable: false, // Users edit via board interaction, not text
  },
  editorToolsPanel: {
    show: true,
    showTurnToggler: true,
    showCastlingRights: true,
    showEnPassantInput: true,
  },
};
