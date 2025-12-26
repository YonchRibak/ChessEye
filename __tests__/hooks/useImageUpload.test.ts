import { renderHook, act } from '@testing-library/react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageUtils } from '@/utils/image-utils';
import { UploadUtils } from '@/utils/upload-utils';
import { usePredictPositionMutation } from '@/hooks/api';

jest.mock('@/utils/image-utils');
jest.mock('@/utils/upload-utils');
jest.mock('@/hooks/api');

describe('useImageUpload', () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    (usePredictPositionMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('openGallery calls ImageUtils.pickFromGallery', async () => {
    (ImageUtils.pickFromGallery as jest.Mock).mockResolvedValue({
      uri: 'file://gallery.jpg',
      fileName: 'gallery.jpg',
    });

    mockMutateAsync.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      await result.current.openGallery();
    });

    expect(ImageUtils.pickFromGallery).toHaveBeenCalled();
  });

  test('openCamera calls ImageUtils.pickFromCamera', async () => {
    (ImageUtils.pickFromCamera as jest.Mock).mockResolvedValue({
      uri: 'file://camera.jpg',
      fileName: 'camera.jpg',
    });

    mockMutateAsync.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      await result.current.openCamera();
    });

    expect(ImageUtils.pickFromCamera).toHaveBeenCalled();
  });

  test('sets isProcessing to true during upload', async () => {
    (ImageUtils.pickFromGallery as jest.Mock).mockResolvedValue({
      uri: 'file://test.jpg',
      fileName: 'test.jpg',
    });

    mockMutateAsync.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    const { result } = renderHook(() => useImageUpload());

    const uploadPromise = act(async () => {
      await result.current.openGallery();
    });

    // Check isProcessing is true during upload
    expect(result.current.isProcessing).toBe(true);

    await uploadPromise;
  });

  test('resets isProcessing to false after completion', async () => {
    (ImageUtils.pickFromGallery as jest.Mock).mockResolvedValue({
      uri: 'file://test.jpg',
      fileName: 'test.jpg',
    });

    mockMutateAsync.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      await result.current.openGallery();
    });

    expect(result.current.isProcessing).toBe(false);
  });

  test('calls UploadUtils.showPredictionError on failure', async () => {
    (ImageUtils.pickFromGallery as jest.Mock).mockResolvedValue({
      uri: 'file://test.jpg',
      fileName: 'test.jpg',
    });

    const apiError = new Error('Prediction failed');
    mockMutateAsync.mockRejectedValue(apiError);

    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      await result.current.openGallery();
    });

    expect(UploadUtils.showPredictionError).toHaveBeenCalledWith(apiError);
  });

  test('handles canceled selection (null result)', async () => {
    (ImageUtils.pickFromGallery as jest.Mock).mockResolvedValue(null); // User canceled

    const { result } = renderHook(() => useImageUpload());

    await act(async () => {
      await result.current.openGallery();
    });

    // Should not call mutation for canceled selection
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });
});
