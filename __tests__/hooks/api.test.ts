import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  usePredictPositionMutation,
  useCorrectionMutation,
  useServiceSwitchMutation,
  useHealthCheck,
  usePredictionDetail,
  useCurrentService,
} from '@/hooks/api';
import * as apiService from '@/services/api';

// Mock the API service layer
jest.mock('@/services/api');

describe('API Hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create fresh query client for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for faster tests
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  // Helper to wrap hooks with QueryClientProvider
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  describe('usePredictPositionMutation()', () => {
    test('calls predictChessPosition service on mutate', async () => {
      const mockResponse = {
        success: true,
        prediction_id: 123,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        confidence_score: 0.95,
        processing_time_ms: 1200,
        board_detected: true,
        board_matrix: null,
        message: 'Success',
      };

      (apiService.predictChessPosition as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => usePredictPositionMutation(), { wrapper });

      await result.current.mutateAsync({
        imageUri: 'file://test.jpg',
        fileName: 'test.jpg',
      });

      expect(apiService.predictChessPosition).toHaveBeenCalledWith('file://test.jpg', 'test.jpg');
    });

    test('returns prediction data on success', async () => {
      const mockResponse = {
        success: true,
        prediction_id: 123,
        fen: 'test-fen',
        confidence_score: 0.95,
        processing_time_ms: 1200,
        board_detected: true,
        board_matrix: null,
        message: 'Success',
      };
      (apiService.predictChessPosition as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => usePredictPositionMutation(), { wrapper });

      const data = await result.current.mutateAsync({
        imageUri: 'file://test.jpg',
        fileName: 'test.jpg',
      });

      expect(data).toEqual(mockResponse);
    });

    test('handles prediction errors correctly', async () => {
      (apiService.predictChessPosition as jest.Mock).mockRejectedValue(
        new Error('Prediction failed')
      );

      const { result } = renderHook(() => usePredictPositionMutation(), { wrapper });

      await expect(
        result.current.mutateAsync({
          imageUri: 'file://test.jpg',
          fileName: 'test.jpg',
        })
      ).rejects.toThrow('Prediction failed');
    });
  });

  describe('useCorrectionMutation()', () => {
    test('calls submitCorrection service on mutate', async () => {
      (apiService.submitCorrection as jest.Mock).mockResolvedValue({
        success: true,
        correction_id: 456,
        message: 'Correction saved',
      });

      const { result } = renderHook(() => useCorrectionMutation(), { wrapper });

      await result.current.mutateAsync({
        prediction_id: 123,
        corrected_fen: 'corrected-fen-string',
      });

      expect(apiService.submitCorrection).toHaveBeenCalledWith(
        {
          prediction_id: 123,
          corrected_fen: 'corrected-fen-string',
        },
        expect.anything() // React Query context
      );
    });

    test('invalidates prediction detail query on success', async () => {
      (apiService.submitCorrection as jest.Mock).mockResolvedValue({ success: true });

      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useCorrectionMutation(), { wrapper });

      await result.current.mutateAsync({
        prediction_id: 123,
        corrected_fen: 'corrected-fen',
      });

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ['predictionDetail', 123],
        });
      });
    });

    test('invalidates recent corrections query on success', async () => {
      (apiService.submitCorrection as jest.Mock).mockResolvedValue({ success: true });

      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useCorrectionMutation(), { wrapper });

      await result.current.mutateAsync({
        prediction_id: 123,
        corrected_fen: 'corrected-fen',
      });

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ['recentCorrections'],
        });
      });
    });

    test('handles correction errors correctly', async () => {
      (apiService.submitCorrection as jest.Mock).mockRejectedValue(new Error('Correction failed'));

      const { result } = renderHook(() => useCorrectionMutation(), { wrapper });

      await expect(
        result.current.mutateAsync({
          prediction_id: 123,
          corrected_fen: 'invalid-fen',
        })
      ).rejects.toThrow('Correction failed');
    });
  });

  describe('useServiceSwitchMutation()', () => {
    test('calls switchService on mutate', async () => {
      (apiService.switchService as jest.Mock).mockResolvedValue({
        success: true,
        new_service: 'EndToEndChessBoardClassifier',
        message: 'Service switched',
      });

      const { result } = renderHook(() => useServiceSwitchMutation(), { wrapper });

      await result.current.mutateAsync('end_to_end');

      expect(apiService.switchService).toHaveBeenCalledWith('end_to_end', expect.anything());
    });

    test('invalidates current service query on success', async () => {
      (apiService.switchService as jest.Mock).mockResolvedValue({ success: true });

      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useServiceSwitchMutation(), { wrapper });

      await result.current.mutateAsync('end_to_end');

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ['currentService'],
        });
      });
    });

    test('handles service switch errors', async () => {
      (apiService.switchService as jest.Mock).mockRejectedValue(new Error('Service not available'));

      const { result } = renderHook(() => useServiceSwitchMutation(), { wrapper });

      await expect(result.current.mutateAsync('invalid')).rejects.toThrow('Service not available');
    });
  });

  describe('useHealthCheck()', () => {
    test('fetches health check data', async () => {
      const mockHealth = {
        status: 'healthy',
        model_ready: true,
        database_ready: true,
        timestamp: '2025-12-26T12:00:00Z',
      };

      (apiService.getHealthCheck as jest.Mock).mockResolvedValue(mockHealth);

      const { result } = renderHook(() => useHealthCheck(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockHealth);
    });

    test('handles health check errors', async () => {
      (apiService.getHealthCheck as jest.Mock).mockRejectedValue(new Error('Server down'));

      const { result } = renderHook(() => useHealthCheck(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('usePredictionDetail()', () => {
    test('fetches prediction details when ID provided', async () => {
      const mockDetail = {
        prediction_id: 123,
        fen: 'test-fen',
        confidence_score: 0.95,
        created_at: '2025-12-26T12:00:00Z',
      };

      (apiService.getPredictionDetail as jest.Mock).mockResolvedValue(mockDetail);

      const { result } = renderHook(() => usePredictionDetail(123), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockDetail);
      expect(apiService.getPredictionDetail).toHaveBeenCalledWith(123);
    });

    test('does not fetch when ID is null', () => {
      const { result } = renderHook(() => usePredictionDetail(null), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(apiService.getPredictionDetail).not.toHaveBeenCalled();
    });
  });

  describe('useCurrentService()', () => {
    test('fetches current service type', async () => {
      const mockService = {
        service_type: 'EndToEndChessBoardClassifier',
        service_name: 'End-to-End Model',
      };

      (apiService.getCurrentService as jest.Mock).mockResolvedValue(mockService);

      const { result } = renderHook(() => useCurrentService(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockService);
    });
  });
});
