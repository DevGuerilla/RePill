class UserService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/users";
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

  async createUser(userData) {
    try {
      console.log("UserService: Creating user", userData);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("UserService: Response data:", data);

      if (!response.ok) {
        console.error("UserService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("UserService: User created successfully");
      return data;
    } catch (error) {
      console.error("UserService: Error creating user:", error);
      return this.handleError(error);
    }
  }

  async updateUser(uuid, userData) {
    try {
      console.log("UserService: Updating user", { uuid, userData });

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("UserService: Response data:", data);

      if (!response.ok) {
        console.error("UserService: Error response:", data);
        return data; // Return the error data directly
      }

      console.log("UserService: User updated successfully");
      return data;
    } catch (error) {
      console.error("UserService: Error updating user:", error);
      return this.handleError(error);
    }
  }

  async getAllUsers(params = {}) {
    try {
      console.log("UserService: Fetching all users");

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
        console.error("UserService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("UserService: Users fetched successfully");
      return data?.data || [];
    } catch (error) {
      console.error("UserService: Error fetching users:", error);
      return this.handleError(error);
    }
  }

  async getUserById(uuid) {
    try {
      console.log("UserService: Fetching user by ID", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("UserService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("UserService: User fetched successfully");
      return data?.data || data;
    } catch (error) {
      console.error("UserService: Error fetching user:", error);
      return this.handleError(error);
    }
  }

  async deleteUser(uuid) {
    try {
      console.log("UserService: Deleting user", uuid);

      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("UserService: Error response:", data);
        return this.handleError({ response: { data } });
      }

      console.log("UserService: User deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("UserService: Error deleting user:", error);
      return this.handleError(error);
    }
  }
}

export default new UserService();
