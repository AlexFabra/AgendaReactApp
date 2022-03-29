//objecto que centraliza todos los tipos de mis acciones 
export const types = {
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    eventSetActive: '[event] Set active',
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',

    eventDeleted: '[event] Event deleted',

    authChecking: '[auth] Checking login state',
    authCheckingFinish: '[auth] Finish checking login state',
    startLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

}