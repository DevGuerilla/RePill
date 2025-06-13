class RestockerService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.barcodeEndpoint = "/stocks/barcode";
    this.medicineEndpoint = "/medicines/all";
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
      console.log("RestockerService: Scanning barcode:", data);

      const response = await fetch(`${this.baseURL}${this.barcodeEndpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("RestockerService: Response data:", result);

      if (!response.ok) {
        console.error("RestockerService: Error response:", result);
        return result; // Return the error data directly
      }

      console.log("RestockerService: Barcode scanned successfully");
      return result;
    } catch (error) {
      console.error("RestockerService: Error scanning barcode:", error);
      return this.handleError(error);
    }
  }

  async getAllMedicines() {
    try {
      console.log("RestockerService: Fetching all medicines");

      const response = await fetch(`${this.baseURL}${this.medicineEndpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const result = await response.json();
      console.log("RestockerService: Medicines response:", result);

      if (!response.ok) {
        console.error("RestockerService: Error response:", result);
        return this.handleError({ response: { data: result } });
      }

      console.log("RestockerService: Medicines fetched successfully");
      return result?.data || [];
    } catch (error) {
      console.error("RestockerService: Error fetching medicines:", error);
      return this.handleError(error);
    }
  }
}

export default new RestockerService();
