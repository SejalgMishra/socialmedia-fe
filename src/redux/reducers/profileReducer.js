import { TYPES } from "../actions/profileAction"

const initialState = {
    loading : false,
    users : [],
    posts : []
}

const profileReducer = (state = initialState , action) => {
    switch (action.type) {
       case TYPES.LOADING:
           
           return {
            ...state,
            loading : action.payload
           }
           case TYPES.GET_USER:
           
           return {
            ...state,
            users : [...state.users , action.payload]
           }
    
       default:
           return state;
    }
   }
   
   export default profileReducer


