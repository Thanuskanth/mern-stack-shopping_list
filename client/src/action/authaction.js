import axios from 'axios';
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
    USER_LODED
} from '../action/types';
import {getError} from "./erroraction";

export const header =(token)=>{
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}


export const userloading = () => (dispatch, setstate) => {
    dispatch({ type: USER_LOADING });
    const token = setstate().auth.token;
    const config = {
        header: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.header['x-auth-token'] = token;
    }
    axios.get('http://localhost:5000/auth/user', config).then(res=>{
        dispatch({
            type: USER_LODED,
            payload: res.data
        })
    }).catch(err => {
        dispatch(getError(err.response.data,err.response.status))
        dispatch({ type: AUTH_ERROR })
    })


}
export const register = (user) => dispatch => {
    dispatch({ type: USER_LOADING });
    
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    const body=JSON.stringify(user);

    
    axios.post('http://localhost:5000/user/add',user, config).then(res=>{
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(getError(err.response.data,err.response.status,"register_err"))
        dispatch({ type: REGISTER_FAIL })
    })


}
export const logout =()=>dispatch=>{
dispatch({
    type:LOGOUT_SUCCESS
})
}
export const login = (user) => dispatch => {
    dispatch({ type: USER_LOADING });
    
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    const body=JSON.stringify(user);
    console.log('this is user',user)
    
    axios.post('http://localhost:5000/auth/',user, config).then(res=>{
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(getError(err.response.data,err.response.status,"login_error"))
        dispatch({ type: LOGIN_FAIL })
    })


}
