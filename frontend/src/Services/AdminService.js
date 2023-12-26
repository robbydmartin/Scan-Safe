import axios from 'axios';
import authHeader from './auth-header';
const USER_URL = 'http://localhost8080/api/auth/'

const getUsers = () => {
    return axios.get(USER_URL + "all")
        .catch(error => {
        console.log(error);
    })
};


const AdminService = {
    getUsers
};
export default AdminService;