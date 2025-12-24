import { useEffect } from 'react';
import apiService from '../services/api';
import { UploadUtils } from '../utils/upload-utils';

/**
 * Custom hook to test API connectivity on mount
 * Displays success or error alert to the user
 */
export function useApiConnectionTest() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('[UploadScreen] Testing API connection...');
        console.log(
          '[UploadScreen] Attempting to reach:',
          apiService.getHealthCheck.toString().includes('http') ? 'checking...' : 'API endpoint'
        );
        const health = await apiService.getHealthCheck();
        console.log('[UploadScreen] ✅ API connection successful:', health);
        UploadUtils.showApiConnectionSuccess(health.status);
      } catch (error) {
        console.error('[UploadScreen] ❌ API connection failed:', error);
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        UploadUtils.showApiConnectionError(errorMsg);
      }
    };
    testConnection();
  }, []);
}
