import React, { useState, useEffect } from 'react'
import { userServices } from '../../Services/user';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Swal from 'sweetalert2';
import { Modal } from '../../Component/Modal';
import ModalAdminUser from '../../Component/ModalAdminUser';
export default function AdminU() {
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    const [searchUser, setSearchUser] = useState();
    const [deleleUser, setDeleteUser] = useState(true);
    const [editUser, setEditUser] = useState();

    //lấy dữ liệu user
    useEffect(() => {
        userServices.getUserPagination(currentPage, itemPerPage, searchUser)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentPage, itemPerPage, searchUser, deleleUser])
    //thực hiện chức năng ẩn hiện cho modal
    const closeModal = () => {
        let domModal = document.querySelector('#adminM');
        let domBtn = document.querySelector('.btn-addUser');
        if (domModal && domBtn) {
            let domModalContent = domModal.querySelector('.modal');
            domModalContent.classList.toggle('toggleModal');
        }
    }
    window.addEventListener('mouseup', (e) => {
        let domModal = document.querySelector('#adminM');
        if (domModal) {
            let domModalContent = domModal.querySelector('.modal');
            if(!domModalContent.contains(e.target)){
                domModalContent.classList.remove('toggleModal');
            }
        }
    })
    //xoá user
    const deleteUser = (user) => {
        userServices.deleteUser(user).then(res => {
            console.log(res);
            setDeleteUser(!deleleUser);
            Swal.fire({
                icon: 'error',
                title: res.data,
                showConfirmButton: false,
                timer: 2000
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 2000
            })
        })
    }
    const handleEditUser = (value) => {
        // setEditUser(value);
        closeModal();
        // console.log(value);
    }
    //render nút chuyển trang
    const renderPaginationButton = () => {
        let arr = [];
        for (let i = 1; i <= user.totalPages; i++) {
            arr.push(<button key={i} onClick={() => setCurrentPage(i)}>{i}</button>)
        }
        return arr;
    }
    const renderListUser = () => {
        return user.items?.map((item, index) => {
            return <tr key={index}>
                <th>{item.taiKhoan}</th>
                <th>{item.hoTen}</th>
                <th>{item.email}</th>
                <th>{item.matKhau}</th>
                <th>{item.soDt}</th>
                <th>{item.maLoaiNguoiDung}</th>
                <th className="action">
                    <DeleteIcon onClick={() => deleteUser(item.taiKhoan)} className="btn_delete" />
                    <SettingsIcon onClick={() => handleEditUser(item)} className="btn_setting" />
                </th>
            </tr>
        })
    }
    return (
        <div id='adminM'>
            <h2>Quản lí người dùng</h2>
            <button onClick={() => closeModal()} className="btn-addUser">tạo tài khoản</button>
            <input type="text" />
            <table className="tableUser">
                <thead>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>email</th>
                        <th>Mật khẩu</th>
                        <th>Số điện thoại</th>
                        <th>Mã loại người dùng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListUser()}
                </tbody>
            </table>
            <div className="pagination">
                {renderPaginationButton()}
            </div>
            <ModalAdminUser closeModal={closeModal} editUser={editUser} />
        </div>
    )
}
