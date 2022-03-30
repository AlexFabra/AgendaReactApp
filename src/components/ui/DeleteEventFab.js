import React from 'react'
import { StartEventDelete } from '../../actions/events';
import { useDispatch } from 'react-redux';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    
    const handleDelete = ()=> {
        //llamamos a la accion correspondiente en el dispatch
        dispatch(StartEventDelete());
    }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
        <i className='fas fa-trash'></i>
        </button>
  )
}
