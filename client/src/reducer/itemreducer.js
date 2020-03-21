import { v4 as uuidv4 } from 'uuid';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM ,LOADING} from '../action/types'
const initialState = {
    items: [ ],
    loading:false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items:action.payload,
                loading:false
            }
        case DELETE_ITEM:
            return {
                ...state,

                items: state.items.filter(item => item._id !== action.payload),

            }
        case ADD_ITEM:
            return {
                ...state,

                items: [...state.items, action.payload],

            }
        case LOADING:
            return {
                ...state,

                loding: true
            }
        default:
            return state;
    }
}