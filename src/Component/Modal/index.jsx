import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
export const ModalPopup = (props) => {
    const { openModal, setOpenModal } = props;
    const handleClose = () => {
        setOpenModal(false)
    }
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            className='modal'
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <div className="modal__body">
                    <div className="closeButton">
                        <CloseIcon className="closeIcon" onClick={() => { setOpenModal(false) }} />
                    </div>
                    {props.children}
                </div>
            </Fade>
        </Modal>
    )
}
