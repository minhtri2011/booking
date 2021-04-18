import React from 'react'
import { Modal } from '../Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './style.scss';
import { groupID } from '../../Config/setting';
import { userServices } from '../../Services/user';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss';
export default function ModalProfile(props) {
    const { user, setUser } = props;
    const ChangePassSchema = Yup.object().shape({
        oldPassWord: Yup.string().required('(*) Không được bỏ trống').matches(user.matKhau, '(*) sai mật khẩu'),
        newPassWord: Yup.string().notOneOf([Yup.ref('oldPassWord'), null], '(*) Mật khẩu không được trùng').required('(*) Không được bỏ trống'),
        reNewPassWord: Yup.string().oneOf([Yup.ref('newPassWord'), null], '(*) Mật khẩu không trùng khớp').required('(*) Không được bỏ trống')
    })
    const closeModal = () => {
        let domModal = document.querySelector('#inputModal');
        let domBtn = document.querySelector('.btn-changeInfo');
        if (domModal && domBtn) {
            let domModalContent = domModal.querySelector('.modal');
            domModalContent.classList.toggle('toggleModal');
        }
    }
    const handleSubmitForm = (value) => {
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
            closeModal();
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Modal>
            <div>
                <h1>Đổi mật khẩu</h1>
                <Formik
                    initialValues={{
                        oldPassWord: '',
                        newPassWord: '',
                        reNewPassWord: ''
                    }}
                    validationSchema={ChangePassSchema}
                    // validateOnChange={false}
                    // validateOnBlur={false}
                    onSubmit={(value) => handleSubmitForm(value)}
                >
                    {({ errors, touched }) => (
                        <Form>
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
            </div>
        </Modal>
    )
}
