import axios from "axios";
import config from "../configurations/configurations";
import { API_SERVICES_CONFIGURATION as services } from "../configurations/constants"

const callApi = (serviceName, payload) => {
    try {
        const isServiceNameValid = Object.keys(services).includes(serviceName);
        if (!isServiceNameValid) {
            throw "Invalid Service Name";
        }
        const configuration = {
            method: services[serviceName].method,
            url: config[config.BUILD].baseUrl + services[serviceName].url,
            data: payload
        };
        return axios(configuration).then((res) => {
            return [res.data, null];
        }).catch((err) => {
            return [null, err];
        });
    } catch (error) {
        return [null, error];
    }
};

export default callApi;