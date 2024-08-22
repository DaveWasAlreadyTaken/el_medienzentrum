import axios from "axios";
import host from "./host";

const API_URL = host+'/wp-json/wp/v2/'

class ApiService{
    get(url) {
        return axios.get(API_URL + url);
    }
    post(url,data){
        return axios.post(API_URL+url,data);
    }
}

export default new ApiService();