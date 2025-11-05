import axios from "axios";

const API_URL = "https://cabaniasback-production.up.railway.app/cabanias";

export const getCabanias = () => axios.get(API_URL);
