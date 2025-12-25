import { TOAST_CONSTANTS } from '../constants/toast';
import { UPLOAD_CONSTANTS } from '../constants/upload';
import { ToastUtils } from './toast-utils';

/**
 * Utility class for upload-related operations
 * Handles toast notifications and error messaging
 */
export class UploadUtils {
  /**
   * Show error toast when API connection fails
   */
  static showApiConnectionError(errorMsg: string) {
    ToastUtils.error(
      UPLOAD_CONSTANTS.ALERTS.API_FAILED.TITLE,
      UPLOAD_CONSTANTS.ALERTS.API_FAILED.getMessage(errorMsg),
      TOAST_CONSTANTS.DURATION.LONG
    );
  }

  /**
   * Show error toast when image prediction fails
   */
  static showPredictionError(error: unknown) {
    const errorMsg = error instanceof Error ? error.message : undefined;
    ToastUtils.error(
      UPLOAD_CONSTANTS.ALERTS.PREDICTION_FAILED.TITLE,
      UPLOAD_CONSTANTS.ALERTS.PREDICTION_FAILED.getMessage(errorMsg),
      TOAST_CONSTANTS.DURATION.MEDIUM
    );
  }
}
