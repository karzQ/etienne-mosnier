import { useReducer } from "react"

export const UserActions = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
    CLEAR_CURRENT_USER: "CLEAR_CURRENT_USER"
}

const initialState = {
    user: null
};
  
const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                user: {...action.payload}
            });
        case 'CLEAR_CURRENT_USER':
            return initialState
        default:
            return state;
    }
}

export default userReducer

// export const getUserReducer = () => useReducer(userReducer, initialState)