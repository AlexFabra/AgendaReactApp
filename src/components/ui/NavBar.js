import React from 'react'

export const NavBar = () => {
    return (
        <div className='navbar navbar-light bg-light mb-4'>
            <span className='navbar-brand'>
                Pep
            </span>
            <button className="btn btn-outline-danger">
                <i className='fas fa-sign-out-alt'></i>
                <span>Salir</span>
            </button>
        </div>
        
    )
}
