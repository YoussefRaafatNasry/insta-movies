import { API_BASE_URL, API_KEY } from "@env";
import axios from "axios";

export const client = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});
