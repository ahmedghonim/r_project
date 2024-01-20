/* eslint-disable camelcase */
import axios from "axios"

/**
 * @param apiType default is salon
 * @param contentType default is 'application/json'
 * @returns axios
 */
const useAxios = ({ contentType = "application/json" }) => {
  return axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": contentType,
      accept: "application/json",
    },
    withCredentials: false,
  })
}

export default useAxios
