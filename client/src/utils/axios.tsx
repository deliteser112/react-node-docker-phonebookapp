import axios from "axios";

const serverURL = "http://localhost:5000";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: serverURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
