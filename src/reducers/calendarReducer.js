import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//     title: 'El dia d',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'es el momento',
//     user: {
//         _id: '134',
//         name: 'Alejandro'
//     }
// }

const initialState = {
    events: [

    ],
    activeEvent: null

};
export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return { ...state, activeEvent: action.payload }
        case types.eventAddNew:
            return { ...state, events: [...state.events, action.payload] }
        case types.eventClearActiveEvent:
            return { ...state, activeEvent: null }
        case types.eventUpdated:
            return {
                ...state,
                //si coincide con el payload, regreso el payload, si no, regreso el evento:
                events: state.events.map(e => (e.id === action.payload.id) ? action.payload : e)
            }
        case types.eventDeleted:
            return {
                ...state,
                //filter para no regresar el payload que se envía
                //si el id que envio es diferente del de la nota que quiero eliminar (el activeEvent)
                events: state.events.filter(e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
      

        default:
            return state;
    }
}