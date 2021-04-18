import React from 'react'
import { Link } from 'react-router-dom';
import ModalProfile from '../ModalProfile';

import './style.scss';
export default function ProfileInfo(props) {
    const { user, setUser } = props;
    const handleToggleModal = () => {
        let domModal = document.querySelector('.modal')
        domModal.classList.toggle('toggleModal')
    }
    // click ngoài pham vi form sẽ đóng modal lại
    window.addEventListener('click', (e) => {
        let domModal = document.querySelector('#inputModal');
        let domBtn = document.querySelector('.btn-changeInfo');
        if (domModal && domBtn) {
            let domModalContent = domModal.querySelector('.modal');
            if (domModalContent.classList.contains('toggleModal') && !domModalContent.contains(e.target) && !domBtn.contains(e.target)) {
                domModalContent.classList.toggle('toggleModal');
            }
        }
    })

    return (
        <div className="profileInfo">
            <div className="headerProfile">
                <Link className='btn_comback' to='/'><p>CineX</p></Link>
                <button className='btn_Menu'>....</button>
            </div>
            <div className="info_Content">
                <div className="avtNameUser">
                    <div className="avtImg">
                        <img src="./img/profile/avt.jfif" alt="" />
                    </div>
                    <div className="nameUser">
                        <p>{user.hoTen}</p>
                    </div>
                </div>
                <div className="infoUser">
                    <div className="inforUser">
                        <p>Số điện thoại: <span>{user.soDT}</span></p>
                        <p>Email: <span>{user.email}</span></p>
                    </div>
                    <button className='btn-changeInfo' onClick={() => handleToggleModal()}>Đổi mật khẩu</button>
                    <div id="inputModal">
                        <ModalProfile user={user} setUser={setUser} />
                    </div>
                </div>

            </div>
        </div>
    )
}
