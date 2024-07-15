import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    FORM_CATEGORIES_DATA,
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    refesh : false,
    form_categories_data: [],
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FORM_CATEGORIES_DATA: {
            return {
                ...state,
                loader: false,
                form_categories_data: action.payload,
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
