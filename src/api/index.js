import axios from 'axios';

const API = axios.create({
    baseURL: 'https://dummyapi.io/data/v1/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
        'Content-type': 'application/json',
        'app-id': '618b965b0c847fcede16c4fb'
    }
});
export default API;