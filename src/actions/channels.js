import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    CHANNELS_DATA,
    CHANNELS_PAGINATED_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getChannels = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/channel/all',
      ).then(({data}) => {
        console.log("fetchChannels: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: CHANNELS_DATA, payload: data.data});
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

export const getChannelsPaginated = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/channels',
    ).then(({data}) => {
      console.log("fetchChannels: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CHANNELS_PAGINATED_DATA, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch( (error) => {
        console.log(JSON.stringify(error))
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};
