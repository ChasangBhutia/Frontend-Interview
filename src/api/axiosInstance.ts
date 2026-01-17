import axios, {type AxiosInstance} from 'axios';

const BASE_URL = "http://localhost:3001"
const axiosInstance: AxiosInstance = axios.create({
    baseURL:BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance;