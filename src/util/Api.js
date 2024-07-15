import axios from 'axios';
import { BASE_URL, FETCH_ERROR, USER_TOKEN_SET, USER_DATA } from '../constants/ActionTypes'
import configureStore, {history} from '../store';
import { push } from 'connected-react-router';

export const store = configureStore();

var headers = {};

  headers = {
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
  }


const axiosInstance = axios.create({
  baseURL: BASE_URL,//YOUR_API_URL HERE
  headers: headers
});
const isHandlerEnabled = (config={}) => {
  console.log(config.hasOwnProperty('handlerEnabled'))
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
    false : true
}
const requestHandler = (request) => {
  const token = localStorage.token
  if (isHandlerEnabled(request)) {
    // Modify request here
    if(token){
      let newToken = token
      if(isJson(token)){
        newToken = JSON.parse(token)
      }
      request.headers['Authorization'] = 'Bearer '+ newToken
      request.headers['Accept'] = 'application/json' 
    }
  }
  return request
}
function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
axiosInstance.interceptors.request.use(
  request => requestHandler(request)
)
const errorHandler = (error) => {
  // console.log(error.response.data)
  // if (isHandlerEnabled(error.config)) {
    // Handle errors
    if(error.response){
    if (error.response.status === 401) {
      console.log(error.response.status)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      store.dispatch({type:"reset_auth"})
      store.dispatch(push('/signin'))
      store.dispatch({type : FETCH_ERROR, payload : error.response.data})
      store.dispatch({type: USER_TOKEN_SET, payload: ""});
      store.dispatch({type: USER_DATA, payload: []});
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    // store.dispatch({type : FETCH_ERROR, payload : "test"})
    if (error.response.data.status === 500) {
      store.dispatch({type : FETCH_ERROR, payload : error.response.data})
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if(error.response){
      if(error.response.data){
        let str='An error occured'
        const data = error.response.data
        if(data.errors){
          console.log(data.errors)
          const values = Object.values(data.errors)
            str=''
        if(values.length){
            values.map(error=>{
              str = str+error;
              store.dispatch({type: FETCH_ERROR, payload: str})
            })
          }
        }else{
          store.dispatch({type: FETCH_ERROR, payload: error.response.data.message})
        }
        console.log(str)
        store.dispatch({type: FETCH_ERROR, payload: str})
      }
    }
  }
  else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  // console.log(error.config);
  // }
  return Promise.reject({ ...error })
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response
}
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)
export default axiosInstance

