import axios from "axios";

// TODO: extract environment variables
export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "afd0a8ba089aca0252f77afbac737153",
  },
});
