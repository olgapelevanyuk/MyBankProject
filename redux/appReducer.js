import {
  USERS_LOADING,
  USERS_LOADED,
  APPLICATIONS_LOADED,
  APPLICATIONS_LOADING,
  SET_CURRENT_USER,
  LOG_OUT,
  ADD_USER,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  SET_CURRENT_APPLICATION,
  UPDATE_USER,
  DELETE_USER
} from "../constants/actionTypes"

const initState = {
  users: {
    list: [],
    loading: false,
    currentUser: {
      userProfile: null,
      userData: null
    }
  },
  applications: {
    list: [],
    loading: false,
    currentApplication: null
  }
}

function appReducer(state = initState, action) {
  switch (action.type) {
    case USERS_LOADING: {
      let newState = {
        ...state,
        users: {
          ...state.users,
          loading: true
        }
      }
      return newState
    }

    case USERS_LOADED: {
      let newState = {
        ...state,
        users: {
          ...state.users,
          loading: false,
          list: action.data
        }
      }
      return newState
    }

    case ADD_USER: {
      let newState = {
        ...state,
        users: {
          ...state.users,
          list: [...state.users.list, action.user]
        }
      }
      console.log(ADD_USER, newState)
      return newState
    }

    case UPDATE_USER: {
      const newUserslList = state.users.list.map((user) => {
        if (user.id === action.user.id) {
          return action.user
        } else {
          return user
        }
      })
      let newState = {
        ...state,
        users: {
          ...state.users,
          list: [...newUserslList]
        }
      }
      console.log(UPDATE_USER, newState)
      return newState
    }

    case DELETE_USER: {
      const newUserslList = state.users.list.filter(
        (user) => user.id !== action.id
      )
      let newState = {
        ...state,
        users: {
          ...state.users,
          list: [...newUserslList]
        }
      }
      console.log(DELETE_USER, newState)
      return newState
    }

    case SET_CURRENT_USER: {
      let newState = {
        ...state,
        users: {
          ...state.users,
          currentUser: {
            userProfile: action.user,
            userData: null
          }
        }
      }
      console.log(SET_CURRENT_USER, newState)
      return newState
    }

    case LOG_OUT: {
      let newState = {
        ...state,
        users: {
          ...state.users,
          currentUser: {
            userProfile: null,
            userData: null
          }
        }
      }
      return newState
    }

    case APPLICATIONS_LOADING: {
      let newState = {
        ...state,
        applications: {
          ...state.applications,
          loading: true
        }
      }
      return newState
    }

    case APPLICATIONS_LOADED: {
      let newState = {
        ...state,
        applications: {
          ...state.applications,
          loading: false,
          list: action.data
        }
      }
      return newState
    }

    case ADD_APPLICATION: {
      let newState = {
        ...state,
        applications: {
          ...state.applications,
          list: [...state.applications.list, action.application]
        }
      }
      console.log(ADD_APPLICATION, newState)
      return newState
    }

    case UPDATE_APPLICATION: {
      const newApplList = state.applications.list.map((application) => {
        if (application._id === action.application._id) {
          return action.application
        } else {
          return application
        }
      })
      console.log(newApplList)
      let newState = {
        ...state,
        applications: {
          ...state.applications,
          list: [...newApplList]
        }
      }
      console.log(UPDATE_APPLICATION, newState)
      return newState
    }

    case SET_CURRENT_APPLICATION: {
      let newState = {
        ...state,
        applications: {
          ...state.applications,
          currentApplication: action.application
        }
      }
      console.log(SET_CURRENT_APPLICATION, newState)
      return newState
    }

    default:
      return state
  }
}

export default appReducer
