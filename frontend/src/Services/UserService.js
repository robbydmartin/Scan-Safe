import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getInfluencerBoard = () => {
    return axios.get(API_URL + "influencer", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getInfluencerBoard,
    getAdminBoard,
};

export default UserService;