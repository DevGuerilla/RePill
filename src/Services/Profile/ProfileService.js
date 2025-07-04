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

  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Tidak ada respons dari server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  async getProfile() {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return data;
      }

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        return data;
      }

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default new ProfileService();
