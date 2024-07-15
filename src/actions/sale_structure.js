import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SALE_STRUCTURE_DATA,
    REFRESH_TREE,
    SHOW_MESSAGE
} from 'constants/ActionTypes';
import axios from 'util/Api';
import { push } from 'connected-react-router'

export const getStructure = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/sale_structures',
      ).then(({data}) => {
        console.log("fetchSaleStructure: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SALE_STRUCTURE_DATA, payload: data.data});
          dispatch({type: REFRESH_TREE, payload: false});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.message});
          dispatch({type: REFRESH_TREE, payload: false});
        }
      }).catch( (error) => {
        console.log(error)
        if (error.response) {
          if(error.response.status==401){
            // dispatch(push('/signin'))
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
        // dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
};
export const addChild = (childobj) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('v1/sale_structures',childobj
    ).then(({data}) => {
      console.log("fetchSaleStructure: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "Child added successfully"});
        dispatch({type: REFRESH_TREE, payload: true});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch( (error) => {
      console.log(JSON.stringify(error.message))
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};
export const editChild = (id, text) => {
  console.log("editing child")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('v1/sale_structures/'+id+'?_method=PATCH',{
      title : text
    },
    {handlerEnabled : true}
    ).then(({data}) => {
      console.log("fetcheditStructure: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: REFRESH_TREE, payload: true});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch( (error) => {
      console.log(JSON.stringify(error))
      console.log(JSON.stringify(error.response))
      dispatch({type: FETCH_ERROR, payload: "Error occured attaempting to complete your request"});
      console.log("Error****:", error.message);
    });
  }
};
export const deleteChild = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('v1/sale_structures/'+id,
    ).then(({data}) => {
      console.log("fetchSaleStructure: ", data);
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

export const refreshTree = () => {
  return {
      type: REFRESH_TREE,
      payload: true
  }
};