import React from 'react';
import { YStack } from 'tamagui';
import { ImageSourceButton } from '../components/upload/ImageSourceButton';
import { ProcessingIndicator } from '../components/upload/ProcessingIndicator';
import { UPLOAD_CONSTANTS } from '../constants/upload';
import { useApiConnectionTest } from '../hooks/useApiConnectionTest';
import { useImageUpload } from '../hooks/useImageUpload';

/**
 * Upload Screen - Entry point for chess board capture
 * Allows users to either select from gallery or take a photo with camera
 */
export default function UploadScreen() {
  // Test API connectivity on mount
  useApiConnectionTest();

  // Handle image upload and processing
  const { isProcessing, openGallery, openCamera } = useImageUpload();

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
      {/* Action Buttons */}
      <YStack gap="$4" width="100%" maxWidth={UPLOAD_CONSTANTS.BUTTONS.MAX_WIDTH}>
        <ImageSourceButton
          icon={UPLOAD_CONSTANTS.ICONS.CAMERA}
          label={UPLOAD_CONSTANTS.BUTTONS.CAMERA_LABEL}
          onPress={openCamera}
          variant="primary"
          disabled={isProcessing}
        />

        <ImageSourceButton
          icon={UPLOAD_CONSTANTS.ICONS.GALLERY}
          label={UPLOAD_CONSTANTS.BUTTONS.GALLERY_LABEL}
          onPress={openGallery}
          variant="outline"
          disabled={isProcessing}
          iconColor={UPLOAD_CONSTANTS.COLORS.ICON_COLOR}
        />
      </YStack>

      {/* Processing Indicator */}
      <ProcessingIndicator isVisible={isProcessing} />
    </YStack>
  );
}
