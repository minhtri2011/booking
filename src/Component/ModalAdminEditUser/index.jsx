import React from 'react';
import { ModalPopup } from '../Modal';
import { groupID } from '../../Config/setting';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { userServices } from '../../Services/user';
import Swal from 'sweetalert2';

export default function ModalAdminEditUser(props) {
    const { editUser, openModal, setOpenModal, setReload, reloadState } = props;
    const editSchema = Yup.object().shape({
        taiKhoan: Yup.string().required("(*) Không được bỏ trống!"),
        matKhau: Yup.string().required("(*) Không được bỏ trống!"),
        email: Yup.string().required("(*) Không được bỏ trống!").email('(*) email không hợp lệ'),
        soDt: Yup.string().required("(*) Không được bỏ trống!").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "(*) Số điện thoại không hợp lệ").min(10, "(*) Số điện thoại không hợp lệ").max(10, "(*) Số điện thoại không hợp lệ"),
        hoTen: Yup.string().required("(*) Không được bỏ trống!"),
    })
    const handleEditUser = (user, resetForm) => {
        resetForm();
        userServices.editUser(user).then(res => {
            console.log(res);
            setOpenModal(false);
            setReload(!reloadState)
            Swal.fire({
                icon: 'success',
                title: 'Đổi thông tin thành công',
                showConfirmButton: false,
                timer: 2000
            })
        }).catch(err => {
            console.log(err.response.data);
            Swal.fire({
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 2000
            })
        })
    }
    return (
        <ModalPopup openModal={openModal} setOpenModal={setOpenModal}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    taiKhoan: editUser.taiKhoan || '',
                    matKhau: editUser.matKhau || '',
                    email: editUser.email || '',
                    soDt: editUser.soDt || '',
                    hoTen: editUser.hoTen || '',
                    maNhom: groupID,
                    maLoaiNguoiDung: editUser.maLoaiNguoiDung || '',
                }}
                validationSchema={editSchema}
                onSubmit={(values, { resetForm }) => {
                    handleEditUser(values, resetForm)
                }}
            >{({ errors, touched, }) => (
                <Form id='editUserForm' className="addUser">
                    <p>Sửa người dùng</p>
                    <label htmlFor="taiKhoan">Tài Khoản</label>
                    <Field disabled type="text" name='taiKhoan' className='taiKhoan' />
                    {errors.taiKhoan && touched.taiKhoan && (
                        <p className='errorText'>{errors.taiKhoan}</p>
                    )}
                    <label htmlFor="hoTen">Họ tên</label>
                    <Field type="text" name='hoTen' className='hoTen' />
                    {errors.hoTen && touched.hoTen && (
                        <p className='errorText'>{errors.hoTen}</p>
                    )}
                    <label htmlFor="email">email</label>
                    <Field type="email" name='email' className='email' />
                    {errors.email && touched.email && (
                        <p className='errorText'>{errors.email}</p>
                    )}
                    <label htmlFor="matKhau">Mật khẩu</label>
                    <Field type="text" name='matKhau' className='matKhau' />
                    {errors.matKhau && touched.matKhau && (
                        <p className='errorText'>{errors.matKhau}</p>
                    )}
                    <label htmlFor="soDt">Số diện thoại</label>
                    <Field type="tel" name='soDt' className='soDt' />
                    {errors.soDt && touched.soDt && (
                        <p className='errorText'>{errors.soDt}</p>
                    )}
                    <label htmlFor="maLoaiNguoiDung">Loại người dùng</label>
                    <Field as='select' name="maLoaiNguoiDung" className="maLoaiNguoiDung">
                        <option value="KhachHang">Khách hàng</option>
                        <option value="QuanTri">Quản trị</option>
                    </Field>
                    <button type='submit' className='btn btn__sizeM btn__primary'>Xác nhận</button>
                </Form>
            )}
            </Formik>
        </ModalPopup >
    )
}
