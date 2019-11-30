import { USERS_LOADING, USERS_LOADED, APPLICATIONS_LOADED, APPLICATIONS_LOADING, SET_CURRENT_USER, LOG_OUT, ADD_USER } from "../constants/actionTypes";

const initState={
  users: {
    list: [],
    loading: false,
    currentUser: {
      userProfile: null,
      userData: null,
    }, 
  },
  applications: {
    list: [],
    loading: false,
    currentApplication: null,
  },
}

function appReducer(state=initState,action) {
  switch (action.type) {

    case USERS_LOADING: {
      
      let newState={
        ...state,users : {
          ...state.users,
          loading: true,
        }
      };
      return newState;
    }

    case USERS_LOADED: {
      
      let newState={
        ...state,
        users : {
          ...state.users,
          loading: false,
        list: action.data,
        } 
      };
      return newState;
    }

    case ADD_USER : {
      let newState={
        ...state,
        users : {
          ...state.users,
        list: [...state.users.list, action.user],
        } 
      };
      console.log(ADD_USER, newState);
      return newState;
    }

    case SET_CURRENT_USER : {
      let newState={
        ...state,
        users : {
          ...state.users,
        currentUser: action.user,
        } 
      };
      console.log(SET_CURRENT_USER, newState);
      return newState;
    }

    case LOG_OUT : {
      let newState={
        ...state,
        users : {
          ...state.users,
        currentUser: null,
        } 
      };
      return newState;
    }

    case APPLICATIONS_LOADING: {
      
      let newState={
        ...state,applications : {
          ...state.applications,
          loading: true,
        }
      };
      return newState;
    }

    case APPLICATIONS_LOADED: {
      
      let newState={
        ...state,
        applications : {
          ...state.applications,
          loading: false,
        list: action.data,
        } 
      };
      return newState;
    }


    default:
      return state;
  }
}

export default appReducer;
