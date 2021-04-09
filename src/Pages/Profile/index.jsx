import React, { useEffect, useState } from 'react';
import { userLogin } from '../../Config/setting';
import { userServices } from '../../Services/user';
import { Link } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './style.scss';
import { Pagination } from '../../Component/Pagination';
import { Modal } from '../../Component/Modal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Profile() {
    let [user, setUser] = useState([]);
    const getUserFromLocal = JSON.parse(localStorage.getItem(userLogin)).taiKhoan;
    let nameUser = { taiKhoan: getUserFromLocal }
    useEffect(() => {
        userServices.getUserInfo(nameUser).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleToggleModal = () => {
        let domModal = document.querySelector('.modal')
        domModal.classList.toggle('toggleModal')
    }
    window.addEventListener('click', (e) => {
        let domModal = document.querySelector('.inputModal');
        let domBtn = document.querySelector('.btn-changeInfo');
        if (domModal && domBtn) {
            let domModalContent = domModal.querySelector('.modal');
            if (domModalContent.classList.contains('toggleModal') && !domModalContent.contains(e.target) && !domBtn.contains(e.target)) {
                domModalContent.classList.toggle('toggleModal');
            }
        }
    })
    const showPass = () => {
        let domInput = document.querySelector('.inputText');
        if (domInput.type === 'password') {
            return domInput.type = 'text';
        } return domInput.type = 'password'
    }
    return (
        <div id='profile'>
            <div className="personalInformation">
                <Link className='btn_comback' to='/'><p>CineX</p></Link>
                <div className="avtImg">
                    <img src="./img/profile/avt.jfif" alt="" />
                </div>
                <div className="nameUser">
                    <p>{user.hoTen}</p>
                </div>
                <div className="inforUser">
                    <p>Số điện thoại: <span>{user.soDT}</span></p>
                    <p>Email: <span>{user.email}</span></p>
                </div>
                <button className='btn-changeInfo' onClick={() => handleToggleModal()}>Đổi thông tin</button>
                <div className="inputModal">
                    <Modal>
                        <p className='updateInfo'>Cập nhật thông tin cá nhân</p>
                        <form>
                            <label htmlFor="account">Tài khoản:</label>
                            <input name='account' type="text" disabled defaultValue={user.taiKhoan} />
                            <label htmlFor="account">Họ tên:</label>
                            <input name='account' type="text" defaultValue={user.hoTen} />
                            <label htmlFor="account">Mật khẩu:</label>
                            <div className="showPass">
                                <input className='inputText' name='account' type="password" autoComplete="off" defaultValue={user.matKhau} />
                                <input className='showPassBtn' onClick={() => showPass()} type="checkbox" />
                                <div className='checkmark'>
                                    <div className="checked"><VisibilityIcon /></div>
                                    <div className="unchecked"><VisibilityOffIcon /></div>
                                </div>
                            </div>
                            <label htmlFor="account">Nhập lại mật khẩu:</label>
                            <input name='account' type="password" autoComplete="off" defaultValue={user.matKhau} />
                            <label htmlFor="account">Email:</label>
                            <input name='account' type="text" defaultValue={user.email} />
                            <label htmlFor="account">Số điện thoại:</label>
                            <input name='account' type="text" defaultValue={user.soDT} />
                            <button>cập nhật</button>
                        </form>
                    </Modal>
                </div>
            </div>
            <div className="ticketBookingHistory">
                <p className='title'>Lịch sử đặt vé</p>
                <Pagination itemPerPage={10}>
                    {user.thongTinDatVe
                        ?.sort((a, b) => a.ngayDat < b.ngayDat ? 1 : -1)
                        ?.map((item, index) => {
                            return <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className='title_accordion' key={index}>
                                        <p>Tên phim: <span>{item.tenPhim}</span></p>
                                        <p>Giá vé: <span>{item.giaVe}</span></p>
                                        <p>Ngày đặt vé:
                                        <span> {new Date(item.ngayDat).toLocaleDateString('en-GB')}</span>
                                            <span> {new Date(item.ngayDat).toLocaleTimeString('en-US', { hour12: true })}</span></p>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: '30px' }}>
                                    {item.danhSachGhe.map((historyBooking, index) => {
                                        return <div className='content_accordion' key={index}>
                                            <p>{historyBooking.tenHeThongRap}</p>
                                            <p>{historyBooking.tenRap}</p>
                                            <p>Ghế {historyBooking.tenGhe}</p>
                                        </div>
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        })}
                </Pagination>
            </div>

        </div>
    )
}
