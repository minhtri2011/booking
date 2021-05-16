import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
export const Modal = (props) => {
    const { openModal, setOpenModal } = props;
    return (
        <div className={`modal${openModal ? ' toggleModal' : ''}`}>
            <div className="modal__body">
                <div className="closeButton">
                    <CloseIcon className="closeIcon" onClick={() => { setOpenModal(false) }} />
                </div>
                {props.children}
            </div>
            <div className="modal__background" onClick={() => { setOpenModal(false) }}></div>
        </div>
    )
}
