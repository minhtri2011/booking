import React, { useState, useEffect } from 'react'
import { userServices } from '../../Services/user';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Swal from 'sweetalert2';
import ModalAdminAddUser from '../../Component/ModalAdminAddUser';
import { userLogin } from '../../Config/setting';
import AddIcon from '@material-ui/icons/Add';
import ModalAdminEditUser from '../../Component/ModalAdminEditUser';
export default function AdminU() {
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchUser, setSearchUser] = useState();
    const [editUser, setEditUser] = useState([]);
    const [reloadState, setReload] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    //lấy dữ liệu user
    useEffect(() => {
        userServices.getUserPagination(currentPage, 20, searchUser)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [currentPage, searchUser, reloadState])
    //xoá user
    const deleteUser = (user) => {
        Swal.fire({
            title: 'Bạn muốn xóa tài khoản này ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: `Trở về`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: `Xóa`,
            cancelButtonColor: 'red',
        }).then((result) => {
            if (result.isConfirmed) {
                userServices.deleteUser(user).then(res => {
                    setReload(!reloadState);
                    Swal.fire({
                        icon: 'success',
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
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })


    }
    //thêm user
    const handleAddUser = (user, resetForm) => {
        userServices.addUser(user).then(res => {
            setReload(!reloadState);
            Swal.fire({
                icon: 'success',
                title: 'Đã thêm tài khoản',
                showConfirmButton: false,
                timer: 2000
            });
            resetForm();
            setOpenModal(false);
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
        setEditUser(value);
        setOpenModalEdit(true);
    }
    // tạo độ trễ cho search bar để giảm tải cho server khi tao tác search liên tục
    let timer;
    const searcghUser = () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            let values = document.getElementById('searchUser').value;
            setSearchUser(values)
        }, 500);
    }
    //render nút chuyển trang
    const renderPaginationButton = () => {
        let arr = [];
        for (let i = 1; i <= user.totalPages; i++) {
            arr.push(<button key={i} onClick={() => setCurrentPage(i)}>{i}</button>)
        }
        return arr;
    }
    //render danh sách user
    const renderListUser = () => {
        return user.items?.map((item, index) => {
            return <tr key={index}>
                <td content="Tài khoản">{item.taiKhoan}</td>
                <td content="Họ tên">{item.hoTen}</td>
                <td content="Email">{item.email}</td>
                <td content="Mật khẩu">{item.matKhau}</td>
                <td content="SỐ điện thoại">{item.soDt}</td>
                <td content="Loại người dùng">{item.maLoaiNguoiDung}</td>
                <td content="Thao tác" className="action">
                    <DeleteIcon onClick={() => deleteUser(item.taiKhoan)} className="btn_delete" />
                    <SettingsIcon onClick={() => handleEditUser(item)} className="btn_setting" />
                </td>
            </tr>
        })
    }


    return (
        <div id='adminM'>
            <div className="header">
                <div className="header__searchBox">
                    <input id="searchUser" type="text" placeholder='Tìm kiếm' onKeyUp={() => { searcghUser() }} />
                    <AddIcon onClick={() => { setOpenModal(true) }} className="btn-addUser" />
                </div>
                <div className="header__userName">
                    <img src="/img/admin/adAvt.png" alt="avt" />
                    <span>{JSON.parse(localStorage.getItem(userLogin)).hoTen}</span>
                </div>
            </div>
            <div className="userAdminContent">
                <h2 className='title'>Quản lí người dùng</h2>
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
            </div>
            <ModalAdminAddUser
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleAddUser={handleAddUser} />
            <ModalAdminEditUser
                openModal={openModalEdit}
                setOpenModal={setOpenModalEdit}
                editUser={editUser}
                handleEditUser={handleEditUser}
                setReload={setReload}
                reloadState={reloadState} />
        </div>
    )
}
