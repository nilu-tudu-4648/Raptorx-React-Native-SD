import axios from "axios";
import { isNonNullObject } from "./utils/raptorx-utils"; // Assuming you have this utility function

const allowedHeaders = {
  "Content-Type": "application/json",
};

function getValidHeaders(headers) {
  const result = {};

  if (!isNonNullObject(headers)) {
    return result;
  }

  for (const headerName in headers) {
    if (allowedHeaders.hasOwnProperty(headerName)) {
      result[headerName] = headers[headerName];
    }
  }

  return result;
}

class API {
  constructor(options) {
    this.axiosInstance = axios.create({
      baseURL: options.hostUrl,
      headers: {
        ...getValidHeaders(options.headers),
        apiKey: options.api_key,
      },
      auth: {},
      json: true,
    });
  }

  getEntityUrl(params) {
    return `/api${params && params.url ? "/" + params.url : ""}`;
  }

  async post(params, cb) {
    try {
      const response = await this.axiosInstance.post(
        this.getEntityUrl(params.url),
        params.data,
        {
          headers: getValidHeaders(params.headers),
        }
      );
      return cb ? cb(null, response) : response;
    } catch (error) {
      return cb ? cb(error) : Promise.reject(error);
    }
  }

  async put(params, cb) {
    try {
      const response = await this.axiosInstance.put(
        this.getEntityUrl(params),
        params.data,
        {
          headers: getValidHeaders(params.headers),
        }
      );
      return cb ? cb(null, response) : response;
    } catch (error) {
      return cb ? cb(error) : Promise.reject(error);
    }
  }

  async delete(params, cb) {
    try {
      const response = await this.axiosInstance.delete(this.getEntityUrl(params), {
        headers: getValidHeaders(params.headers),
      });
      return cb ? cb(null, response) : response;
    } catch (error) {
      return cb ? cb(error) : Promise.reject(error);
    }
  }
}

export default API;
