import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-1-oxzn.onrender.com/',
});
export default api;
     // Replace with your API base URL