class UserService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/users";
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

  // Get all users
  async getAllUsers(params = {}) {
    try {
      console.log("UserService: Fetching users");

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
      console.log("UserService: Users fetched successfully");

      // Return the data array from the API response
      return data?.data || [];
    } catch (error) {
      console.error("UserService: Error fetching users:", error);
      throw error;
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      console.log("UserService: Creating user", userData);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("UserService: Error response:", data);
        throw {
          response: {
            status: response.status,
            data: data,
          },
        };
      }

      console.log("UserService: User created successfully");
      return data?.data || data;
    } catch (error) {
      console.error("UserService: Error creating user:", error);
      throw error;
    }
  }

  // Get user by UUID
  async getUserById(uuid) {
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
      console.error("UserService: Error fetching user by ID:", error);
      throw error;
    }
  }

  // Update user using PUT method
  async updateUser(uuid, userData) {
    try {
      console.log("UserService: Updating user", { uuid, userData });

      // Ensure all required fields are present for PUT request
      const updateData = {
        fullname: userData.fullname || "",
        username: userData.username || "",
        email: userData.email || "",
        role_id: userData.role_id || "",
      };

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("UserService: User updated successfully");

      return data?.data || data;
    } catch (error) {
      console.error("UserService: Error updating user:", error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(uuid) {
    try {
      console.log("UserService: Deleting user", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("UserService: User deleted successfully");
      return data;
    } catch (error) {
      console.error("UserService: Error deleting user:", error);
      throw error;
    }
  }
}

export default new UserService();
