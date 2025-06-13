class StockService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/stocks";
  }

  getAuthToken() {
    return sessionStorage.getItem("auth_token");
  }

  getHeaders() {
    const token = this.getAuthToken();
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Handle error function like in your example
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "No response from server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  // Get all stocks
  async getAllStocks(params = {}) {
    try {
      console.log("StockService: Fetching stocks");

      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}${this.endpoint}${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("StockService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("StockService: Stocks fetched successfully");
      return (
        data?.data || { data: [], total: 0, current_page: 1, last_page: 1 }
      );
    } catch (error) {
      console.error("StockService: Error fetching stocks:", error);
      return this.handleError(error);
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
      console.log("StockService: Response data:", data);

      if (!response.ok) {
        console.error("StockService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("StockService: Stock created successfully");
      return data;
    } catch (error) {
      console.error("StockService: Error creating stock:", error);
      return this.handleError(error);
    }
  }

  // Get stock by UUID
  async getStockById(uuid) {
    try {
      console.log("StockService: Fetching stock by ID", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("StockService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("StockService: Stock fetched successfully");
      return data?.data || data;
    } catch (error) {
      console.error("StockService: Error fetching stock:", error);
      return this.handleError(error);
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

      const data = await response.json();
      console.log("StockService: Response data:", data);

      if (!response.ok) {
        console.error("StockService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("StockService: Stock updated successfully");
      return data;
    } catch (error) {
      console.error("StockService: Error updating stock:", error);
      return this.handleError(error);
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
        const data = await response.json();
        console.error("StockService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("StockService: Stock deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("StockService: Error deleting stock:", error);
      return this.handleError(error);
    }
  }

  // Get all medicines for stock creation
}

export default new StockService();
