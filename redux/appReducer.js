import { USERS_LOADING, USERS_LOADED } from "../constants/actionTypes";

const initState={
  users: {
    list: [],
    loading: false,
    currentUser: null, 
  },
  
}

function appReducer(state=initState,action) {
  switch (action.type) {

    case USERS_LOADING: {
      
      let newState={
        ...state.users, 
        loading: true,
      };
      return {
        ...state,
        users: newState,
      };
    }

    case USERS_LOADED: {
      
      let newState={
        ...state.users, 
        loading: false,
        list: action.data,
      };
      return {
        ...state,
        users: newState,
      };
    }

    default:
      return state;
  }
}

export default appReducer;
