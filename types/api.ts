// --- Utility Types ---

/** Represents an 8x8 chess board matrix (list of 8 rows, each with 8 strings). */
export type BoardMatrix = string[][];

// --- Prediction Schemas ---

export interface PredictionResponse {
    success: boolean;
    prediction_id: number | null;
    fen: string | null;
    board_matrix: BoardMatrix | null;
    confidence_score: number | null;
    processing_time_ms: number | null;
    board_detected: boolean | null;
    message: string | null;
}

export interface PredictionDetailResponse {
    id: number;
    predicted_fen: string | null;
    predicted_matrix: BoardMatrix | null;
    corrected_fen: string | null;
    corrected_matrix: BoardMatrix | null;
    device_identifier: string;
    confidence_score: number | null;
    processing_time_ms: number | null;
    processing_time_seconds: number | null;
    created_at: string | null;
    corrected_at: string | null;
    board_detected: boolean | null;
    prediction_successful: boolean | null;
    has_correction: boolean;
    is_successful: boolean;
}

// --- Correction Schemas ---

export interface CorrectionRequest {
    prediction_id: number;
    corrected_fen: string;
}

export interface CorrectionResponse {
    success: boolean;
    message: string;
    prediction_id: number;
    corrected_fen: string;
}

export interface RecentCorrection {
    id: number;
    predicted_fen: string | null;
    corrected_fen: string | null;
    confidence_score: number | null;
    device_identifier: string | null;
    created_at: string | null;
    corrected_at: string | null;
}

export interface RecentCorrectionsResponse {
    count: number;
    corrections: RecentCorrection[];
}

// --- Service Switching Schemas ---

export interface ServiceSwitchRequest {
    service_type: string;
}

export interface ServiceSwitchResponse {
    success: boolean;
    message: string;
    previous_service: string;
    new_service: string;
    timestamp: string;
}

export interface CurrentServiceResponse {
    service_type: string | null;
    service_loaded: boolean;
    service_info: Record<string, any> | null;
    available_services: string[];
    message: string;
}

// --- Statistics and Status Schemas ---

export interface StatsResponse {
    total_predictions: number;
    successful_predictions: number;
    failed_predictions: number;
    corrections_submitted: number;
    average_processing_time_ms: number;
    average_confidence: number;
}

export interface RetrainingStatusResponse {
    total_corrections: number;
    corrections_since_last_model: number;
    retrain_threshold: number;
    needs_retraining: boolean;
    corrections_until_retrain: number;
    last_model_version: string | null;
}

export interface HealthResponse {
    status: string;
    model_ready: boolean;
    database_ready: boolean;
    timestamp: string;
}

export interface FENValidationResponse {
    valid: boolean;
    fen: string | null;
    board_matrix: BoardMatrix | null;
    error: string | null;
}

// --- Other Schemas ---

export interface RootResponse {
    message: string;
    version: string;
    docs: string;
    health: string;
    environment: string;
}

export interface ConfigInfoResponse {
    environment: string;
    app_version: string;
    model_input_size: [number, number]; // Assuming a tuple of two numbers
    max_image_size_mb: number;
    supported_formats: string[];
    retrain_threshold: number;
    retrain_enabled: boolean;
    database_type: string;
    debug_mode: boolean;
    cors_origins: string[];
    rate_limiting_enabled: boolean;
}
