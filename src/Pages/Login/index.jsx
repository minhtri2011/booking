import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { token, userLogin } from '../../Config/setting';
import { userServices } from '../../Services/user';
import { Link } from 'react-router-dom';
import { LoginAction } from '../../redux/action/user';
import Swal from 'sweetalert2';
export default function Login(props) {
    const Swal = require('sweetalert2');
    const dispatch = useDispatch();
    let [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: ''
        },
        errors: {
            taiKhoan: '',
            matKhau: ''
        }
    });
    const handleChangeInput = (event) => {
        let { value, name } = event.target;
        let newValue = {
            ...state.values,
            [name]: value
        }
        let newErr = {
            ...state.errors,
            [name]: value === '' ? 'Không được bỏ trống' : ''
        }
        setState({ values: newValue, errors: newErr })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        userServices.signIn(state.values).then(res => {
            localStorage.setItem(userLogin, JSON.stringify(res.data));
            localStorage.setItem(token, res.data.accessToken);
            dispatch(LoginAction(res.data.taiKhoan));
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
                showConfirmButton: false,
                timer: 2000
            })
            setTimeout(() => {
                props.history.replace('/');
            }, 2000);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 2000
            })
        })
    }

    return (
        <div className="bodyLogin">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Đăng nhập</h1>
                <div className="input_box">
                    <input onChange={handleChangeInput} placeholder="Nhập tài khoản" type="text" name="taiKhoan" id="taikhoan" />
                    <label htmlFor='taikhoan'>Tên đăng nhập</label>
                </div>
                <div className="input_box">
                    <input onChange={handleChangeInput} placeholder="Nhập mật khẩu" type="password" name="matKhau" id="matkhau" />
                    <label htmlFor="matkhau">Mật khẩu</label>
                </div>
                <button >Đăng nhập</button>
                <p><Link className="text_link" to="/registry">Đăng kí</Link> nếu chưa có tài khoản</p>
            </form>
        </div>
    )
}
