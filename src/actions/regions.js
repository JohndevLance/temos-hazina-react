import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    REGIONS_DATA
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getRegions = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/regions',
      ).then(({data}) => {
        console.log("fetchRegions: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REGIONS_DATA, payload: data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.message});
        }
      }).catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
};
