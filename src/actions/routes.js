import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    COUNTRIES_DATA,
    REGIONS_DATA,
    ROUTES_DATA,
    TOWNS_DATA,
    AREAS_DATA,
    STOCKIST_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const getCountries = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/countries',
      ).then(({data}) => {
        console.log("fetchCountries: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: COUNTRIES_DATA, payload: data.data});
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
    }).catch(function (error) {
        console.log(JSON.stringify(error))
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};
export const getRoutes = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/routes',
    ).then(({data}) => {
      console.log("fetchRoutes: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ROUTES_DATA, payload: data.data});
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
export const getTowns = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/towns',
    ).then(({data}) => {
      console.log("fetchTowns: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: TOWNS_DATA, payload: data.data});
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
export const getAreas = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/areas',
    ).then(({data}) => {
      console.log("fetchAreas: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: AREAS_DATA, payload: data.data});
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
export const getStockists = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/stockists',
    ).then(({data}) => {
      console.log("fetchStockists: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: STOCKIST_DATA, payload: data.data});
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
