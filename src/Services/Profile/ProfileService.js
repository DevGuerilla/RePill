class ProfileService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.endpoint = "/profile";
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

  // Handle error function
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "No response from server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  async getProfile() {
    try {
      console.log("ProfileService: Fetching profile data");

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("ProfileService: Get profile error response:", data);
        return data; // Return the error data directly
      }

      console.log("ProfileService: Profile data fetched successfully");
      return data;
    } catch (error) {
      console.error("ProfileService: Error fetching profile:", error);
      return this.handleError(error);
    }
  }

  async updateProfile(profileData) {
    try {
      console.log("ProfileService: Updating profile data", profileData);

      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("ProfileService: Update profile error response:", data);
        return data; // Return the error data directly
      }

      console.log("ProfileService: Profile data updated successfully");
      return data;
    } catch (error) {
      console.error("ProfileService: Error updating profile:", error);
      return this.handleError(error);
    }
  }
}

export default new ProfileService();
