import {GET_ITEMS,ADD_ITEM,DELETE_ITEM, LOADING} from './types'
import axios from 'axios';
import {getError} from  './erroraction';
import {header} from  './authaction';
export  const getItem = () =>dispatch => {
    dispatch(loading());
    axios.get('http://localhost:5000/items').then(res=>
    dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
}
export  const deleteItem = (id)=>(dispatch,getState) => {
    axios.delete(`http://localhost:5000/items/${id}`,header(getState().auth.token)).then(res=>
    dispatch({
        type:DELETE_ITEM,
        payload:id

    }))
}
export  const addItem = (name)=>(dispatch,getState) => {
   

   
    axios.post('http://localhost:5000/items/add',name,header(getState().auth.token)).then(res=>
    dispatch({
        type:ADD_ITEM,
        payload:res.data


    })).catch(err=>{
        dispatch(getError(err.response.data,err.response.status))
    })
}
export  const loading = () => {
    return{
        type:LOADING,
    }
}