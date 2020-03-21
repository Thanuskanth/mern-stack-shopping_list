import axios from 'axios';
import {
    GET_ERROR,CLEAR_ERROR
} from '../action/types';

export const getError=(msg,status,id=null)=>dispatch=>{
    dispatch({
        type:GET_ERROR,
        payload:{msg,status,id}
    })

}
export const clearError=()=>dispatch=>{
    dispatch({
        type:CLEAR_ERROR
       
    })

}