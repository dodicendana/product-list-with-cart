import callApi from "./api.service"
import { API_SERVICES, API_GET_LIMIT } from "../configurations/constants"

export const getProducts = () => {
    return callApi(API_SERVICES.GET_PRODUCTS, {
        limit: API_GET_LIMIT,
        page: 1,
    });
}