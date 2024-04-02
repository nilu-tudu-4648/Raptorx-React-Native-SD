import axios from 'axios';

const allowedHeaders = {
  "Content-Type": "application/json",
};

function getValidHeaders(headers) {
  const result = {};

  if (!headers || typeof headers !== 'object') {
    return result;
  }

  for (const headerName in headers) {
    if (allowedHeaders.hasOwnProperty(headerName)) {
      result[headerName] = headers[headerName];
    }
  }

  return result;
}

function normalizeError(err) {
  throw {
    statusCode: err.response ? err.response.status : 500,
    error: err.message,
  };
}

class API {
  constructor(options) {
    this.hostUrl = options.hostUrl;
    this.apiKey = options.api_key;
    this.headers = {
      ...getValidHeaders(options.headers),
      apiKey: options.api_key,
    };
  }

  getEntityUrl(params) {
    return `/api${params && params.url ? "/" + params.url : ""}`;
  }

  async post(params, cb) {
    try {
      const response = await axios.post(
        this.hostUrl + this.getEntityUrl(params),
        params.data,
        {
          headers: getValidHeaders(params.headers),
        }
      );
      return cb ? cb(null, response.data) : response.data;
    } catch (error) {
      if (cb) {
        cb(normalizeError(error));
      } else {
        throw normalizeError(error);
      }
    }
  }

  async put(params, cb) {
    try {
      const response = await axios.put(
        this.hostUrl + this.getEntityUrl(params),
        params.data,
        {
          headers: getValidHeaders(params.headers),
        }
      );
      return cb ? cb(null, response.data) : response.data;
    } catch (error) {
      if (cb) {
        cb(normalizeError(error));
      } else {
        throw normalizeError(error);
      }
    }
  }

  async delete(params, cb) {
    try {
      const response = await axios.delete(
        this.hostUrl + this.getEntityUrl(params),
        {
          headers: getValidHeaders(params.headers),
        }
      );
      return cb ? cb(null, response.data) : response.data;
    } catch (error) {
      if (cb) {
        cb(normalizeError(error));
      } else {
        throw normalizeError(error);
      }
    }
  }
}

export const createAPIInstance = (api_key, headers = {}) => {
  if (!api_key) {
    throw new Error("`api_key` is mandatory");
  }

  return new API({
    hostUrl: "https://server.panoplia.io",
    api_key,
    headers,
  });
};
