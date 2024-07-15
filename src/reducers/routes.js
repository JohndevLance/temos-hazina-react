import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    COUNTRIES_DATA,
    REGIONS_DATA,
    ROUTES_DATA,
    TOWNS_DATA,
    AREAS_DATA,
    STOCKIST_DATA
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    refesh : false,
    countries_data: [],
    regions_data: [],
    routes_data: [],
    towns_data: [],
    stockists_data: [],
    areas_data: [],
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case COUNTRIES_DATA: {
            return {
                ...state,
                loader: false,
                countries_data: action.payload,
            }
        }
        case REGIONS_DATA: {
            return {
                ...state,
                loader: false,
                regions_data: action.payload,
            }
        }
        case ROUTES_DATA: {
            return {
                ...state,
                loader: false,
                routes_data: action.payload,
            }
        }
        case TOWNS_DATA: {
            return {
                ...state,
                loader: false,
                towns_data: action.payload,
            }
        }
        case AREAS_DATA: {
            return {
                ...state,
                loader: false,
                areas_data: action.payload,
            }
        }
        case STOCKIST_DATA: {
            return {
                ...state,
                loader: false,
                stockists_data: action.payload,
            }
        }
        
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }
        default:
            return state;
    }
}
