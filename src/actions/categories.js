import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    CATEGORIES_DATA,
    REFRESH_TREE,
    SHOW_MESSAGE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getCategories = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/categories',
      ).then(({data}) => {
        console.log("fetchCategories: ", data);
        if (data.success) {
          console.log(data.data)
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: CATEGORIES_DATA, payload: data.data});
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
export const addCategory = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('v1/categories',data
    ).then(({data}) => {
      console.log("postCategories: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: REFRESH_TREE, payload: true});
        dispatch({type: SHOW_MESSAGE, payload: "Category added successfully"});
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
export const editCategory = (id, text) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.patch('v1/categories/'+id,{
      name : text
    }
    ).then(({data}) => {
      console.log("fetcheditcategory: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: REFRESH_TREE, payload: true});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch(function (error) {
        console.warn(JSON.stringify(error))
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};
export const deleteChild = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('v1/sale_structures/'+id
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