import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SALES_REP_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api';
import { push } from 'connected-react-router'

export const getReps = () => {
    console.log(localStorage.getItem("token"))
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/sales_reps',
      ).then(({data}) => {
        console.log("fetchSalesReps: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SALES_REP_DATA, payload: data.data});
          dispatch({type: REFRESH_TREE, payload: false});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.message});
          dispatch({type: REFRESH_TREE, payload: false});
        }
      }).catch(function (error) {
        if (error.response) {
          if(error.response.status==401){
            dispatch(push('/signin'))
          }
        }
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
};
export const attachRep = (id, structure_id) => {
  console.log(id, structure_id)
  const data = {structure_id : structure_id}
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.patch('v1/sales_reps/'+id,
      JSON.stringify(data)
      ).then(({data}) => {
        console.log("attachrep: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REFRESH_TREE, payload: true});
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