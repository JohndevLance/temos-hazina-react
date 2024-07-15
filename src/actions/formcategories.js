import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    FORM_CATEGORIES_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getFormCategories = () => {
    return (dispatch) => {
    //   dispatch({type: FETCH_START});
      axios.get('v1/form_categories',
      ).then(({data}) => {
        console.log("fetchformCategories: ", data);
        if (data.success) {
        //   dispatch({type: FETCH_SUCCESS});
          dispatch({type: FORM_CATEGORIES_DATA, payload: data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.message});
        }
      }).catch(function (error) {
          console.log(JSON.stringify(error))
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
};
