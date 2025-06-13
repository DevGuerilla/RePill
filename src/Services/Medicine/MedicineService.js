class MedicineService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/medicines";
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

  // Get all medicines with pagination
  async getAllMedicines(params = {}) {
    try {
      console.log("MedicineService: Fetching medicines with pagination");

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
        console.error("MedicineService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("MedicineService: Medicines fetched successfully");
      return (
        data?.data || { data: [], total: 0, current_page: 1, last_page: 1 }
      );
    } catch (error) {
      console.error("MedicineService: Error fetching medicines:", error);
      return this.handleError(error);
    }
  }

  // Create new medicine
  async createMedicine(medicineData) {
    try {
      console.log("MedicineService: Creating medicine", medicineData);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(medicineData),
      });

      const data = await response.json();
      console.log("MedicineService: Response data:", data);

      if (!response.ok) {
        console.error("MedicineService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("MedicineService: Medicine created successfully");
      return data;
    } catch (error) {
      console.error("MedicineService: Error creating medicine:", error);
      return this.handleError(error);
    }
  }

  // Get medicine by UUID
  async getMedicineById(uuid) {
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
      console.error("MedicineService: Error fetching medicine by ID:", error);
      throw error;
    }
  }

  // Update medicine using PUT method
  async updateMedicine(uuid, medicineData) {
    try {
      console.log("MedicineService: Updating medicine", { uuid, medicineData });

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(medicineData),
      });

      const data = await response.json();
      console.log("MedicineService: Response data:", data);

      if (!response.ok) {
        console.error("MedicineService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("MedicineService: Medicine updated successfully");
      return data;
    } catch (error) {
      console.error("MedicineService: Error updating medicine:", error);
      return this.handleError(error);
    }
  }

  // Delete medicine
  async deleteMedicine(uuid) {
    try {
      console.log("MedicineService: Deleting medicine", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("MedicineService: Medicine deleted successfully");
      return data;
    } catch (error) {
      console.error("MedicineService: Error deleting medicine:", error);
      throw error;
    }
  }

  // Get all medicines without pagination (for dropdowns)
  async getAllMedicine() {
    try {
      console.log("MedicineService: Fetching all medicines without pagination");

      const response = await fetch(`${this.baseURL}/medicines/all`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("MedicineService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("MedicineService: All medicines fetched successfully");
      return data?.data || [];
    } catch (error) {
      console.error("MedicineService: Error fetching all medicines:", error);
      return this.handleError(error);
    }
  }
}

export default new MedicineService();
