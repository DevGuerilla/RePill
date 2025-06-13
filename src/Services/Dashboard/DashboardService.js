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
      return { success: false, message: "No response from server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      console.log("DashboardService: Fetching dashboard statistics");

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("DashboardService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("DashboardService: Dashboard stats fetched successfully");
      return data;
    } catch (error) {
      console.error("DashboardService: Error fetching dashboard stats:", error);
      return this.handleError(error);
    }
  }

  // Get recent reports data
  async getRecentReports() {
    try {
      console.log("DashboardService: Fetching recent reports");

      const response = await fetch(
        `${this.baseURL}${this.endpoint}/report/recent`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("DashboardService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("DashboardService: Recent reports fetched successfully");
      return data;
    } catch (error) {
      console.error("DashboardService: Error fetching recent reports:", error);
      return this.handleError(error);
    }
  }
}

export default new DashboardService();
