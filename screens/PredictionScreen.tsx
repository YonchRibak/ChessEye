import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import type { BoardEditorUIConfig } from 'react-native-chess-board-editor';
import { BoardEditor } from 'react-native-chess-board-editor';
import { Text, XStack, YStack } from 'tamagui';
import { ServiceToggler } from '../components/ServiceToggler';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCorrectionMutation, usePredictPositionMutation } from '../hooks/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type * as ApiTypes from '../types/api';
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
  const { predictionData: initialPredictionData, imageUri, fileName } = route.params;

  console.log('[PredictionScreen] Received prediction data:', JSON.stringify(initialPredictionData, null, 2));
  console.log('[PredictionScreen] Image URI:', imageUri);

  // Track the current prediction data (can be updated when switching services)
  const [predictionData, setPredictionData] = useState<ApiTypes.PredictionResponse>(initialPredictionData);
  const [correctedFen, setCorrectedFen] = useState<string | null>(null);

  const correctionMutation = useCorrectionMutation();
  const predictMutation = usePredictPositionMutation();

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

  // Handler for when service is switched - triggers fresh prediction
  const handleServiceSwitch = async () => {
    console.log('[PredictionScreen] Service switched, getting fresh prediction...');
    try {
      const newPrediction = await predictMutation.mutateAsync({
        imageUri,
        fileName,
      });

      console.log('[PredictionScreen] Fresh prediction received:', newPrediction);
      setPredictionData(newPrediction);
      setCorrectedFen(null); // Reset correction
    } catch (error) {
      console.error('[PredictionScreen] Failed to get fresh prediction:', error);
    }
  };

  // UI configuration for BoardEditor (v2.0 API)
  const uiConfig: BoardEditorUIConfig = {
    flipped: false,
    pieceBank: {
      show: true,
      layout: 'horizontal',
      pieceSize: 36,
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
        {/* Service Toggler */}
        <ServiceToggler onSwitchSuccess={handleServiceSwitch} />

        {/* Loading indicator for re-prediction */}
        {predictMutation.isPending && (
          <Card variant="filled">
            <XStack gap="$3" alignItems="center" justifyContent="center">
              <ActivityIndicator size="small" />
              <Text fontSize="$4" color="$gray11">
                Getting prediction from new service...
              </Text>
            </XStack>
          </Card>
        )}

        {/* Error indicator for failed re-prediction */}
        {predictMutation.isError && (
          <Card variant="outlined">
            <YStack gap="$2" alignItems="center">
              <Text fontSize="$4" fontWeight="600" color="$red10">
                Failed to get new prediction
              </Text>
              <Text fontSize="$3" color="$gray11" textAlign="center">
                {predictMutation.error instanceof Error ? predictMutation.error.message : 'Unknown error occurred'}
              </Text>
            </YStack>
          </Card>
        )}

        {/* Chessboard */}
        {hasValidPrediction ? (
          <BoardEditor
            key={predictionData.prediction_id || 'board'} // Force re-mount on new prediction
            initialFen={predictionData.fen ? predictionData.fen : ChessUtils.getStartingFen()  }
            onFenChange={handlePositionChange}
            uiConfig={uiConfig}
            squareSize={36}
            lightSquareColor="#F0D9B5"
            darkSquareColor="#B58863"
            containerStyle={{ alignSelf: 'center', maxWidth: '100%' }}
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

        {/* Confidence and Warnings Row */}
        {hasValidPrediction && (
          <XStack gap="$3" flexWrap="wrap">
            {predictionData.success && confidenceScore > 0 && (
              <Card variant="filled" flex={1} minWidth={150}>
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

            {!isPlayablePosition && (
              <Card variant="outlined" flex={1} minWidth={150}>
                <YStack gap="$2">
                  <Text fontSize="$3" fontWeight="600" color="$orange10" textAlign="center">
                    ⚠️ Invalid Position
                  </Text>
                  <Text fontSize="$2" color="$gray11" textAlign="center">
                    Missing required pieces (kings)
                  </Text>
                </YStack>
              </Card>
            )}
          </XStack>
        )}

        {isLowConfidence && hasValidPrediction && (
          <Card variant="outlined">
            <Text fontSize="$3" color="$orange10" textAlign="center">
              ⚠️ Low confidence prediction - please review carefully
            </Text>
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
