import api from "../Common/Base";

class ProfileService {
  constructor() {
    this.endpoint = "/profile";
  }

  // Get current user profile
  async getProfile() {
    try {
      console.log("ProfileService: Fetching profile");
      const response = await api.get(this.endpoint);
      console.log("ProfileService: Profile fetched successfully");

      return response.data?.data?.user || response.data?.user || {};
    } catch (error) {
      console.error("ProfileService: Error fetching profile:", error);
      throw error;
    }
  }

  // Update profile
  async updateProfile(profileData) {
    try {
      const response = await api.put(this.endpoint, profileData);
      return response.data?.data?.user || response.data?.user || {};
    } catch (error) {
      console.error("ProfileService: Error updating profile:", error);
      throw error;
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post(
        `${this.endpoint}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data?.data || response.data;
    } catch (error) {
      console.error("ProfileService: Error uploading profile picture:", error);
      throw error;
    }
  }
}

export default new ProfileService();
