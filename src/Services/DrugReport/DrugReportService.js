class DrugReportService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/dashboard/report/usage";
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

  // Handle error function
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Tidak ada respons dari server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  // Get drug usage report with period filter
  async getDrugUsageReport(period = "daily", page = 1, limit = 10) {
    try {
      const params = new URLSearchParams({
        period,
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `${this.baseURL}${this.endpoint}?${params}`,
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

  // Get drug usage summary
  async getDrugUsageSummary() {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}/summary`, {
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
}

export default new DrugReportService();
