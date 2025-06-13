class SupplierService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/suppliers";
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

  // Get all suppliers
  async getAllSuppliers(params = {}) {
    try {
      console.log("SupplierService: Fetching suppliers");

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
        console.error("SupplierService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("SupplierService: Suppliers fetched successfully");
      return (
        data?.data || { data: [], total: 0, current_page: 1, last_page: 1 }
      );
    } catch (error) {
      console.error("SupplierService: Error fetching suppliers:", error);
      return this.handleError(error);
    }
  }

  // Create new supplier
  async createSupplier(supplierData) {
    try {
      console.log("SupplierService: Creating supplier", supplierData);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(supplierData),
      });

      const data = await response.json();
      console.log("SupplierService: Response data:", data);

      if (!response.ok) {
        console.error("SupplierService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("SupplierService: Supplier created successfully");
      return data;
    } catch (error) {
      console.error("SupplierService: Error creating supplier:", error);
      return this.handleError(error);
    }
  }

  // Get supplier by ID
  async getSupplierById(id) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}/${id}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data?.data || data;
    } catch (error) {
      console.error("SupplierService: Error fetching supplier by ID:", error);
      throw error;
    }
  }

  // Update supplier using PUT method
  async updateSupplier(uuid, supplierData) {
    try {
      console.log("SupplierService: Updating supplier", { uuid, supplierData });

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(supplierData),
      });

      const data = await response.json();
      console.log("SupplierService: Response data:", data);

      if (!response.ok) {
        console.error("SupplierService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("SupplierService: Supplier updated successfully");
      return data;
    } catch (error) {
      console.error("SupplierService: Error updating supplier:", error);
      return this.handleError(error);
    }
  }

  // Delete supplier
  async deleteSupplier(uuid) {
    try {
      console.log("SupplierService: Deleting supplier", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("SupplierService: Supplier deleted successfully");
      return data;
    } catch (error) {
      console.error("SupplierService: Error deleting supplier:", error);
      throw error;
    }
  }

  //Bawa kabeh supplier teu make pagenation
  async getAllSupplier() {
    try {
      console.log("SupplierService: Fetching all suppliers without pagination");

      const response = await fetch(`${this.baseURL}${this.endpoint}/all`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("SupplierService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("SupplierService: All suppliers fetched successfully");
      return data?.data || [];
    } catch (error) {
      console.error("SupplierService: Error fetching all suppliers:", error);
      return this.handleError(error);
    }
  }
}

export default new SupplierService();
