import { renderHook } from '@testing-library/react';
import { useApiConnectionTest } from '@/hooks/useApiConnectionTest';
import { useHealthCheck } from '@/hooks/api';
import { ToastUtils } from '@/utils/toast-utils';

jest.mock('@/hooks/api');
jest.mock('@/utils/toast-utils');

describe('useApiConnectionTest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('runs health check on mount', () => {
    (useHealthCheck as jest.Mock).mockReturnValue({
      isSuccess: true,
      isError: false,
    });

    renderHook(() => useApiConnectionTest());

    expect(useHealthCheck).toHaveBeenCalled();
  });

  test('shows error toast only on failure', () => {
    (useHealthCheck as jest.Mock).mockReturnValue({
      isSuccess: false,
      isError: true,
      error: new Error('Connection failed'),
    });

    renderHook(() => useApiConnectionTest());

    expect(ToastUtils.error).toHaveBeenCalled();
  });

  test('no success toast (non-intrusive behavior)', () => {
    (useHealthCheck as jest.Mock).mockReturnValue({
      isSuccess: true,
      isError: false,
    });

    renderHook(() => useApiConnectionTest());

    expect(ToastUtils.success).not.toHaveBeenCalled();
  });

  test('logs health check result', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    (useHealthCheck as jest.Mock).mockReturnValue({
      isSuccess: true,
      isError: false,
    });

    renderHook(() => useApiConnectionTest());

    expect(consoleSpy).toHaveBeenCalled();
  });
});
