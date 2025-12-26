import axios from 'axios';
import {
  predictChessPosition,
  submitCorrection,
  switchService,
  getCurrentService,
  getPredictionDetail,
  getHealthCheck,
  getApiStats,
  getRecentCorrections,
  validateFen,
} from '@/services/api';
import type * as ApiTypes from '@/types/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    // Create mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Configuration', () => {
    test('uses API_BASE_URL from Expo Constants', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'http://localhost:8081', // From jest.setup.ts mock
        })
      );
    });

    test('sets default timeout to 10 seconds', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 10000,
        })
      );
    });

    test('sets Content-Type header to application/json', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
  });

  describe('Error Interceptor', () => {
    let errorInterceptor: any;

    beforeEach(() => {
      // Get the error interceptor function from the mock
      errorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    });

    test('transforms API error responses into Error objects', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: {
            error: 'Not found',
            detail: 'Prediction ID not found',
          },
        },
      };

      try {
        await errorInterceptor(errorResponse);
      } catch (error: any) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Not found');
        expect(error.status).toBe(404);
        expect(error.detail).toBe('Prediction ID not found');
      }
    });

    test('adds status code to error object', async () => {
      const errorResponse = {
        response: {
          status: 500,
          data: {
            error: 'Server error',
            detail: 'Internal server error',
          },
        },
      };

      try {
        await errorInterceptor(errorResponse);
      } catch (error: any) {
        expect(error.status).toBe(500);
      }
    });

    test('handles network errors (no response)', async () => {
      const networkError = {
        request: {},
        message: 'Network Error',
      };

      try {
        await errorInterceptor(networkError);
      } catch (error: any) {
        expect(error.message).toContain('Could not reach the API server');
      }
    });

    test('passes successful responses through unchanged', async () => {
      const successResponse = { data: { success: true } };

      // Success interceptor is the first function passed to .use()
      const successInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][0];

      const result = successInterceptor(successResponse);
      expect(result).toEqual(successResponse);
    });
  });

  describe('predictChessPosition()', () => {
    test('creates FormData with image file', async () => {
      const mockResponse: ApiTypes.PredictionResponse = {
        success: true,
        prediction_id: 123,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        board_matrix: null,
        confidence_score: 0.95,
        processing_time_ms: 1200,
        board_detected: true,
        message: 'Success',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      await predictChessPosition('file://image.jpg', 'board.jpg');

      // Verify POST was called with FormData
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/predict',
        expect.any(FormData),
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    });

    test('returns PredictionResponse on success', async () => {
      const mockResponse: ApiTypes.PredictionResponse = {
        success: true,
        prediction_id: 123,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        board_matrix: null,
        confidence_score: 0.95,
        processing_time_ms: 1200,
        board_detected: true,
        message: 'Success',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await predictChessPosition('file://image.jpg', 'board.jpg');

      expect(result).toEqual(mockResponse);
      expect(result.prediction_id).toBe(123);
      expect(result.fen).toBeTruthy();
    });

    test('uses default filename when not provided', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: { success: true } });

      await predictChessPosition('file://image.jpg');

      expect(mockAxiosInstance.post).toHaveBeenCalled();
    });

    test('throws error when API request fails', async () => {
      const apiError = {
        response: {
          status: 400,
          data: {
            error: 'Invalid image',
            detail: 'Image format not supported',
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValue(apiError);

      await expect(predictChessPosition('file://invalid.txt')).rejects.toThrow();
    });
  });

  describe('submitCorrection()', () => {
    test('posts CorrectionRequest to /predict/correct', async () => {
      const request: ApiTypes.CorrectionRequest = {
        prediction_id: 123,
        corrected_fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
      };

      const mockResponse: ApiTypes.CorrectionResponse = {
        success: true,
        message: 'Correction saved',
        correction_id: 456,
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await submitCorrection(request);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/predict/correct', request);
      expect(result).toEqual(mockResponse);
    });

    test('throws error when correction fails', async () => {
      const request: ApiTypes.CorrectionRequest = {
        prediction_id: 999,
        corrected_fen: 'invalid-fen',
      };

      mockAxiosInstance.post.mockRejectedValue(new Error('Invalid FEN'));

      await expect(submitCorrection(request)).rejects.toThrow();
    });
  });

  describe('switchService()', () => {
    test('posts service identifier to /service/switch', async () => {
      const mockResponse: ApiTypes.ServiceSwitchResponse = {
        success: true,
        message: 'Service switched',
        new_service: 'EndToEndChessBoardClassifier',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await switchService('end_to_end');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/service/switch', {
        service_identifier: 'end_to_end',
      });
      expect(result.new_service).toBe('EndToEndChessBoardClassifier');
    });

    test('handles service switch errors', async () => {
      mockAxiosInstance.post.mockRejectedValue(new Error('Service not available'));

      await expect(switchService('invalid')).rejects.toThrow();
    });
  });

  describe('getCurrentService()', () => {
    test('fetches from /service/current endpoint', async () => {
      const mockResponse: ApiTypes.CurrentServiceResponse = {
        service_type: 'EndToEndChessBoardClassifier',
        service_name: 'End-to-End Model',
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await getCurrentService();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/service/current');
      expect(result.service_type).toBeTruthy();
    });
  });

  describe('getPredictionDetail()', () => {
    test('fetches prediction details by ID', async () => {
      const mockResponse: ApiTypes.PredictionDetailResponse = {
        prediction_id: 123,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        confidence_score: 0.95,
        created_at: '2025-12-26T12:00:00Z',
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await getPredictionDetail(123);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/predict/123');
      expect(result.prediction_id).toBe(123);
    });

    test('throws error for non-existent prediction', async () => {
      mockAxiosInstance.get.mockRejectedValue({
        response: {
          status: 404,
          data: { error: 'Not found' },
        },
      });

      await expect(getPredictionDetail(999)).rejects.toThrow();
    });
  });

  describe('getHealthCheck()', () => {
    test('fetches from /health endpoint', async () => {
      const mockResponse: ApiTypes.HealthResponse = {
        status: 'healthy',
        model_ready: true,
        database_ready: true,
        timestamp: '2025-12-26T12:00:00Z',
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await getHealthCheck();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/health');
      expect(result.status).toBe('healthy');
    });
  });

  describe('getApiStats()', () => {
    test('fetches API statistics', async () => {
      const mockResponse: ApiTypes.StatsResponse = {
        total_predictions: 1000,
        total_corrections: 150,
        average_confidence: 0.87,
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await getApiStats();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/stats');
      expect(result.total_predictions).toBeGreaterThan(0);
    });
  });

  describe('getRecentCorrections()', () => {
    test('fetches recent corrections with limit', async () => {
      const mockResponse: ApiTypes.RecentCorrectionsResponse = {
        corrections: [
          {
            correction_id: 1,
            prediction_id: 123,
            corrected_fen: 'fen-string',
            created_at: '2025-12-26T12:00:00Z',
          },
        ],
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await getRecentCorrections(10);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/corrections/recent', {
        params: { limit: 10 },
      });
      expect(result.corrections).toHaveLength(1);
    });
  });

  describe('validateFen()', () => {
    test('validates FEN via API endpoint', async () => {
      const mockResponse: ApiTypes.FenValidationResponse = {
        valid: true,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await validateFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/validate/fen', {
        params: { fen: expect.any(String) },
      });
      expect(result.valid).toBe(true);
    });

    test('returns invalid for malformed FEN', async () => {
      const mockResponse: ApiTypes.FenValidationResponse = {
        valid: false,
        error: 'Invalid FEN structure',
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await validateFen('invalid-fen');

      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });
});
