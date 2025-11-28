// hooks/api.ts

import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryOptions,
    UseQueryResult
} from '@tanstack/react-query';
import apiService from '../services/api';
import * as ApiTypes from '../types/api';

// ============================================================================
// 1. QUERY KEYS
// ============================================================================

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
// 2. QUERY HOOK FACTORY
// ============================================================================

/**
 * A factory function to simplify creating standard useQuery hooks for GET requests.
 * @param key - The TanStack Query key.
 * @param fetcher - The API service function.
 * @param options - Optional useQuery options (e.g., staleTime, refetchInterval).
 */
const createQueryHook = <TData>(
    key: readonly (string | number | object)[], 
    fetcher: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, Error, TData, any>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, Error> => {
    return useQuery({
        queryKey: key,
        queryFn: fetcher,
        ...options,
    });
};

// ============================================================================
// 3. QUERY HOOKS (GET Requests)
// ============================================================================

/**
 * Hook for fetching the API health status.
 * @returns HealthResponse
 */
export const useHealthCheck = (): UseQueryResult<ApiTypes.HealthResponse, Error> => {
    // Uses the hook factory
    return createQueryHook<ApiTypes.HealthResponse>(
        queryKeys.health,
        apiService.getHealthCheck
    );
};

/**
 * Hook for fetching detailed information about a specific prediction.
 * @param predictionId - The ID of the prediction to fetch.
 * @returns PredictionDetailResponse
 */
export const usePredictionDetail = (
    predictionId: number | null
): UseQueryResult<ApiTypes.PredictionDetailResponse, Error> => {
    
    const isPredictionIdValid = typeof predictionId === 'number' && predictionId > 0;
    
    return createQueryHook<ApiTypes.PredictionDetailResponse>(
        queryKeys.predictionDetail(predictionId!),
        () => apiService.getPredictionDetail(predictionId!),
        { enabled: isPredictionIdValid }
    );
};

/**
 * Hook for fetching global API statistics.
 * @returns StatsResponse
 */
export const useApiStats = (): UseQueryResult<ApiTypes.StatsResponse, Error> => {
    return createQueryHook<ApiTypes.StatsResponse>(
        queryKeys.stats,
        apiService.getApiStats,
        { staleTime: 60 * 1000 * 5 } // 5 minutes
    );
};

/**
 * Hook for fetching the currently active prediction service.
 * @returns CurrentServiceResponse
 */
export const useCurrentService = (): UseQueryResult<ApiTypes.CurrentServiceResponse, Error> => {
    return createQueryHook<ApiTypes.CurrentServiceResponse>(
        queryKeys.currentService,
        apiService.getCurrentService
    );
};

/**
 * Hook for fetching recent user corrections.
 * @param limit - The maximum number of corrections to retrieve.
 * @returns RecentCorrectionsResponse
 */
export const useRecentCorrections = (
    limit: number = 10
): UseQueryResult<ApiTypes.RecentCorrectionsResponse, Error> => {
    return createQueryHook<ApiTypes.RecentCorrectionsResponse>(
        queryKeys.recentCorrections(limit),
        () => apiService.getRecentCorrections(limit)
    );
};


// ============================================================================
// 4. MUTATION HOOKS (POST Requests)
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
    const queryClient = useQueryClient();

    return useMutation<
        ApiTypes.CorrectionResponse, 
        Error, 
        ApiTypes.CorrectionRequest
    >({
        mutationFn: apiService.submitCorrection,
        
        onSuccess: (data, variables) => {
            console.log(`Correction submitted for Prediction ID: ${data.prediction_id}`);
            // Invalidate the detail view and recent corrections list
            queryClient.invalidateQueries({ queryKey: queryKeys.predictionDetail(variables.prediction_id) });
            queryClient.invalidateQueries({ queryKey: ['recentCorrections'] });
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