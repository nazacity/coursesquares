import axios from 'axios';
import humps from 'humps';

class HttpRequest {
  constructor(url = 'http://45.64.184.37:8648/v1') {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      config => {
        const myConfig = config;
        myConfig.data = config.data;
        // ? humps.decamelizeKeys(config.data)
        // : config.data;
        myConfig.params = config.params;
        // ? humps.decamelizeKeys(config.params)
        // : config.params;
        return myConfig;
      },
      error => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      response => {
        const newResponse = response;
        newResponse.data = humps.camelizeKeys(response.data);
        return newResponse.data;
      },
      error => {
        const newError = new Error(error);
        if (error && error.response && error.response.data) {
          return Promise.reject(error.response.data);
        }
        const errorFail = {
          code: 503,
          message: newError.message,
        };
        throw errorFail;
      },
    );
  }

  setHeader(header) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value;
    this.axiosInstance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
  }

  get(endpoint, data, config) {
    const params = {
      params: data,
    };
    const newParams = Object.assign(params, config);
    return this.axiosInstance.get(endpoint, newParams);
  }

  post(endpoint, data, config) {
    return this.axiosInstance.post(endpoint, data, config);
  }

  put(endpoint, data, config) {
    return this.axiosInstance.put(endpoint, data, config);
  }

  patch(endpoint, data, config) {
    return this.axiosInstance.patch(endpoint, data, config);
  }

  remove(endpoint, data, config) {
    const params = {data};
    const newParams = Object.assign(params, config);
    return this.axiosInstance.delete(endpoint, newParams);
  }

  delete(endpoint, id, config) {
    const params = {
      params: {
        id,
      },
    };
    const newParams = Object.assign(params, config);
    return this.axiosInstance.delete(endpoint, newParams);
  }

  getByPagination(endpoint, query) {
    const newQuery = JSON.parse(JSON.stringify(query));

    delete newQuery.sortDesc;
    delete newQuery.itemsPerPage;
    if (Array.isArray(query.sortDesc)) {
      newQuery.sortOrder = query.sortDesc[0] ? 'desc' : 'asc';
    }
    newQuery.sortBy = '_id';
    if (
      Array.isArray(query.sortBy) &&
      query.sortBy[0] &&
      query.sortBy[0] !== 'id'
    ) {
      newQuery.sortBy = query.sortBy[0];
    }
    newQuery.page = query.page || 1;
    newQuery.limit = query.limit || query.itemsPerPage || 25;
    newQuery.search = query.search || null;
    return this.axiosInstance.get(endpoint, {params: newQuery});
  }
}

export default HttpRequest;
