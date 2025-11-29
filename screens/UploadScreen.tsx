import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { Button } from '../components/ui/button';
import { usePredictPositionMutation } from '../hooks/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { ImageUtils } from '../utils/image-utils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Upload'>;

/**
 * Upload Screen - Entry point for chess board capture
 * Allows users to either select from gallery or take a photo with camera
 */
export default function UploadScreen() {
  const navigation = useNavigation<NavigationProp>();
  const predictMutation = usePredictPositionMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelected = async (uri: string, fileName: string) => {
    setIsProcessing(true);
    try {
      const result = await predictMutation.mutateAsync({ imageUri: uri, fileName });

      // Navigate to Prediction screen with results
      navigation.navigate('Prediction', { predictionData: result });
    } catch (error) {
      Alert.alert(
        'Prediction Failed',
        error instanceof Error ? error.message : 'Unable to process the image. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const openGallery = async () => {
    const result = await ImageUtils.pickFromGallery();

    if (result) {
      await handleImageSelected(result.uri, result.fileName);
    }
  };

  const openCamera = async () => {
    const result = await ImageUtils.pickFromCamera();

    if (result) {
      await handleImageSelected(result.uri, result.fileName);
    }
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingHorizontal="$4"
      paddingVertical="$6"
      justifyContent="center"
      alignItems="center"
      gap="$6"
    >
      {/* Header Section */}
      <YStack alignItems="center" gap="$3">
        <Text
          fontSize="$9"
          fontWeight="700"
          color="$gray12"
          textAlign="center"
        >
          Capture Chess Position
        </Text>
        <Text
          fontSize="$5"
          color="$gray10"
          textAlign="center"
          maxWidth={320}
        >
          Take a photo of your chess board or select an existing image to analyze the position
        </Text>
      </YStack>

      {/* Action Buttons */}
      <YStack gap="$4" width="100%" maxWidth={400}>
        <Button
          variant="primary"
          size="$6"
          onPress={openCamera}
          disabled={isProcessing}
        >
          <XStack gap="$3" alignItems="center">
            <Ionicons name="camera" size={24} color="white" />
            <Text color="white" fontSize="$5" fontWeight="600">
              Take Photo
            </Text>
          </XStack>
        </Button>

        <Button
          variant="outline"
          size="$6"
          onPress={openGallery}
          disabled={isProcessing}
        >
          <XStack gap="$3" alignItems="center">
            <Ionicons name="images" size={24} color="$blue10" />
            <Text color="$blue10" fontSize="$5" fontWeight="600">
              Choose from Gallery
            </Text>
          </XStack>
        </Button>
      </YStack>

      {/* Processing Indicator */}
      {isProcessing && (
        <YStack gap="$2" alignItems="center">
          <Text fontSize="$4" color="$gray10">
            Analyzing board position...
          </Text>
        </YStack>
      )}
    </YStack>
  );
}
