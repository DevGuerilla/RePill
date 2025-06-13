class ApotekerService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/stocks/barcode";
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
      return { success: false, message: "No response from server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  async scanBarcode(data) {
    try {
      console.log("ApotekerService: Scanning barcode:", data);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("ApotekerService: Error response:", result);
        throw new Error(result.message || "Failed to scan barcode");
      }

      console.log("ApotekerService: Barcode scanned successfully");
      return result;
    } catch (error) {
      console.error("ApotekerService: Error scanning barcode:", error);
      throw new Error(error.message || "Failed to scan barcode");
    }
  }
}

export default new ApotekerService();
