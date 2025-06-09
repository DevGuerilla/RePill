import { apiUtils, setStoredToken } from "../Common/Base";

/**
 * Login user dengan kredensial
 * @param {Object} credentials - Kredensial user (username, password)
 * @returns {Promise} - Respons API
 */
export const login = async (credentials) => {
  try {
    const response = await apiUtils.post("/auth/login", credentials);

    if (response.data?.success) {
      // Extract token from response and store it
      const token = response.data?.data?.token || response.data?.token;
      const user = response.data?.data?.user || response.data?.user;

      if (token) {
        // Store token in sessionStorage
        setStoredToken(token);
        console.log("Token stored successfully");
      }

      return {
        success: true,
        token: token,
        user: user,
        message: response.data.message || "Berhasil masuk ke sistem",
        data: response.data.data,
      };
    } else {
      throw new Error(
        response.data?.message || "Format respons tidak valid dari server"
      );
    }
  } catch (error) {
    console.error("Login error:", error);

    const loginError = {
      ...error,
      message:
        error.message || "Gagal masuk. Periksa username dan kata sandi Anda.",
    };

    if (error.status === 401) {
      loginError.message = "Username atau kata sandi salah. Silakan coba lagi.";
    } else if (error.status === 422) {
      loginError.message =
        error.data?.message ||
        "Data login tidak valid. Periksa kembali input Anda.";
    } else if (error.type === "network") {
      loginError.message =
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }

    throw loginError;
  }
};

/**
 * Logout user yang sedang login
 * @returns {Promise} - Respons API
 */
export const logout = async () => {
  try {
    const response = await apiUtils.post("/logout");

    // Clear token from storage regardless of server response
    setStoredToken(null);

    return {
      success: true,
      message: "Berhasil keluar dari sistem",
      ...response.data,
    };
  } catch (error) {
    console.error("Logout error:", error);

    // Even if logout fails on server, clear local token
    setStoredToken(null);

    return {
      success: true,
      message: "Berhasil keluar dari sistem",
    };
  }
};

/**
 * Memeriksa status autentikasi
 * @returns {Promise} - Respons API
 */
export const checkAuthStatus = async () => {
  try {
    const response = await apiUtils.get("/auth/status");
    return response.data;
  } catch (error) {
    console.error("Auth status check error:", error);

    const statusError = {
      ...error,
      message: error.message || "Gagal memeriksa status autentikasi",
    };

    throw statusError;
  }
};

/**
 * Refresh token
 * @returns {Promise} - Respons API
 */
export const refreshToken = async () => {
  try {
    const response = await apiUtils.post("/auth/refresh");
    return {
      ...response.data,
      message: response.data.message || "Token berhasil diperbarui",
    };
  } catch (error) {
    console.error("Token refresh error:", error);

    const refreshError = {
      ...error,
      message:
        error.message || "Gagal memperbarui token. Silakan masuk kembali.",
    };

    throw refreshError;
  }
};
