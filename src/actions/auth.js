import { fetchConToken, fetchSinToken } from "../helpers/fetch"

import Swal from "sweetalert2";
import { types } from "../types/types";

/** dado un mail y un pwd, intenta iniciar sesion con un post a la api, 
 *  guarda en el localstorage el token y en el store la info del usuario 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
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

/** dado un mail, un pwd y un nombre, intenta crear un usuario con un post a la api,
 *  guarda en el localstorage el token y en el store la info del usuario
 * @param {*} email 
 * @param {*} password 
 * @param {*} name 
 * @returns 
 */
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

/** limpia los datos del localstorage y del store de redux
 * @returns 
 */
export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({ type: types.authLogout });