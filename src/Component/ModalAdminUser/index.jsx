import React from 'react';
import { Modal } from '../../Component/Modal';
export default function ModalAdminUser(props) {
    const { editUser,openModal, setOpenModal } = props;
    return (
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
        </Modal>
    )
}
