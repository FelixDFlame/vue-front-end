import axios from 'axios'

function setAuthorizationToken(token: String) {
    if (token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
}

export default axios.create({
    baseURL: 'http://localhost:8082/api'
})