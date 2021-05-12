import React from 'react';
import { Modal } from '../../Component/Modal';
export default function ModalAdminUser(props) {
    const { closeModal, editUser } = props;
    return (
        <Modal closeModal={closeModal}>
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
