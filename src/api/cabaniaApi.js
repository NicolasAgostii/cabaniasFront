import axios from "axios";

const API_URL = "http://54.159.22.152:8080/cabanias";

export const getCabanias = () => axios.get(API_URL);
