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

  // Get all suppliers
  async getAllSuppliers(params = {}) {
    try {
      console.log("SupplierService: Fetching suppliers");

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
      console.log("SupplierService: Suppliers fetched successfully");

      return data?.data || [];
    } catch (error) {
      console.error("SupplierService: Error fetching suppliers:", error);
      throw error;
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

      if (!response.ok) {
        console.error("SupplierService: Error response:", data);
        throw {
          response: {
            status: response.status,
            data: data,
          },
        };
      }

      console.log("SupplierService: Supplier created successfully");
      return data?.data || data;
    } catch (error) {
      console.error("SupplierService: Error creating supplier:", error);
      throw error;
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("SupplierService: Supplier updated successfully");

      return data?.data || data;
    } catch (error) {
      console.error("SupplierService: Error updating supplier:", error);
      throw error;
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
}

export default new SupplierService();
