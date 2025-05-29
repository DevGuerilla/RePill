import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create base axios instance
const createApiInstance = (config = {}) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-Key": API_KEY,
      ...config.headers,
    },
    ...config,
  });

  return instance;
};

// Default API instance
const api = createApiInstance();

// Storage utilities
export const getStoredToken = () => {
  return sessionStorage.getItem("auth_token");
};

export const setStoredToken = (token) => {
  if (token) {
    sessionStorage.setItem("auth_token", token);
  } else {
    sessionStorage.removeItem("auth_token");
  }
};

export const clearStorage = () => {
  sessionStorage.removeItem("auth_token");
  // Clear other auth-related storage if needed
  sessionStorage.removeItem("user_data");
};

// Request interceptor factory
export const createRequestInterceptor = (options = {}) => {
  return (config) => {
    // Add auth token
    const token = getStoredToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ensure API Key is present
    if (API_KEY && !config.headers["X-API-Key"]) {
      config.headers["X-API-Key"] = API_KEY;
    }

    // Custom request modifications
    if (options.beforeRequest) {
      config = options.beforeRequest(config) || config;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    return config;
  };
};

// Response interceptor factory
export const createResponseInterceptor = (options = {}) => {
  const onSuccess = (response) => {
    // Add response time for debugging
    const endTime = new Date();
    const duration = endTime - response.config.metadata?.startTime;
    response.duration = duration;

    // Custom success handling
    if (options.onSuccess) {
      return options.onSuccess(response) || response;
    }

    return response;
  };

  const onError = (error) => {
    // Handle different error types
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = data?.message || "Terjadi kesalahan pada server";

      switch (status) {
        case 400:
          errorMessage = data?.message || "Permintaan tidak valid";
          break;
        case 401:
          errorMessage = "Sesi Anda telah berakhir. Silakan masuk kembali";
          // Clear storage and redirect
          clearStorage();
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.includes("/masuk")
          ) {
            window.location.href = "/masuk";
          }
          break;
        case 403:
          errorMessage =
            "Anda tidak memiliki akses untuk melakukan tindakan ini";
          console.warn("Akses ditolak:", data?.message);
          break;
        case 404:
          errorMessage = "Data yang dicari tidak ditemukan";
          console.warn("Resource tidak ditemukan:", error.config?.url);
          break;
        case 422:
          errorMessage = data?.message || "Data yang dikirim tidak valid";
          console.warn("Error validasi:", data?.errors || data?.message);
          break;
        case 429:
          errorMessage = "Terlalu banyak permintaan. Silakan coba lagi nanti";
          break;
        case 500:
          errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi";
          console.error("Server error:", data?.message);
          break;
        case 502:
          errorMessage =
            "Server sedang dalam pemeliharaan. Silakan coba lagi nanti";
          break;
        case 503:
          errorMessage =
            "Layanan sedang tidak tersedia. Silakan coba lagi nanti";
          break;
        default:
          errorMessage = data?.message || `Terjadi kesalahan (${status})`;
      }

      // Custom error handling
      if (options.onError) {
        return options.onError(error);
      }

      // Format error response untuk modal
      const formattedError = {
        message: errorMessage,
        status,
        data: data?.data || data,
        errors: data?.errors,
        type: "error",
      };

      return Promise.reject(formattedError);
    } else if (error.request) {
      // Network error
      const networkError = {
        message:
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.",
        type: "network",
        originalError: error,
      };

      if (options.onError) {
        return options.onError(networkError);
      }

      return Promise.reject(networkError);
    } else {
      // Other errors
      const otherError = {
        message:
          error.message ||
          "Terjadi kesalahan yang tidak dikenal. Silakan coba lagi.",
        type: "unknown",
        originalError: error,
      };

      if (options.onError) {
        return options.onError(otherError);
      }

      return Promise.reject(otherError);
    }
  };

  return { onSuccess, onError };
};

// Apply default interceptors
const requestInterceptor = createRequestInterceptor();
const responseInterceptor = createResponseInterceptor();

api.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);
api.interceptors.response.use(
  responseInterceptor.onSuccess,
  responseInterceptor.onError
);

// Utility functions for different request types
export const apiUtils = {
  // Standard request with default interceptors
  request: (config) => api(config),

  // GET request utility
  get: (url, config = {}) => api.get(url, config),

  // POST request utility
  post: (url, data, config = {}) => api.post(url, data, config),

  // PUT request utility
  put: (url, data, config = {}) => api.put(url, data, config),

  // PATCH request utility
  patch: (url, data, config = {}) => api.patch(url, data, config),

  // DELETE request utility
  delete: (url, config = {}) => api.delete(url, config),

  // Upload file utility
  upload: (url, formData, config = {}) => {
    const uploadConfig = {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config.headers,
      },
    };
    return api.post(url, formData, uploadConfig);
  },

  // Download file utility
  download: (url, config = {}) => {
    const downloadConfig = {
      ...config,
      responseType: "blob",
    };
    return api.get(url, downloadConfig);
  },

  // Create custom API instance
  createCustomInstance: (customConfig = {}) => {
    const customApi = createApiInstance(customConfig);

    // Apply interceptors if needed
    if (customConfig.useAuth !== false) {
      const customRequestInterceptor = createRequestInterceptor(
        customConfig.requestOptions
      );
      const customResponseInterceptor = createResponseInterceptor(
        customConfig.responseOptions
      );

      customApi.interceptors.request.use(customRequestInterceptor, (error) =>
        Promise.reject(error)
      );
      customApi.interceptors.response.use(
        customResponseInterceptor.onSuccess,
        customResponseInterceptor.onError
      );
    }

    return customApi;
  },
};

export default api;
