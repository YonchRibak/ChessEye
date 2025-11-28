
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import apiService from '../services/api';
import * as ApiTypes from '../types/api';

// ============================================================================
// 1. QUERY KEYS
// ============================================================================
// A centralized place to store query keys for easy reference and refetching.

export const queryKeys = {
    // Prediction Details
    predictionDetail: (id: number) => ['predictionDetail', id] as const,
    // Global Status/Info
    health: ['health'] as const,
    stats: ['stats'] as const,
    config: ['config'] as const,
    // Service Status
    currentService: ['currentService'] as const,
    // Corrections/Retraining
    recentCorrections: (limit: number) => ['recentCorrections', limit] as const,
    retrainingStatus: ['retrainingStatus'] as const,
};

// ============================================================================
// 2. QUERY HOOKS (GET Requests)
// ============================================================================

/**
 * Hook for fetching the API health status.
 * @returns HealthResponse
 */
export const useHealthCheck = (): UseQueryResult<ApiTypes.HealthResponse, Error> => {
    return useQuery({
        queryKey: queryKeys.health,
        queryFn: apiService.getHealthCheck,
    });
};

/**
 * Hook for fetching detailed information about a specific prediction.
 * @param predictionId - The ID of the prediction to fetch.
 * @returns PredictionDetailResponse
 */
export const usePredictionDetail = (
    predictionId: number | null
): UseQueryResult<ApiTypes.PredictionDetailResponse, Error> => {
    // Only fetch if predictionId is a valid number
    const validPredictionId = typeof predictionId === 'number' && predictionId > 0;
    
    return useQuery({
        queryKey: queryKeys.predictionDetail(predictionId!),
        queryFn: () => apiService.getPredictionDetail(predictionId!),
        enabled: validPredictionId,
    });
};

/**
 * Hook for fetching global API statistics.
 * @returns StatsResponse
 */
export const useApiStats = (): UseQueryResult<ApiTypes.StatsResponse, Error> => {
    return useQuery({
        queryKey: queryKeys.stats,
        queryFn: apiService.getApiStats,
        staleTime: 60 * 1000 * 5, // 5 minutes
    });
};

/**
 * Hook for fetching the currently active prediction service.
 * @returns CurrentServiceResponse
 */
export const useCurrentService = (): UseQueryResult<ApiTypes.CurrentServiceResponse, Error> => {
    return useQuery({
        queryKey: queryKeys.currentService,
        queryFn: apiService.getCurrentService,
    });
};

/**
 * Hook for fetching recent user corrections.
 * @param limit - The maximum number of corrections to retrieve.
 * @returns RecentCorrectionsResponse
 */
export const useRecentCorrections = (
    limit: number = 10
): UseQueryResult<ApiTypes.RecentCorrectionsResponse, Error> => {
    return useQuery({
        queryKey: queryKeys.recentCorrections(limit),
        queryFn: () => apiService.getRecentCorrections(limit),
    });
};


// ============================================================================
// 3. MUTATION HOOKS (POST Requests)
// ============================================================================

/**
 * Hook for submitting an image for a new chess board prediction.
 * This should be used with a file picker and involves a file upload.
 * @returns PredictionResponse
 */
export const usePredictPositionMutation = (): UseMutationResult<
    ApiTypes.PredictionResponse, 
    Error, 
    { imageUri: string; fileName: string }
> => {
    return useMutation<
        ApiTypes.PredictionResponse, 
        Error, 
        { imageUri: string; fileName: string }
    >({
        mutationFn: ({ imageUri, fileName }) => 
            apiService.predictChessPosition(imageUri, fileName),
        

        onSuccess: (data) => {
            console.log(`Prediction successful! ID: ${data.prediction_id}`);
            
        },
    });
};

/**
 * Hook for submitting a user correction to a prediction.
 * @returns CorrectionResponse
 */
export const useCorrectionMutation = (): UseMutationResult<
    ApiTypes.CorrectionResponse, 
    Error, 
    ApiTypes.CorrectionRequest
> => {
    return useMutation<
        ApiTypes.CorrectionResponse, 
        Error, 
        ApiTypes.CorrectionRequest
    >({
        mutationFn: apiService.submitCorrection,
        
        onSuccess: (data, variables, context) => {
            console.log(`Correction submitted for Prediction ID: ${data.prediction_id}`);

        },
    });
};

/**
 * Hook for switching the active chess prediction service (e.g., between models).
 * @returns ServiceSwitchResponse
 */
export const useServiceSwitchMutation = (): UseMutationResult<
    ApiTypes.ServiceSwitchResponse, 
    Error, 
    string
> => {
    const queryClient = useQueryClient();
    
    return useMutation<
        ApiTypes.ServiceSwitchResponse, 
        Error, 
        string
    >({
        mutationFn: apiService.switchService,
        
        // Invalidate the current service query so the app refetches the new status
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.currentService });
            console.log(`Successfully switched service to: ${data.new_service}`);
        },
    });
};