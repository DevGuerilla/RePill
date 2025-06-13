class StockPredictionsService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/dashboard/analytics/prediction";
  }

  // Get auth token from session storage
  getAuthToken() {
    return sessionStorage.getItem("auth_token");
  }

  // Get common headers
  getHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getAuthToken()}`,
    };
  }

  // Handle error function
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Tidak ada respon dari server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  // Get stock predictions
  async getStockPredictions() {
    try {
      console.log("StockPredictionsService: Mengambil data prediksi stok");

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("StockPredictionsService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log(
        "StockPredictionsService: Data prediksi stok berhasil diambil"
      );
      return data;
    } catch (error) {
      console.error(
        "StockPredictionsService: Error fetching predictions:",
        error
      );
      return this.handleError(error);
    }
  }
}

export default new StockPredictionsService();
