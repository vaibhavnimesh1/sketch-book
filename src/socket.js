import { io } from "socket.io-client";
const URL = process.env.NODE_ENV === "production" ? "http://localhost:5000" : "https://sketch-book-server-rdwb.onrender.com"
export const socket = io(URL);
