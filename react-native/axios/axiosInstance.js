import axios from "axios"; // 
import env from '../../env';
import log from '../utils/networkLog'
import interceptors from './interceptors'
import { getAccessToken, getClientToken } from '../services/auth'


export default async (baseURL = env.API_URL) => {
    try {
        log("axios instance baseUrl: ", baseURL)
        
        const headers = {
            'Accept': "application/json",
            "Content-Type": "application/json",
            'client_id': env.CLIENT_ID, 
        };
        
        const accessToken = await getAccessToken()
        const clientToken = await getClientToken()
        
        if (accessToken) headers['access_token'] = accessToken;
        if (clientToken) headers['client_token'] = clientToken;
        
        log("axios instance headers: ", headers)

        instance = axios.create({
            baseURL: baseURL,
            headers: { ...headers },
            timeout: 20000
        });

        instance.interceptors.request.use(interceptors.requestInterceptor);
        instance.interceptors.response.use(...interceptors.responseInterceptors);

        lastBaseURL = baseURL;

        return instance;
    } catch (err) {
        log("axios instance creation error: ", err)
        
        throw err
    } 
};