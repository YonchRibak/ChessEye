import { renderHook, waitFor } from '@testing-library/react-native';
import { useApiConnectionTest } from '@/hooks/useApiConnectionTest';
import * as apiService from '@/services/api';
import { UploadUtils } from '@/utils/upload-utils';

jest.mock('@/services/api');
jest.mock('@/utils/upload-utils');

describe('useApiConnectionTest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('runs health check on mount', async () => {
    const mockHealthData = { status: 'healthy', model_ready: true };
    (apiService.getHealthCheck as jest.Mock).mockResolvedValue(mockHealthData);

    renderHook(() => useApiConnectionTest());

    await waitFor(() => {
      expect(apiService.getHealthCheck).toHaveBeenCalled();
    });
  });

  test('shows error toast only on failure', async () => {
    (apiService.getHealthCheck as jest.Mock).mockRejectedValue(new Error('Connection failed'));

    renderHook(() => useApiConnectionTest());

    await waitFor(() => {
      expect(UploadUtils.showApiConnectionError).toHaveBeenCalled();
    });
  });

  test('no success toast (non-intrusive behavior)', async () => {
    const mockHealthData = { status: 'healthy', model_ready: true };
    (apiService.getHealthCheck as jest.Mock).mockResolvedValue(mockHealthData);

    renderHook(() => useApiConnectionTest());

    await waitFor(() => {
      expect(apiService.getHealthCheck).toHaveBeenCalled();
    });

    expect(UploadUtils.showApiConnectionError).not.toHaveBeenCalled();
  });

  test('logs health check result', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockHealthData = { status: 'healthy', model_ready: true };
    (apiService.getHealthCheck as jest.Mock).mockResolvedValue(mockHealthData);

    renderHook(() => useApiConnectionTest());

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[UploadScreen]'),
        expect.anything()
      );
    });
  });
});
