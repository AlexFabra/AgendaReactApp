import './modalStyles.css'

import React, { useEffect, useState } from 'react';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';
import { useDispatch, useSelector } from 'react-redux';

import DateTimePicker from 'react-datetime-picker'
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import moment from 'moment';
import { uiCloseModal } from '../../actions/ui';

//ya que está fuera del componente, cada vez que se genere un cambio no se 
//volverá a construir la constante
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const future = now.clone().add(1, 'hours'); //clonamos para no pasar now como referencia ni modificarlo.

const initEvent = {

    title: '',
    notes: '',
    start: now.toDate(),
    end: future.toDate()

}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    //const [isOpen, setIsOpen] = useState(true);

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(now.toDate());

    const [titleValid, setTitleValid] = useState(true)
    //para manejar los valores del formulario:
    const [formValues, setformValues] = useState(initEvent);
    //
    const { notes, title, start, end } = formValues;

    //con este hook obtenemos la info del formulario en el que se ha clicado
    useEffect(() => {
        if (activeEvent) {
            setformValues(activeEvent);
        } else { //si no hay evento activo el formulario se reestablece
            setformValues(initEvent);
        }
    }, [activeEvent, setformValues])


    //para modificar los formValues:
    const handleInputChange = ({ target }) => {
        setformValues({
            //hacemos una copia del objeto para no perder informacion:
            ...formValues,
            //modificamos el que viene como parámetro: 
            //(debemos asegurarnos de lo que entre como perámetro coincida con 
            //un atributo del objeto)
            [target.name]: target.value
        });
    }


    //para salir del modal:
    const closeModal = () => {
        //setIsOpen(false);
        //TODO:cerrar modal 
        dispatch(uiCloseModal())
        dispatch(eventClearActiveEvent());
        setformValues(initEvent);

    }

    //recibe un evento tipo fecha
    const handleStartDateChange = (e) => {
        //para cambiar la fecha del datepicker:
        setDateStart(e);
        setformValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setformValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            console.log("fecha dos debe ser mayor")
            Swal.fire('Error', 'la fecha final debe ser mayor a la inicial', 'error');
        }
        if (title.trim().length < 1) {
            return setTitleValid(false);
        }

        if (activeEvent) { //actualizando nota:
            dispatch(eventStartUpdate(formValues))
        } else { //creando nueva nota (llamamos a la funcion que graba en la base de datos y actualiza el state)
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1>{(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    {/* con onChange obtenemos las modificaciones que hace el user
                    con value definimos el valor por defecto y el que irá cambiando
                    con minDate limitamos la posible seleccion a la mayor que le pasemos */}
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className="form-control"
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    {/* con el siguiente class name manejamos que sea clase formcontrol y además que si la variable está en false
                    se añada la clase is-invalid de bootstrap */}
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="fas fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}
