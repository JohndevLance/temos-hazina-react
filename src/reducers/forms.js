import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    FORMS_DATA,
    FORMS_PAGINATED_DATA
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    refesh : false,
    formsdata: [],
    question_types : [],
    skip_options : [],
    formsspaginateddata : []
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FORMS_DATA: {
            return {
                ...state,
                loader: false,
                formsdata: action.payload,
            }
        }
        case 'QUESTION_TYPES': {
            return {
                ...state,
                loader: false,
                question_types: action.payload,
            }
        }
        case 'SKIP_OPTIONS': {
            return {
                ...state,
                loader: false,
                skip_options: action.payload,
            }
        }
        case FORMS_PAGINATED_DATA: {
            return {
                ...state,
                loader: false,
                formsspaginateddata: action.payload,
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
