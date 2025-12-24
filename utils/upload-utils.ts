import { Alert } from 'react-native';
import { UPLOAD_CONSTANTS } from '../constants/upload';

/**
 * Utility class for upload-related operations
 * Handles alert displays and error messaging
 */
export class UploadUtils {
  /**
   * Show success alert when API connection is established
   */
  static showApiConnectionSuccess(status: string) {
    Alert.alert(
      UPLOAD_CONSTANTS.ALERTS.API_CONNECTED.TITLE,
      UPLOAD_CONSTANTS.ALERTS.API_CONNECTED.getMessage(status)
    );
  }

  /**
   * Show error alert when API connection fails
   */
  static showApiConnectionError(errorMsg: string) {
    Alert.alert(
      UPLOAD_CONSTANTS.ALERTS.API_FAILED.TITLE,
      UPLOAD_CONSTANTS.ALERTS.API_FAILED.getMessage(errorMsg),
      [{ text: 'OK' }]
    );
  }

  /**
   * Show error alert when image prediction fails
   */
  static showPredictionError(error: unknown) {
    const errorMsg = error instanceof Error ? error.message : undefined;
    Alert.alert(
      UPLOAD_CONSTANTS.ALERTS.PREDICTION_FAILED.TITLE,
      UPLOAD_CONSTANTS.ALERTS.PREDICTION_FAILED.getMessage(errorMsg),
      [{ text: 'OK' }]
    );
  }
}
