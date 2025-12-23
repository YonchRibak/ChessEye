import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import type { BoardEditorUIConfig } from 'react-native-chess-board-editor';
import { BoardEditor } from 'react-native-chess-board-editor';
import { Text, XStack, YStack } from 'tamagui';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCorrectionMutation } from '../hooks/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { ChessUtils } from '../utils/chess-utils';

type PredictionScreenRouteProp = RouteProp<RootStackParamList, 'Prediction'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Prediction'>;

/**
 * Prediction Screen
 * Displays predicted chess board and allows editing/correction
 */
export default function PredictionScreen() {
  const route = useRoute<PredictionScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { predictionData } = route.params;

  console.log('[PredictionScreen] Received prediction data:', JSON.stringify(predictionData, null, 2));

  const [correctedFen, setCorrectedFen] = useState<string | null>(null);
  const correctionMutation = useCorrectionMutation();

  // Validate prediction data
  const isEmptyBoard = predictionData.fen ? ChessUtils.isEmptyBoard(predictionData.fen) : true;
  const pieceCount = predictionData.fen ? ChessUtils.countPieces(predictionData.fen) : 0;
  const confidenceScore = predictionData.confidence_score || 0;
  const isLowConfidence = confidenceScore < 0.3;
  const isPlayablePosition = predictionData.fen ? ChessUtils.isValidPlayablePosition(predictionData.fen) : false;
  const hasValidPrediction = predictionData.success && predictionData.fen && !isEmptyBoard && pieceCount >= 2;

  const handlePositionChange = (fen: string) => {
    setCorrectedFen(fen);
  };

  // UI configuration for BoardEditor
  const uiConfig: BoardEditorUIConfig = {
    showFenDisplay: true,
    fenEditable: false, // Users edit via board interaction, not text
    showCastlingRights: true,
    showEnPassantInput: true,
    showTurnToggler: true,
    showPieceBank: true, // Now enabled with draggable pieces
    bankLayout: 'horizontal',
    flipped: false,
  };

  const handleSubmitCorrection = async () => {
    if (!correctedFen || !predictionData.prediction_id) {
      return;
    }

    try {
      await correctionMutation.mutateAsync({
        prediction_id: predictionData.prediction_id,
        corrected_fen: correctedFen,
      });

      // Navigate back to Upload screen
      navigation.navigate('Upload');
    } catch (error) {
      console.error('Failed to submit correction:', error);
    }
  };

  const handleNewPosition = () => {
    navigation.navigate('Upload');
  };

  return (
    <ScrollView>
      <YStack
        flex={1}
        backgroundColor="$background"
        paddingHorizontal="$4"
        paddingVertical="$6"
        gap="$4"
      >
        {/* Header */}
        <YStack alignItems="center" gap="$2">
          <Text fontSize="$7" fontWeight="700" color="$gray12">
            {hasValidPrediction ? 'Position Detected' : 'Detection Failed'}
          </Text>

          {predictionData.success && confidenceScore > 0 && (
            <Card variant="filled">
              <XStack gap="$2" alignItems="center">
                <Text fontSize="$4" color="$gray11">
                  Confidence:
                </Text>
                <Text fontSize="$6" fontWeight="700" color={isLowConfidence ? '$orange10' : '$blue10'}>
                  {`${(confidenceScore * 100).toFixed(1)}%`}
                </Text>
              </XStack>
            </Card>
          )}

          {isLowConfidence && hasValidPrediction && (
            <Card variant="outlined">
              <Text fontSize="$3" color="$orange10" textAlign="center">
                ⚠️ Low confidence prediction - please review carefully
              </Text>
            </Card>
          )}

          {hasValidPrediction && !isPlayablePosition && (
            <Card variant="outlined">
              <YStack gap="$2">
                <Text fontSize="$3" fontWeight="600" color="$orange10" textAlign="center">
                  ⚠️ Invalid Chess Position
                </Text>
                <Text fontSize="$2" color="$gray11" textAlign="center">
                  This position is missing required pieces (kings). Drag pieces to correct the position.
                </Text>
              </YStack>
            </Card>
          )}
        </YStack>

        {/* Chessboard */}
        {hasValidPrediction ? (
          <BoardEditor
            initialFen={predictionData.fen ? predictionData.fen : ChessUtils.getStartingFen()  }
            onFenChange={handlePositionChange}
            uiConfig={uiConfig}
            squareSize={45}
            lightSquareColor="#F0D9B5"
            darkSquareColor="#B58863"
          />
        ) : (
          <Card variant="outlined">
            <YStack gap="$2" alignItems="center">
              <Text fontSize="$5" fontWeight="600" color="$red10" textAlign="center">
                {isEmptyBoard ? 'Empty Board Detected' : 'Detection Failed'}
              </Text>
              <Text fontSize="$3" color="$gray11" textAlign="center">
                {isEmptyBoard
                  ? 'No chess pieces were detected on the board. Please ensure the image is clear and well-lit.'
                  : pieceCount < 2
                  ? `Only ${pieceCount} piece(s) detected. This may not be a valid chess position.`
                  : predictionData.message || 'Unable to detect chess position. Please try another image.'}
              </Text>
            </YStack>
          </Card>
        )}

        {/* Action Buttons */}
        <YStack gap="$3" marginTop="$4">
          {hasValidPrediction && (
            <Button
              variant="primary"
              size="$5"
              onPress={handleSubmitCorrection}
              disabled={!correctedFen || correctionMutation.isPending}
            >
              {correctionMutation.isPending ? 'Submitting...' : 'Submit Correction'}
            </Button>
          )}

          <Button
            variant="outline"
            size="$5"
            onPress={handleNewPosition}
          >
            Analyze New Position
          </Button>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
