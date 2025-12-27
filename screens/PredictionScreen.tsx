import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { BoardEditor } from 'react-native-chess-board-editor';
import { YStack } from 'tamagui';

import { COLORS } from '@/constants/theme';
import { DetectionFailedMessage } from '../components/prediction/DetectionFailedMessage';
import { EmptyBoardMessage } from '../components/prediction/EmptyBoardMessage';
import { PositionValidationCard } from '../components/prediction/PositionValidationCard';
import { PredictionStatusIndicator } from '../components/prediction/PredictionStatusIndicator';
import { SubmissionButton } from '../components/prediction/SubmissionButton';
import { ServiceToggler } from '../components/ServiceToggler';
import { Button } from '../components/ui/button';
import { DEFAULT_BOARD_EDITOR_CONFIG } from '../constants/board-editor-config';
import { PREDICTION_CONSTANTS } from '../constants/prediction';
import { useCorrectionMutation, usePredictPositionMutation } from '../hooks/api';
import { useLichessButtonAnimation } from '../hooks/useLichessButtonAnimation';
import { useSubmissionFlow } from '../hooks/useSubmissionFlow';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type * as ApiTypes from '../types/api';
import { ChessUtils } from '../utils/chess-utils';
import { PredictionUtils } from '../utils/prediction-utils';

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


  // Track the current prediction data (can be updated when switching services)
  const [predictionData, setPredictionData] = useState<ApiTypes.PredictionResponse>(initialPredictionData);
  const [correctedFen, setCorrectedFen] = useState<string | null>(null);

  // API mutations
  const correctionMutation = useCorrectionMutation();
  const predictMutation = usePredictPositionMutation();

  // Submission flow management (state, handlers, timer cleanup)
  const { submissionState, handleSubmit, handleOpenLichess } = useSubmissionFlow({
    correctionMutation,
    predictionId: predictionData.prediction_id,
    correctedFen,
  });

  // Animation for Lichess button
  const { scaleAnim, opacityAnim } = useLichessButtonAnimation(submissionState);

  // Validate prediction data and calculate UI states
  const {
    isEmptyBoard,
    confidenceScore,
    isLowConfidence,
    positionValidationError,
  } = PredictionUtils.validatePosition(predictionData, correctedFen);

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


      setPredictionData(newPrediction);
      setCorrectedFen(null); // Reset correction
    } catch (error) {
      console.log('[PredictionScreen] Failed to get fresh prediction:', error);
    }
  };

  const handleNewPosition = () => {
    navigation.navigate('Upload');
  };

  return (
    <ScrollView>
      <YStack
        flex={1}
        backgroundColor={COLORS.PRIMARY_BACKGROUND}
        paddingHorizontal="$4"
        paddingVertical="$6"
        gap="$4"
      >
        {/* Service Toggler */}
        <ServiceToggler onSwitchSuccess={handleServiceSwitch} />

        {/* Loading and error states for service switching */}
        <PredictionStatusIndicator
          isPending={predictMutation.isPending}
          isError={predictMutation.isError}
          error={predictMutation.error}
        />

        {/* Chessboard */}
        {predictionData.success ? (
          isEmptyBoard ? (
            <EmptyBoardMessage />
          ) : (
            <BoardEditor
              key={predictionData.prediction_id || 'board'} // Force re-mount on new prediction
              initialFen={predictionData.fen ? predictionData.fen : ChessUtils.getStartingFen()}
              onFenChange={handlePositionChange}
              uiConfig={DEFAULT_BOARD_EDITOR_CONFIG}
              squareSize={PREDICTION_CONSTANTS.BOARD_CONFIG.squareSize}
              lightSquareColor={PREDICTION_CONSTANTS.BOARD_CONFIG.lightSquareColor}
              darkSquareColor={PREDICTION_CONSTANTS.BOARD_CONFIG.darkSquareColor}
              containerStyle={{ alignSelf: 'center', maxWidth: '100%' }}
            />
          )
        ) : (
          <DetectionFailedMessage message={predictionData.message} />
        )}

        {/* Confidence and validation warnings */}
        {!isEmptyBoard && predictionData.success && (
          <PositionValidationCard
            confidenceScore={confidenceScore}
            isLowConfidence={isLowConfidence}
            positionValidationError={positionValidationError}
          />
        )}

        {/* Action Buttons */}
        <YStack gap="$3" marginTop="$4">
          {!isEmptyBoard && predictionData.success && (
            <SubmissionButton
              submissionState={submissionState}
              isLoading={correctionMutation.isPending}
              disabled={!correctedFen}
              onSubmit={handleSubmit}
              onOpenLichess={handleOpenLichess}
              scaleAnim={scaleAnim}
              opacityAnim={opacityAnim}
            />
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
