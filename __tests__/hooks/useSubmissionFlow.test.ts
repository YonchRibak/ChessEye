import { renderHook, act } from '@testing-library/react';
import { useSubmissionFlow } from '@/hooks/useSubmissionFlow';
import { LichessUtils } from '@/utils/lichess-utils';

// Mock dependencies
jest.mock('@/utils/lichess-utils');

// Enable fake timers for timer testing
jest.useFakeTimers();

describe('useSubmissionFlow', () => {
  const mockMutation = {
    mutateAsync: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Run pending timers to prevent leaks
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
  });

  test('initial state is idle', () => {
    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: 'valid-fen',
      })
    );

    expect(result.current.submissionState).toBe('idle');
  });

  test('handleSubmit transitions to success state', async () => {
    mockMutation.mutateAsync.mockResolvedValue({});

    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: 'valid-fen',
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submissionState).toBe('success');
  });

  test('transitions to redirect after SUCCESS_MESSAGE_DURATION', async () => {
    mockMutation.mutateAsync.mockResolvedValue({});

    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: 'valid-fen',
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submissionState).toBe('success');

    // Advance timers by 1500ms (SUCCESS_MESSAGE_DURATION)
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(result.current.submissionState).toBe('redirect');
  });

  test('does nothing if correctedFen is null', async () => {
    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: null,
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockMutation.mutateAsync).not.toHaveBeenCalled();
  });

  test('does nothing if predictionId is null', async () => {
    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: null,
        correctedFen: 'valid-fen',
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockMutation.mutateAsync).not.toHaveBeenCalled();
  });

  test('resets to idle on error', async () => {
    mockMutation.mutateAsync.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: 'valid-fen',
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submissionState).toBe('idle');
  });

  test('handleOpenLichess calls LichessUtils.openLichessEditor', async () => {
    (LichessUtils.openLichessEditor as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: 'valid-fen',
      })
    );

    await act(async () => {
      await result.current.handleOpenLichess();
    });

    expect(LichessUtils.openLichessEditor).toHaveBeenCalledWith('valid-fen');
  });

  test('clears timer on unmount (prevents memory leak)', async () => {
    mockMutation.mutateAsync.mockResolvedValue({});

    const { result, unmount } = renderHook(() =>
      useSubmissionFlow({
        correctionMutation: mockMutation as any,
        predictionId: 123,
        correctedFen: 'valid-fen',
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    // Timer is now pending
    expect(jest.getTimerCount()).toBe(1);

    // Unmount the hook
    unmount();

    // Timer should be cleared
    expect(jest.getTimerCount()).toBe(0);
  });
});
