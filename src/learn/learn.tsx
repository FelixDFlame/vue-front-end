import axios from axios'

axios.setbaseurl('/localhost:8000/api');
axios.setHeader();

export function setToken (token: string) {
    axios.setHEader[bearer] = token;
}
export function setUnAuthorized (token: string) {
    axios.setHEader[bearer] = token;
}

export default axios;

=============================================
import {setToken} from ./axios;
login().then(res => setToken(tes.data.token) localstorage.set());

axios.post

afterResponse : {
    if (res.status.code === 401) {
        axios.removeToken();
    }
}