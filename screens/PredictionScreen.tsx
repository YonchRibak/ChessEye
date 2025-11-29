import { useRoute, type RouteProp } from '@react-navigation/native';
import React from 'react';
import { Text, YStack } from 'tamagui';
import type { RootStackParamList } from '../navigation/AppNavigator';

type PredictionScreenRouteProp = RouteProp<RootStackParamList, 'Prediction'>;

/**
 * Prediction Screen - Placeholder
 * Displays predicted chess board and allows editing/correction
 */
export default function PredictionScreen() {
  const route = useRoute<PredictionScreenRouteProp>();
  const { predictionData } = route.params;

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingHorizontal="$4"
      paddingVertical="$6"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Text fontSize="$7" fontWeight="700" color="$gray12">
        Prediction Result
      </Text>

      {predictionData.success ? (
        <>
          <Text fontSize="$4" color="$gray10">
            FEN: {predictionData.fen || 'N/A'}
          </Text>
          <Text fontSize="$4" color="$gray10">
            Confidence: {predictionData.confidence_score ? `${(predictionData.confidence_score * 100).toFixed(1)}%` : 'N/A'}
          </Text>
        </>
      ) : (
        <Text fontSize="$4" color="$red10">
          {predictionData.message || 'Prediction failed'}
        </Text>
      )}

      <Text fontSize="$3" color="$gray9" marginTop="$3">
        Full UI coming soon...
      </Text>
    </YStack>
  );
}
