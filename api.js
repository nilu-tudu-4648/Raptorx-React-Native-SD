import axios from 'axios';

class API {
  constructor(options) {
    this.hostUrl = options.hostUrl;
    this.api_key = options.api_key;
    this.headers = options.headers || {};
  }

  async post(url, data, headers = {}) {
    try {
      const response = await axios.post(`${this.hostUrl}/${url}`, data, {
        headers: {
          ...this.headers,
          ...headers,
          api_key: this.api_key,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to make POST request to ${url}: ${error.message}`);
    }
  }

  async put(url, data, headers = {}) {
    try {
      const response = await axios.put(`${this.hostUrl}/${url}`, data, {
        headers: {
          ...this.headers,
          ...headers,
          api_key: this.api_key,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to make PUT request to ${url}: ${error.message}`);
    }
  }

  async delete(url, headers = {}) {
    try {
      const response = await axios.delete(`${this.hostUrl}/${url}`, {
        headers: {
          ...this.headers,
          ...headers,
          api_key: this.api_key,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to make DELETE request to ${url}: ${error.message}`);
    }
  }

  async get(url, headers = {}) {
    try {
      const response = await axios.get(`${this.hostUrl}/${url}`, {
        headers: {
          ...this.headers,
          ...headers,
          api_key: this.api_key,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to make GET request to ${url}: ${error.message}`);
    }
  }
}

export default API;
