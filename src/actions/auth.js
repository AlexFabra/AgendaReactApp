import { fetchConToken, fetchSinToken } from "../helpers/fetch"

import Swal from "sweetalert2";
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('tokenInitDate', new Date().getTime());
            dispatch(login({ uid: body.uid, name: body.name }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('tokenInitDate', new Date().getTime());
            dispatch(login({ uid: body.uid, name: body.name }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

/** startchecking renovará el token
 * @returns 
 */
export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('tokenInitDate', new Date().getTime());
            dispatch(login({ uid: body.uid, name: body.name }))
        } else {
            dispatch(authCheckingFinish());
        }
    }
}

const authCheckingFinish = () => ({
    type: types.authCheckingFinish
});

const login = (user) => ({
    type: types.authLogin,
    payload: user
})