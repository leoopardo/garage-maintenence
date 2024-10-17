import axios from "axios";
import { io } from "socket.io-client";
import { Envs } from "./envs";

export const api = axios.create({
  baseURL: Envs.API_URL,
});

export const socket = io(Envs.API_URL);
