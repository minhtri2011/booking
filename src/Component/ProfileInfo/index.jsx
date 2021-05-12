import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ModalProfile from '../ModalProfile';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function ProfileInfo(props) {
    const { user, setUser } = props;
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="profileInfo">
            <div className="info_Header">
                <Link className='btn_comback' to='/'><p>CineX</p></Link>
                <ExitToAppIcon className='logoutIcon' />
            </div>
            <div className="info_Content">
                <div className="avtNameUser">
                    <div className="avtImg">
                        <img src="./img/profile/avt.jfif" alt="avt.jfif" />
                    </div>
                    <div className="nameUser">
                        <p>{user.hoTen}</p>
                    </div>
                </div>
                <div className="infoUser">
                    <div className="info">
                        <p>Số điện thoại: <span>{user.soDT}</span></p>
                        <p>Email: <span>{user.email}</span></p>
                    </div>
                    {/* <button className='btn-changeInfo' onClick={() => handleToggleModal()}>Đổi mật khẩu</button> */}
                    <button className='btn-changeInfo' onClick={() => setOpenModal(!openModal)}>Đổi mật khẩu</button>
                    <div id="inputModal">
                        <ModalProfile user={user} setUser={setUser} openModal={openModal} setOpenModal={setOpenModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}
