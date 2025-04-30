import axios from "axios";

const api = axios.create({
    baseURL: "https://api-sispar-production.up.railway.app/",
})

export default api;