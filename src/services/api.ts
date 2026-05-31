import axios from "axios";

const api = axios.create({
    baseURL: "https://teste-node-yjtw.onrender.com"
})

export default api;