import * as ImagePicker from 'expo-image-picker';
import { TOAST_CONSTANTS } from '../constants/toast';
import { ToastUtils } from './toast-utils';

export interface ImageResult {
  uri: string;
  fileName: string;
}

/**
 * Utility class for image handling operations
 * Centralizes image picker, camera, and permission logic
 */
export class ImageUtils {
  /**
   * Request and check media library permissions
   * @returns true if granted, false otherwise
   */
  public static requestGalleryPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      ToastUtils.warning(
        'Permission Required',
        'Please grant access to your photo library to select images.',
        TOAST_CONSTANTS.DURATION.MEDIUM
      );
      return false;
    }

    return true;
  };

  /**
   * Request and check camera permissions
   * @returns true if granted, false otherwise
   */
  public static requestCameraPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      ToastUtils.warning(
        'Permission Required',
        'Please grant camera access to take photos.',
        TOAST_CONSTANTS.DURATION.MEDIUM
      );
      return false;
    }

    return true;
  };

  /**
   * Launch the device's image gallery/photo library
   * @param options Optional ImagePicker options
   * @returns ImageResult if image selected, null if canceled
   */
  public static pickFromGallery = async (
    options?: Partial<ImagePicker.ImagePickerOptions>
  ): Promise<ImageResult | null> => {
    const hasPermission = await ImageUtils.requestGalleryPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      ...options,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    const asset = result.assets[0];
    const fileName = asset.uri.split('/').pop() || 'board_image.jpg';

    return {
      uri: asset.uri,
      fileName,
    };
  };

  /**
   * Launch the device's camera
   * @param options Optional ImagePicker options
   * @returns ImageResult if photo taken, null if canceled
   */
  public static pickFromCamera = async (
    options?: Partial<ImagePicker.ImagePickerOptions>
  ): Promise<ImageResult | null> => {
    const hasPermission = await ImageUtils.requestCameraPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      ...options,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    const asset = result.assets[0];
    const fileName = `board_${Date.now()}.jpg`;

    return {
      uri: asset.uri,
      fileName,
    };
  };
}
