import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { ImageUtils } from '../utils/image-utils';
import { UploadUtils } from '../utils/upload-utils';
import { usePredictPositionMutation } from './api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Upload'>;

/**
 * Custom hook to manage image upload and prediction flow
 * Handles both camera capture and gallery selection
 */
export function useImageUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const predictMutation = usePredictPositionMutation();
  const navigation = useNavigation<NavigationProp>();

  /**
   * Handles the selected image by sending it for prediction
   * and navigating to the Prediction screen with results
   */
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
      UploadUtils.showPredictionError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Opens the device gallery for image selection
   */
  const openGallery = async () => {
    const result = await ImageUtils.pickFromGallery();

    if (result) {
      await handleImageSelected(result.uri, result.fileName);
    }
  };

  /**
   * Opens the device camera for photo capture
   */
  const openCamera = async () => {
    const result = await ImageUtils.pickFromCamera();

    if (result) {
      await handleImageSelected(result.uri, result.fileName);
    }
  };

  return {
    isProcessing,
    openGallery,
    openCamera,
  };
}
