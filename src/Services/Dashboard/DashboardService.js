class DashboardService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/dashboard";
  }

  // Get auth token from session storage
  getAuthToken() {
    return sessionStorage.getItem("auth_token");
  }

  // Get common headers
  getHeaders() {
    const token = this.getAuthToken();
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Handle error function like in MedicineService
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Tidak ada respons dari server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleError({ response: { data } });
      }

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Get recent reports data
  async getRecentReports() {
    try {
      const response = await fetch(
        `${this.baseURL}${this.endpoint}/report/recent`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return this.handleError({ response: { data } });
      }

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default new DashboardService();
