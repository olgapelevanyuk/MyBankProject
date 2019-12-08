export const USERS_LOADING = 'USERS_LOADING';
export const USERS_LOADED = 'USERS_LOADED';
export const APPLICATIONS_LOADING = 'APPLICATIONS_LOADING';
export const APPLICATIONS_LOADED = 'APPLICATIONS_LOADED';
export const acApplicationsLoaded = data => {
    return {
        type: APPLICATIONS_LOADED, 
        data: data,
    }
}
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const acAddUser = user => {
    return {
        type: ADD_USER,
        user: user,
    }
}

export const acDeleteUser = id => {
    return {
        type: DELETE_USER,
        id: id,
    }
}

export const acUpdateUser = user => {
    return {
        type: UPDATE_USER,
        user: user,
        id: user.id,
    }
}

export const acSetCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user: user,
    }
}

export const LOG_OUT = 'LOG_OUT';
export const acLogOut = () => {
    return {
        type: LOG_OUT,
    }
}
export const ADD_APPLICATION = 'ADD_APPLICATION';
export const acAddApplication = appl => {
    return {
        type: ADD_APPLICATION,
        application: appl,
    }
}

export const UPDATE_APPLICATION = 'UPDATE_APPLICATION';
export const acUpdateApplication = appl => {
    return {
        type: UPDATE_APPLICATION,
        application: appl,
    }
}

export const SET_CURRENT_APPLICATION = 'SET_CURRENT_APPLICATION';

export const acSetCurrentApplication = appl => {
    return {
        type: SET_CURRENT_APPLICATION,
        application: appl,
    }
}