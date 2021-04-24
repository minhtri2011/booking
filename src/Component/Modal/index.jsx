import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
export const Modal = (props) => {
    const {closeModal}=props;
    return (
        <div className='modal'>
            <div className="closeButton">
            <CloseIcon className='closeIcon' onClick={()=>closeModal()}/>
            </div>
            {props.children}
        </div>
    )
}
