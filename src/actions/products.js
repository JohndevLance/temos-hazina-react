import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    PRODUCTS_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getProducs = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/channel/all',
      ).then(({data}) => {
        console.log("fetchChannels: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: PRODUCTS_DATA, payload: data.data});
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
