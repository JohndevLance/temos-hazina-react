import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    FORMS_DATA,
    REFRESH_TREE
} from 'constants/ActionTypes';
import axios from 'util/Api'

export const postForm = (formjson) => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.post( 'v1/forms',
        formjson 
      )
      .then(({data}) => {
          //handle success
          console.log(data);
          if(data.success){
            dispatch({type: FETCH_SUCCESS});
          }else{
              let str='An error occured'
              if(data.errors){
                  str=''
              if(data.errors.length){
                  data.errors.map(error=>{
                    str = str+error;
                  })
                }
            }
            dispatch({type: FETCH_ERROR, payload: str});
            console.log(str)
          }
      })
      .catch((error) => {
          //handle error
          console.log(error);
          if(error.response){
            if(error.response.data){
              let str='An error occured'
              const data = error.response.data
              if(data.errors){
                const values = Object.values(data.errors)
                  str=''
              if(values.length){
                  values.map(error=>{
                    str = str+error;
                  })
                }
                dispatch({type: FETCH_ERROR, payload: str});
              }else{
                dispatch({type: FETCH_ERROR, payload: data.message});
              }
              console.log(str)
              
            }
          }
      });
    }
};

export const postFormCustom = (formjson) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post( 'v1/form/custom',
      formjson 
    )
    .then(({data}) => {
        //handle success
        console.log(data);
        if(data.success){
          dispatch({type: FETCH_SUCCESS});
        }else{
            let str='An error occured'
            if(data.errors){
                str=''
            if(data.errors.length){
                data.errors.map(error=>{
                  str = str+error;
                })
              }
          }
          dispatch({type: FETCH_ERROR, payload: str});
          console.log(str)
        }
    })
    .catch((error) => {
        //handle error
        console.log(error);
        if(error.response){
          if(error.response.data){
            let str='An error occured'
            const data = error.response.data
            if(data.errors){
              const values = Object.values(data.errors)
                str=''
            if(values.length){
                values.map(error=>{
                  str = str+error;
                })
              }
              dispatch({type: FETCH_ERROR, payload: str});
            }else{
              dispatch({type: FETCH_ERROR, payload: data.message});
            }
            console.log(str)
            
          }
        }
    });
  }
};
export const getForms = () => {
return (dispatch) => {
  dispatch({type: FETCH_START});
  axios.get('v1/forms',
  ).then(({data}) => {
    console.log("fetchForms: ", data);
    if (data.success) {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: FORMS_DATA, payload: data.data});
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
export const getQuestionTypes = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/question_types',
    ).then(({data}) => {
      console.log("fetchQuestionTypes: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: 'QUESTION_TYPES', payload: data.data});
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
export const getSkipOptions = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('v1/skip_options',
    ).then(({data}) => {
      console.log("fetchSkipOptions: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: 'SKIP_OPTIONS', payload: data.data});
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


