import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SALES_REP_DATA,
    REFRESH_TREE
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    refesh : false,
    salesrepdata: [],
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SALES_REP_DATA: {
            return {
                ...state,
                loader: false,
                salesrepdata: action.payload
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
        case REFRESH_TREE: {
            return {
                ...state,
                refresh: action.payload
            }
        }
        default:
            return state;
    }
}
