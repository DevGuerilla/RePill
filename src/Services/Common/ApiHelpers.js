import { apiUtils } from "./Base";

/**
 * Generic CRUD operations helper
 */
export class CrudService {
  constructor(baseEndpoint) {
    this.baseEndpoint = baseEndpoint;
  }

  // Get all items with optional query parameters
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `${this.baseEndpoint}?${queryString}`
      : this.baseEndpoint;
    return apiUtils.get(url);
  }

  // Get single item by ID
  async getById(id) {
    return apiUtils.get(`${this.baseEndpoint}/${id}`);
  }

  // Create new item
  async create(data) {
    return apiUtils.post(this.baseEndpoint, data);
  }

  // Update existing item
  async update(id, data) {
    return apiUtils.put(`${this.baseEndpoint}/${id}`, data);
  }

  // Partially update item
  async patch(id, data) {
    return apiUtils.patch(`${this.baseEndpoint}/${id}`, data);
  }

  // Delete item
  async delete(id) {
    return apiUtils.delete(`${this.baseEndpoint}/${id}`);
  }
}

/**
 * API response handler utilities
 */
export const responseHandlers = {
  // Handle paginated responses
  handlePagination: (response) => {
    return {
      data: response.data?.data || [],
      pagination: {
        currentPage: response.data?.current_page || 1,
        lastPage: response.data?.last_page || 1,
        perPage: response.data?.per_page || 10,
        total: response.data?.total || 0,
      },
    };
  },

  // Handle list responses
  handleList: (response) => {
    return response.data?.data || response.data || [];
  },

  // Handle single item responses
  handleSingle: (response) => {
    return response.data?.data || response.data;
  },
};

/**
 * Create service with custom configuration
 */
export const createService = (config = {}) => {
  const customApi = apiUtils.createCustomInstance(config);

  return {
    api: customApi,
    crud: (endpoint) => new CrudService(endpoint),
    get: (url, options) => customApi.get(url, options),
    post: (url, data, options) => customApi.post(url, data, options),
    put: (url, data, options) => customApi.put(url, data, options),
    patch: (url, data, options) => customApi.patch(url, data, options),
    delete: (url, options) => customApi.delete(url, options),
  };
};
