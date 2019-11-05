import log from '../utils/networkLog'
import { logout } from "../services/auth";
import { UNAUTHORIZED_STATUS } from '../utils/constants'

export default {
    requestInterceptor: config => {
        log("Request config: ", config) 
        return config
    },
    
    responseInterceptors: [
        config => {
            log("Response config: ", config) 
            return config
        }, 
        error => {
            if (error.response && error.response.status === UNAUTHORIZED_STATUS) {
                logout();
            }
            return Promise.reject(error);
        }
    ]
    
}