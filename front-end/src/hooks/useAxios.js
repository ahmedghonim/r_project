/* eslint-disable camelcase */
import axios from "axios";

/**
 * @param apiType default is salon
 * @param contentType default is 'application/json'
 * @returns axios
 */
const useAxios = ({ contentType = "application/json" }) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": contentType,
      accept: "application/json",
    },
    withCredentials: false,
  });
};

export default useAxios;
