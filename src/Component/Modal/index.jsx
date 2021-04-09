import React from 'react'
import './style.scss';
export const Modal = (props) => {
    return (
        <div className='modal'>
            {props.children}
        </div>
    )
}
