class StockService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/stocks";
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

  // Get all stocks
  async getAllStocks(params = {}) {
    try {
      console.log("StockService: Fetching stocks");

      const url = new URL(`${this.baseURL}${this.endpoint}`);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("StockService: Stocks fetched successfully");

      return data?.data || [];
    } catch (error) {
      console.error("StockService: Error fetching stocks:", error);
      throw error;
    }
  }

  // Create new stock
  async createStock(stockData) {
    try {
      console.log("StockService: Creating stock", stockData);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(stockData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("StockService: Error response:", data);
        throw {
          response: {
            status: response.status,
            data: data,
          },
        };
      }

      console.log("StockService: Stock created successfully");
      return data?.data || data;
    } catch (error) {
      console.error("StockService: Error creating stock:", error);
      throw error;
    }
  }

  // Get stock by UUID
  async getStockById(uuid) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data?.data || data;
    } catch (error) {
      console.error("StockService: Error fetching stock by ID:", error);
      throw error;
    }
  }

  // Update stock using PUT method
  async updateStock(uuid, stockData) {
    try {
      console.log("StockService: Updating stock", { uuid, stockData });

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("StockService: Stock updated successfully");

      return data?.data || data;
    } catch (error) {
      console.error("StockService: Error updating stock:", error);
      throw error;
    }
  }

  // Delete stock
  async deleteStock(uuid) {
    try {
      console.log("StockService: Deleting stock", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("StockService: Stock deleted successfully");
      return data;
    } catch (error) {
      console.error("StockService: Error deleting stock:", error);
      throw error;
    }
  }
}

export default new StockService();
