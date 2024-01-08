import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import axios from "axios";

export default axios.create({
  baseURL: CLIENT_API_ENPOINT,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: CLIENT_API_ENPOINT,
  headers: { "Content-Type": "application/json" },
});
