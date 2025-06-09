import { apiUtils } from "../Common/Base";

class UserService {
  constructor() {
    this.endpoint = "/users";
  }

  // Get all users
  async getAllUsers(params = {}) {
    try {
      console.log("UserService: Fetching users");
      const response = await apiUtils.get(this.endpoint, { params });
      console.log("UserService: Users fetched successfully");

      // Return the data array from the API response
      return response.data?.data || [];
    } catch (error) {
      console.error("UserService: Error fetching users:", error);
      throw error;
    }
  }

  // Get user by UUID
  async getUserById(uuid) {
    try {
      const response = await apiUtils.get(`${this.endpoint}/${uuid}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("UserService: Error fetching user by ID:", error);
      throw error;
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      console.log("UserService: Creating user", userData);
      const response = await apiUtils.post(this.endpoint, userData);
      console.log("UserService: User created successfully");
      return response.data?.data || response.data;
    } catch (error) {
      console.error("UserService: Error creating user:", error);
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

      const response = await apiUtils.put(
        `${this.endpoint}/${uuid}`,
        updateData
      );
      console.log("UserService: User updated successfully");

      return response.data?.data || response.data;
    } catch (error) {
      console.error("UserService: Error updating user:", error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(uuid) {
    try {
      console.log("UserService: Deleting user", uuid);
      const response = await apiUtils.delete(`${this.endpoint}/${uuid}`);
      console.log("UserService: User deleted successfully");
      return response.data;
    } catch (error) {
      console.error("UserService: Error deleting user:", error);
      throw error;
    }
  }
}

export default new UserService();
