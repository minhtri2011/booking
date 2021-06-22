import React from 'react';
import { ModalPopup } from '../Modal';
import { groupID } from '../../Config/setting';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function ModalAdminAddUser(props) {
    const { handleAddUser, openModal, setOpenModal } = props;
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            hoTen: "",
            maNhom: groupID,
            maLoaiNguoiDung: "KhachHang",
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required("(*) Không được bỏ trống!"),
            matKhau: Yup.string().required("(*) Không được bỏ trống!"),
            email: Yup.string().required("(*) Không được bỏ trống!").email('(*) email không hợp lệ'),
            soDt: Yup.string().required("(*) Không được bỏ trống!").matches(phoneRegExp, "(*) Số điện thoại không hợp lệ").min(10, "(*) Số điện thoại không hợp lệ").max(10, "(*) Số điện thoại không hợp lệ"),
            hoTen: Yup.string().required("(*) Không được bỏ trống!"),
        }),
        onSubmit: (values, { resetForm }) => {
            handleAddUser(values, resetForm);
        },
    })

    return (
        <ModalPopup openModal={openModal} setOpenModal={setOpenModal}>
            <form id='addUserForm' onSubmit={formik.handleSubmit} className="addUser">
                <p>Thêm người dùng</p>
                <label htmlFor="taiKhoan">Tài Khoản</label>
                <input type="text" name='taiKhoan' className='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
                {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                    <p className='errorText'>{formik.errors.taiKhoan}</p>
                )}
                <label htmlFor="hoTen">Họ tên</label>
                <input type="text" name='hoTen' className='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                {formik.errors.hoTen && formik.touched.hoTen && (
                    <p className='errorText'>{formik.errors.hoTen}</p>
                )}
                <label htmlFor="email">email</label>
                <input type="email" name='email' className='email' onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email && formik.touched.email && (
                    <p className='errorText'>{formik.errors.email}</p>
                )}
                <label htmlFor="matKhau">Mật khẩu</label>
                <input type="text" name='matKhau' className='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
                {formik.errors.matKhau && formik.touched.matKhau && (
                    <p className='errorText'>{formik.errors.matKhau}</p>
                )}
                <label htmlFor="soDt">Số diện thoại</label>
                <input type="tel" name='soDt' className='soDt' onChange={formik.handleChange} value={formik.values.soDt} />
                {formik.errors.soDt && formik.touched.soDt && (
                    <p className='errorText'>{formik.errors.soDt}</p>
                )}
                <label htmlFor="maLoaiNguoiDung">Mã loại người dùng</label>
                <select name="maLoaiNguoiDung" className="maLoaiNguoiDung" onChange={formik.handleChange} value={formik.values.maLoaiNguoiDung}>
                    <option value="KhachHang">Khách hàng</option>
                    <option value="QuanTri">Quản trị</option>
                </select>
                <button type='submit' className='btn btn__sizeM btn__primary'>Xác nhận</button>
            </form>
        </ModalPopup>
    )
}
