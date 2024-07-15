import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    TYPES_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getTypes = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/type/all',
      ).then(({data}) => {
        console.log("fetchTypes: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: TYPES_DATA, payload: data.data});
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
