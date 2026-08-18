import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * POST /predict
 * Sends raw patient data and returns a PredictionResponse.
 * @param {Object} patientData
 * @returns {Promise<Object>}
 */
export async function predictCardiovascularRisk(patientData) {
  const response = await api.post("/predict", patientData);
  return response.data;
}

/**
 * GET /health
 * Returns the backend health status.
 * @returns {Promise<Object>}
 */
export async function getHealth() {
  const response = await api.get("/health");
  return response.data;
}

/**
 * GET /model/info
 * Returns model metadata including type, features, and coefficients.
 * @returns {Promise<Object>}
 */
export async function getModelInfo() {
  const response = await api.get("/model/info");
  return response.data;
}

/**
 * POST /predict/batch
 * Sends a batch of patient records and returns batch results.
 * @param {Object[]} patients
 * @returns {Promise<Object>}
 */
export async function predictBatch(patients) {
  const response = await api.post("/predict/batch", { patients });
  return response.data;
}

export default api;
