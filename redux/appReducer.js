//import { COUNTRIES_LOADING, COUNTRIES_ERROR, COUNTRIES_SET } from './countriesAC';

const initState={
  
}

function appReducer(state=initState,action) {
  switch (action.type) {

    case 'BIKES_LOADING': {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case 'BIKES_ERROR': {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case 'BIKES_SET': {
      let newState={
        status:action.status,
        data:action.data,
      };
      return newState;
    }
    case "COMMENT_SENT": {
      let newState = {...state};
      newState.data.forEach((v,i) => {
        if(action.updatedItem.id == v.id){
          newState.data[i] = action.updatedItem;
        }
      })
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
