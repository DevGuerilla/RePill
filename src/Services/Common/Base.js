import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

// Create base axios instance
const createApiInstance = (config = {}) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
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
  sessionStorage.removeItem("user_data");
};

// Request interceptor
const requestInterceptor = (config) => {
  // Add auth token if available
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Pastikan Content-Type diatur dengan benar untuk PUT/POST/PATCH requests
  if (["post", "put", "patch"].includes(config.method?.toLowerCase())) {
    if (!config.headers["Content-Type"] && config.data) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  // Debug output untuk request
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
    headers: config.headers,
    data: config.data || {},
  });

  return config;
};

// Response interceptor
const responseInterceptor = {
  onSuccess: (response) => {
    // Debug output untuk response sukses
    console.log(
      `API Response Success: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      response.data
    );
    return response;
  },

  onError: (error) => {
    // Debug output untuk response error
    console.error(
      `API Response Error: ${error.config?.method?.toUpperCase()} ${
        error.config?.url
      }`,
      error.response?.data || error
    );

    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = data?.message || "Terjadi kesalahan pada server";

      switch (status) {
        case 401:
          errorMessage = "Sesi Anda telah berakhir. Silakan masuk kembali";
          clearStorage();
          break;
        case 403:
          errorMessage =
            "Anda tidak memiliki akses untuk melakukan tindakan ini";
          break;
        case 404:
          errorMessage = "Data yang dicari tidak ditemukan";
          break;
        case 422:
          errorMessage = data?.message || "Data yang dikirim tidak valid";
          break;
        case 500:
          errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi";
          break;
        default:
          errorMessage = data?.message || `Terjadi kesalahan (${status})`;
      }

      const formattedError = {
        message: errorMessage,
        status,
        data: data?.data || data,
        errors: data?.errors,
        type: "error",
      };

      return Promise.reject(formattedError);
    } else if (error.request) {
      const networkError = {
        message:
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.",
        type: "network",
        originalError: error,
      };
      return Promise.reject(networkError);
    } else {
      const otherError = {
        message:
          error.message ||
          "Terjadi kesalahan yang tidak dikenal. Silakan coba lagi.",
        type: "unknown",
        originalError: error,
      };
      return Promise.reject(otherError);
    }
  },
};

// Apply interceptors
api.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);
api.interceptors.response.use(
  responseInterceptor.onSuccess,
  responseInterceptor.onError
);

// Export apiUtils for backward compatibility
export const apiUtils = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),

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

  download: (url, config = {}) => {
    const downloadConfig = {
      ...config,
      responseType: "blob",
    };
    return api.get(url, downloadConfig);
  },
};

export default api;
