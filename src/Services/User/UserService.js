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

  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Tidak ada respons dari server." };
    } else {
      return { success: false, message: error.message };
    }
  }

  async createUser(userData) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
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

  async updateUser(uuid, userData) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
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

  async getAllUsers(params = {}) {
    try {
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
        return this.handleError({ response: { data } });
      }

      return (
        data?.data || { data: [], total: 0, current_page: 1, last_page: 1 }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserById(uuid) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleError({ response: { data } });
      }

      return data?.data || data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteUser(uuid) {
    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}/${uuid}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        return this.handleError({ response: { data } });
      }

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default new UserService();
