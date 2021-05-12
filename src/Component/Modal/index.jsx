import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
export const Modal = (props) => {
    const { openModal, setOpenModal } = props;
    window.addEventListener('mouseup', (e) => {
        let domModalContent = document.querySelector('.modal');
        if (domModalContent) {
            if ( domModalContent.classList.contains('toggleModal') &&!domModalContent.contains(e.target)) {
                setOpenModal(!openModal);
            }
        }
    })
    return (
        <div className={`modal${openModal === true ? ' toggleModal' : ''}`}>
            <div className="closeButton">
                <CloseIcon className="closeIcon" onClick={() => setOpenModal(!openModal)} />
            </div>
            {props.children}
        </div>
    )
}
