import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import axios from "axios";

//use for API dont need token ==> GET api used for User page
export default axios.create({
  baseURL: CLIENT_API_ENPOINT,
  headers: { "Content-Type": "application/json" },
});

//user for API that need token ==> POST, PUT, PATCH used for Admin page
export const axiosAuth = axios.create({
  baseURL: CLIENT_API_ENPOINT,
  headers: { "Content-Type": "application/json" },
});
