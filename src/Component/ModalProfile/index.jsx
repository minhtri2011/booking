import React from 'react'
import { ModalPopup } from '../Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { groupID } from '../../Config/setting';
import { userServices } from '../../Services/user';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss';
export default function ModalProfile(props) {
    const { user, setUser, openModal, setOpenModal } = props;
    const ChangePassSchema = Yup.object().shape({
        oldPassWord: Yup.string()
            .required('(*) Không được bỏ trống')
            .matches(user.matKhau, '(*) sai mật khẩu'),
        newPassWord: Yup.string()
            .required('(*) Không được bỏ trống')
            .notOneOf([user.matKhau], '(*) Không được nhập lại mật khẩu cũ'),
        reNewPassWord: Yup.string()
            .required('(*) Không được bỏ trống')
            .oneOf([Yup.ref('newPassWord'), null], '(*) Mật khẩu không trùng khớp'),
    })
    const handleSubmitForm = (value, resetForm) => {
        let arr = {
            taiKhoan: user.taiKhoan,
            matKhau: value.newPassWord,
            email: user.matKhau,
            soDt: user.soDT,
            maNhom: groupID,
            maLoaiNguoiDung: 'KhachHang',
            hoTen: user.hoTen
        }
        userServices.editUser(arr).then(res => {
            setUser({ ...user, matKhau: res.data.matKhau })
            // closeModal();
            setOpenModal(!openModal)
            resetForm();
            Swal.fire({
                icon: 'success',
                title: 'Đổi mật khẩu thành công',
                showConfirmButton: false,
                timer: 2000
            })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <ModalPopup openModal={openModal} setOpenModal={setOpenModal}>
                <Formik
                    initialValues={{
                        oldPassWord: '',
                        newPassWord: '',
                        reNewPassWord: ''
                    }}
                    validationSchema={ChangePassSchema}
                    onSubmit={(value, { resetForm }) => handleSubmitForm(value, resetForm)}
                >
                    {({ errors, touched }) => (
                        <Form id='formChangePass'>
                            <h1>Đổi mật khẩu</h1>
                            <label htmlFor="oldPassWord">Nhập mật khẩu</label>
                            <Field autoComplete='off' type='password' name="oldPassWord" />
                            {errors.oldPassWord && touched.oldPassWord ? (
                                <div className='errorInput'>{errors.oldPassWord}</div>
                            ) : null}
                            <label htmlFor="newPassWord">Nhập mật mới</label>
                            <Field autoComplete='off' type='password' name="newPassWord" />
                            {errors.newPassWord && touched.newPassWord ? (
                                <div className='errorInput'>{errors.newPassWord}</div>
                            ) : null}
                            <label htmlFor="reNewPassWord">Nhập lại mật khẩu</label>
                            <Field autoComplete='off' type='password' name="reNewPassWord" />
                            {errors.reNewPassWord && touched.reNewPassWord ? <div className='errorInput'>{errors.reNewPassWord}</div> : null}
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
        </ModalPopup>
    )
}
