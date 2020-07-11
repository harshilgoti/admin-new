import axios from "axios";

const defaultOptions = {
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  headers: {
    common: {
      "Content-Type": "application/json"
    }
  }
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(config => {
  config.headers.authorization = `bearer ${localStorage.getItem("user-token")}`;
  return config;
});

export default instance;
