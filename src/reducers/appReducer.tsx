import { architecture } from '../config/config'

export const ReducerActions = {
    SET_APP_ARCHITECTURE: 'SET_APP_ARCHITECTURE',
    SET_CURRENT_USER: "SET_CURRENT_USER",
    CLEAR_CURRENT_USER: "CLEAR_CURRENT_USER"
}

const initialState = {
    architecture, 
    user: null
};

const appReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case 'SET_APP_ARCHITECTURE':
            return Object.assign({}, state, {
                user: { ...state, architecture: {...action.payload}}
            });
        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                user: { ...state, user: {...action.payload} }
            });
        case 'CLEAR_CURRENT_USER':
            return initialState
        default:
            return state;
    }
}

export default appReducer;