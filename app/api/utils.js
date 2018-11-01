import axios from 'axios';
import { DEFAULT_LOCALE } from 'globalConstants';
import { handleError } from './handleError';

export const axiosInstance = (needAuth = false) => {
  const { API_URL } = process.env;
  const authToken = needAuth ? localStorage.getItem('auth_token') : null;
  const language = localStorage.getItem('locale') || DEFAULT_LOCALE;
  const params = {
    baseURL: `${API_URL}`,
    timeout: 50000,
    headers: {
      'Accept-Language': language,
    },
  };
  if (authToken) {
    params.headers.Authorization = `Bearer ${authToken}`;
  }

  return axios.create(params);
};

export const get = (path, needAuth = false, params = null) => {
  const instance = axiosInstance(needAuth);
  return new Promise((resolve, reject) => {
    instance
      .get(path, { params })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(handleError(error.response));
      });
  });
};

export const post = (path, needAuth = false, data) => {
  const instance = axiosInstance(needAuth);

  return new Promise((resolve, reject) => {
    instance
      .post(path, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const postFormData = (path, needAuth = false, data) => {
  const instance = axiosInstance(needAuth);
  const formData = convertDataToFormData(data);

  return new Promise((resolve, reject) => {
    instance
      .post(path, formData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const put = (path, needAuth = false, data = null) => {
  const instance = axiosInstance(needAuth);

  return new Promise((resolve, reject) => {
    instance
      .put(path, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const patch = (path, needAuth = false, data = null) => {
  const instance = axiosInstance(needAuth);

  return new Promise((resolve, reject) => {
    instance
      .patch(path, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const patchFormData = (path, needAuth = false, data) => {
  const instance = axiosInstance(needAuth);
  const formData = convertDataToFormData(data);

  return new Promise((resolve, reject) => {
    instance
      .patch(path, formData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const del = (path, needAuth = false, data = null) => {
  const instance = axiosInstance(needAuth);
  return new Promise((resolve, reject) => {
    instance
      .request({ method: 'delete', url: path, data })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

const convertDataToFormData = data => {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    if (data[key] instanceof Blob) {
      formData.append(key, data[key], data[key].name);
    } else if (typeof data[key] === 'object') {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
};
