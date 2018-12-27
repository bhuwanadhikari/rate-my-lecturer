import {
   GET_PROFILE,
   GET_PROFILES,
   GET_ERRORS,
   PROFILE_LOADING,
   PROFILE_NOT_FOUND,
   CLEAR_CURRENT_PROFILE
} from '../actions/types';


const initialState = {
   profile: null,
   profiles: null,
   loading: null
};

export default function (state = initialState, action) {
   switch (action.type){

      case PROFILE_LOADING:
         return {
            ...state,
            loading: true
         };

      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: false
         };

      case GET_ERRORS:
         return action.payload;

      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null
         };

      case GET_PROFILES:
         return {
            ...state,
            profiles: action.payload
         };
      default:
         return state;
   }
   
}