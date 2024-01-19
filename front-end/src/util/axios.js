/* eslint-disable camelcase */
import axios from "axios";

const customAxios = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    withCredentials: false,
  });

export default customAxios;
