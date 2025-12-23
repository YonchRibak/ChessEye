import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { usePredictPositionMutation } from '../hooks/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import apiService from '../services/api';
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

  // Test API connectivity on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('[UploadScreen] Testing API connection...');
        console.log('[UploadScreen] Attempting to reach:', apiService.getHealthCheck.toString().includes('http') ? 'checking...' : 'API endpoint');
        const health = await apiService.getHealthCheck();
        console.log('[UploadScreen] ✅ API connection successful:', health);
        Alert.alert('API Connected', `Successfully connected to API server!\n\nStatus: ${health.status}`);
      } catch (error) {
        console.error('[UploadScreen] ❌ API connection failed:', error);
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        Alert.alert(
          'API Connection Failed',
          `Cannot reach API server.\n\nPlease check:\n1. PC and phone on same WiFi\n2. Firewall allows port 8081\n3. Test in phone browser: http://10.0.0.4:8081/health\n\nError: ${errorMsg}`,
          [{ text: 'OK' }]
        );
      }
    };
    testConnection();
  }, []);

  const handleImageSelected = async (uri: string, fileName: string) => {
    setIsProcessing(true);
    try {
      const result = await predictMutation.mutateAsync({ imageUri: uri, fileName });

      // Navigate to Prediction screen with results and original image info for re-prediction
      navigation.navigate('Prediction', {
        predictionData: result,
        imageUri: uri,
        fileName: fileName,
      });
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
        <Pressable onPress={openCamera} disabled={isProcessing}>
          {({ pressed }) => (
            <YStack
              backgroundColor="$blue10"
              paddingVertical="$4"
              paddingHorizontal="$5"
              borderRadius="$4"
              opacity={pressed ? 0.8 : isProcessing ? 0.5 : 1}
            >
              <XStack gap="$3" alignItems="center" justifyContent="center">
                <Ionicons name="camera" size={24} color="white" />
                <Text color="white" fontSize="$5" fontWeight="600">
                  Take Photo
                </Text>
              </XStack>
            </YStack>
          )}
        </Pressable>

        <Pressable onPress={openGallery} disabled={isProcessing}>
          {({ pressed }) => (
            <YStack
              backgroundColor="transparent"
              paddingVertical="$4"
              paddingHorizontal="$5"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$blue10"
              opacity={pressed ? 0.8 : isProcessing ? 0.5 : 1}
            >
              <XStack gap="$3" alignItems="center" justifyContent="center">
                <Ionicons name="images" size={24} color="#0080ff" />
                <Text color="$blue10" fontSize="$5" fontWeight="600">
                  Choose from Gallery
                </Text>
              </XStack>
            </YStack>
          )}
        </Pressable>
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
