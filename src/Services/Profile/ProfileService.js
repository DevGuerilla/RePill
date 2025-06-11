import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

class ProfileService {
  async getProfile() {
    try {
      const token = sessionStorage.getItem("auth_token");
      console.log("Fetching profile with token:", token);

      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("Get Profile Raw Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error getting profile:", error);
      throw error.response?.data || error;
    }
  }

  async updateProfile(profileData) {
    try {
      const token = sessionStorage.getItem("auth_token");

      // Hanya kirim field yang diizinkan dan tidak kosong
      const cleanData = {};
      ["fullname", "username", "email"].forEach((key) => {
        if (
          typeof profileData[key] === "string" &&
          profileData[key].trim() !== ""
        ) {
          cleanData[key] = profileData[key].trim();
        }
      });

      if (!cleanData.fullname || !cleanData.username || !cleanData.email) {
        throw new Error("Semua field harus diisi dengan benar.");
      }

      console.log("Updating profile with data:", cleanData);

      const response = await axios.put(`${BASE_URL}/profile`, cleanData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Update Profile Raw Response:", response);

      // Clear stored user data to force a fresh fetch
      sessionStorage.removeItem("user_data");

      return response.data;
    } catch (error) {
      // Tampilkan error detail dari backend jika ada
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        alert(
          error.response.data?.message ||
            "Gagal memperbarui profil. Silakan cek data yang dikirim."
        );
      } else {
        alert(error.message || "Gagal memperbarui profil.");
      }
      throw error.response?.data || error;
    }
  }
}

export default new ProfileService();
