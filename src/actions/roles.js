import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    ROLES_DATA,
    REFRESH_TREE,
    SUPERVISOR_DATA
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getRoles = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/roles?paginate=true',
      ).then(({data}) => {
        console.log("fetchRoles: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: ROLES_DATA, payload: data.data});
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
export const getSupervisorRoles = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/role/supervisor',
    ).then(({data}) => {
      console.log("fetchRoles: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SUPERVISOR_DATA, payload: data.data});
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
