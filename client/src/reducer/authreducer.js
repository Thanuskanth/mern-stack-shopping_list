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

const initialstate = {
    token: localStorage.getItem('token'),
    isauthenticated: null,
    user: null,
    isloading: false
}
export default function (state = initialstate, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isloading: true,
            }
        case USER_LODED:
            return {
                ...state,
                isauthenticated: true,
                isloading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.getItem('token');

            return {
                ...state,
                ...action.payload,
                isauthenticated: true,
                isloading: false
            }
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                isauthenticated:false,
                isloading:false,
                user:null,
                token:null
            }
            default:return state;
    }
}