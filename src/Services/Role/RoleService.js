class RoleService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/roles";
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

  // Get all roles
  async getAllRoles() {
    try {
      console.log("RoleService: Fetching roles");

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("RoleService: Roles fetched successfully");

      return data?.data || [];
    } catch (error) {
      console.error("RoleService: Error fetching roles:", error);
      throw error;
    }
  }

  // Get role by UUID
  async getRoleById(uuid) {
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
      console.error("RoleService: Error fetching role by ID:", error);
      throw error;
    }
  }
}

export default new RoleService();
