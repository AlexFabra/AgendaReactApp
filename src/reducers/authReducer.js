import { types } from "../types/types";

const initialState = {
    checking: true, //no se sabe si el usuario esta idenfificado hasta que checking sea false
    //uid: null,
    //name: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }
            
        default: return state;
    }
}