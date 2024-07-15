import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    SIGNIN_FACEBOOK_USER,
    SIGNIN_FACEBOOK_USER_SUCCESS,
    SIGNIN_GITHUB_USER,
    SIGNIN_GITHUB_USER_SUCCESS,
    SIGNIN_GOOGLE_USER,
    SIGNIN_GOOGLE_USER_SUCCESS,
    SIGNIN_TWITTER_USER,
    SIGNIN_TWITTER_USER_SUCCESS,
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    BASE_URL,
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    USER_DATA,
    USER_TOKEN_SET
} from 'constants/ActionTypes';
import { Redirect } from 'react-router-dom';
import axios from 'util/Api'
import { push } from 'connected-react-router'
  
  export const setInitUrl = (url) => {
    return {
      type: INIT_URL,
      payload: url
    };
  };
  
  export const userSignUp = ({name, email, password}) => {
    console.log(name, email, password);
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.post('auth/register', {
          email: email,
          password: password,
          name: name
        }
      ).then(({data}) => {
        console.log("data:", data);
        if (data.result) {
          localStorage.setItem("token", JSON.stringify(data.token.access_token));
          console.log(axios.defaults.headers)
          axios.defaults.headers.common['Authorization'] = "Bearer " + data.token.access_token;
          console.log(axios.defaults.headers)
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
          dispatch({type: USER_DATA, payload: data.user});
        } else {
          console.log("payload: data.error", data.Message);
          dispatch({type: FETCH_ERROR, payload: "Network Error"});
        }
      }).catch( (error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
  };
  
  export const userSignIn = ({email, password}) => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.post('login', {
          email: email,
          password: password,
        }
      ).then(({data}) => {
        console.log("userSignIn: ", data);
        if (data.Code ===201) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          axios.defaults.headers.common['Authorization'] = "Bearer " + data.token.access_token;
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: USER_TOKEN_SET, payload: data.token});
          dispatch({type: SIGNIN_USER_SUCCESS, payload: data.token});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.Message});
        }
      }).catch( (error) => {
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
                  dispatch({type: FETCH_ERROR, payload: str})
                })
              }
            }else{
              dispatch({type: FETCH_ERROR, payload: error.response.data.message})
            }
            console.log(str)
          }
        }
        // dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
  };
  
  export const getUser = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.post('auth/me',
      ).then(({data}) => {
        console.log("userSignIn: ", data);
        if (data.result) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: USER_DATA, payload: data.user});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      }).catch( (error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
  };
  
  
  export const userSignOut = () => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get('v1/logout',
      ).then(({data}) => {
        console.log(data)
        if (data.Code ==201) {
          dispatch({type: FETCH_SUCCESS});
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SIGNOUT_USER_SUCCESS});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      }).catch(function (error) {
        if (error.response) {
          if(error.response.status==401){
            dispatch(push('/signin'))
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });
    }
  };
  
export const userSignUpSuccess = (authUser) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: authUser
    };
};

export const userSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: authUser
    }
};
export const userSignOutSuccess = () => {
    return {
        type: SIGNOUT_USER_SUCCESS,
    }
};

export const showAuthMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    };
};


export const userGoogleSignIn = () => {
    return {
        type: SIGNIN_GOOGLE_USER
    };
};
export const userGoogleSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_GOOGLE_USER_SUCCESS,
        payload: authUser
    };
};
export const userFacebookSignIn = () => {
    return {
        type: SIGNIN_FACEBOOK_USER
    };
};
export const userFacebookSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_FACEBOOK_USER_SUCCESS,
        payload: authUser
    };
};
export const userTwitterSignIn = () => {
    return {
        type: SIGNIN_TWITTER_USER
    };
};
export const userTwitterSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_TWITTER_USER_SUCCESS,
        payload: authUser
    };
};
export const userGithubSignIn = () => {
    return {
        type: SIGNIN_GITHUB_USER
    };
};
export const userGithubSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_GITHUB_USER_SUCCESS,
        payload: authUser
    };
};
export const showAuthLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};
export const hideAuthLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};
