
import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import * as ApiTypes from '../types/api';

// ============================================================================
// 1. CONFIGURATION
// ============================================================================

// Get API base URL from environment configuration
const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:8081';

// Log API URL for debugging
console.log('[API Config] Base URL:', API_BASE_URL);
console.log('[API Config] Expo Config:', Constants.expoConfig?.extra);

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

api.interceptors.response.use(
    (response) => response, // Pass successful responses straight through
    (error) => {
        if (error.response) {
            const errorData = error.response.data;
            const status = error.response.status;

           
            if (errorData && errorData.error) {
                const customError = new Error(errorData.error || 'API Request Failed');
                (customError as any).status = status;
                (customError as any).detail = errorData.detail;
                return Promise.reject(customError);
            }
            
            // Handle generic HTTP errors (e.g., 404, 500)
            console.log(`HTTP Error ${status}:`, errorData);
            return Promise.reject(new Error(`Server Error: Status ${status}`));
        } else if (error.request) {
            // Request was made but no response received (e.g., network timeout, server down)
            console.log('[API Error] Network error - Request details:', {
                baseURL: API_BASE_URL,
                url: error.config?.url,
                method: error.config?.method,
                message: error.message
            });
            return Promise.reject(new Error('Network Error: Could not reach the API server.'));
        }
        
        // Let other errors pass through
        return Promise.reject(error);
    }
);

// ============================================================================
// 2. API SERVICE FUNCTIONS
// ============================================================================

/**
 * Uploads a chess board image for prediction.
 * @param imageUri - The local file URI of the image (e.g., from Expo's ImagePicker).
 * @param fileName - The name of the file (e.g., 'board.jpg').
 * @returns A promise that resolves to the PredictionResponse.
 */
export const predictChessPosition = async (
    imageUri: string, 
    fileName: string = 'board_image.jpg'
): Promise<ApiTypes.PredictionResponse> => {
    
    const formData = new FormData();
    
    formData.append('file', {
        uri: imageUri,
        name: fileName,
        type: 'image/jpeg', 
    } as any); 

    try {
        const response = await api.post<ApiTypes.PredictionResponse>('/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Prediction API Error:", error.response?.data || error.message);
        } else {
            console.log("Prediction Unknown Error:", error);
        }
        throw error;
    }
};

/**
 * Submits a manual correction for a previous prediction.
 * @param data - The correction request data (prediction_id and corrected_fen).
 * @returns A promise that resolves to the CorrectionResponse.
 */
export const submitCorrection = async (
    data: ApiTypes.CorrectionRequest
): Promise<ApiTypes.CorrectionResponse> => {
    const response = await api.post<ApiTypes.CorrectionResponse>('/predict/correct', data);
    return response.data;
};

/**
 * Switches the active chess prediction service.
 * @param serviceType - The service to switch to (e.g., 'end_to_end' or 'multi_model_pipeline').
 * @returns A promise that resolves to the ServiceSwitchResponse.
 */
export const switchService = async (
    serviceType: string
): Promise<ApiTypes.ServiceSwitchResponse> => {
    const data: ApiTypes.ServiceSwitchRequest = { service_type: serviceType };
    const response = await api.post<ApiTypes.ServiceSwitchResponse>('/service/switch', data);
    return response.data;
};

/**
 * Gets information about the currently active service.
 * @returns A promise that resolves to the CurrentServiceResponse.
 */
export const getCurrentService = async (): Promise<ApiTypes.CurrentServiceResponse> => {
    const response = await api.get<ApiTypes.CurrentServiceResponse>('/service/current');
    return response.data;
};

/**
 * Gets the details of a specific prediction by ID.
 * @param predictionId - The ID of the prediction.
 * @returns A promise that resolves to the PredictionDetailResponse.
 */
export const getPredictionDetail = async (
    predictionId: number
): Promise<ApiTypes.PredictionDetailResponse> => {
    const response = await api.get<ApiTypes.PredictionDetailResponse>(`/predict/${predictionId}`);
    return response.data;
};

/**
 * Gets the overall API usage statistics.
 * @returns A promise that resolves to the StatsResponse.
 */
export const getApiStats = async (): Promise<ApiTypes.StatsResponse> => {
    const response = await api.get<ApiTypes.StatsResponse>('/stats');
    return response.data;
};

/**
 * Gets a list of recent user corrections.
 * @param limit - The maximum number of corrections to return (default is 10).
 * @returns A promise that resolves to the RecentCorrectionsResponse.
 */
export const getRecentCorrections = async (
    limit: number = 10
): Promise<ApiTypes.RecentCorrectionsResponse> => {
    const response = await api.get<ApiTypes.RecentCorrectionsResponse>(`/corrections/recent?limit=${limit}`);
    return response.data;
};

/**
 * Checks the model retraining status and threshold.
 * @returns A promise that resolves to the RetrainingStatusResponse.
 */
export const getRetrainingStatus = async (): Promise<ApiTypes.RetrainingStatusResponse> => {
    const response = await api.get<ApiTypes.RetrainingStatusResponse>('/corrections/count');
    return response.data;
};

/**
 * Performs a basic health check on the API, model, and database.
 * @returns A promise that resolves to the HealthResponse.
 */
export const getHealthCheck = async (): Promise<ApiTypes.HealthResponse> => {
    const response = await api.get<ApiTypes.HealthResponse>('/health');
    return response.data;
};

/**
 * Gets non-sensitive configuration information about the API.
 * @returns A promise that resolves to the ConfigInfoResponse.
 */
export const getConfigInfo = async (): Promise<ApiTypes.ConfigInfoResponse> => {
    const response = await api.get<ApiTypes.ConfigInfoResponse>('/config/info');
    return response.data;
};

/**
 * Validates a FEN string and converts it to a board matrix.
 * @param fen - The FEN notation string to validate.
 * @returns A promise that resolves to the FENValidationResponse.
 */
export const validateFen = async (
    fen: string
): Promise<ApiTypes.FENValidationResponse> => {
    const response = await api.get<ApiTypes.FENValidationResponse>(`/validate/fen?fen=${fen}`);
    return response.data;
};

// ============================================================================
// 4. EXPORT API SERVICE
// ============================================================================

const apiService = {
    predictChessPosition,
    submitCorrection,
    switchService,
    getCurrentService,
    getPredictionDetail,
    getApiStats,
    getRecentCorrections,
    getRetrainingStatus,
    getHealthCheck,
    getConfigInfo,
    validateFen,
};

export default apiService;