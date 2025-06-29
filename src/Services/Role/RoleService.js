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

  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Tidak ada respons dari server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  // Get all roles
  async getAllRoles() {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        return this.handleError({ response: { data } });
      }

      const data = await response.json();
      return data?.data || [];
    } catch (error) {
      return this.handleError(error);
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
        const data = await response.json();
        return this.handleError({ response: { data } });
      }

      const data = await response.json();
      return data?.data || data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default new RoleService();
