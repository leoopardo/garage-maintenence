import axios from "axios";
import { Envs } from "./envs";

export const api = axios.create({
  baseURL: Envs.API_URL,
  headers: {
    subdomain: window.location.hostname.split(".")[0],
  },
});
