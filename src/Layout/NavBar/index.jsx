import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './style.scss';

export default function NavBar() {
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('#navBar');
        nav.classList.toggle('sticky', window.scrollY > 60);
    })
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('#navBar');
        nav.classList.toggle('active', window.scrollY > 250);
    })
    const smoothScrollTo = (target) => {
        if (window.location.pathname === '/') {
            let a = document.getElementById(target);
            const { top } = a.getBoundingClientRect();
            window.scrollTo({
                top: top + window.pageYOffset,
                behavior: "smooth"
            })
        } else {
            document.location.href = `/#${target}`;
        }
    }
    // console.log(taiKhoan);
    const taiKhoan = useSelector(state => state.userReducer.taiKhoan);
    const renderUserName = () => {
        return taiKhoan ? <div className='userName'>
            <AccountCircleIcon /> <p>{taiKhoan}</p>
        </div> : <p>Đăng Nhập</p>
    }
    return (
        <section id='navBar'>
            <div className="navBar_left">
                <p>CineX</p>
            </div>
            <div className="navBar_center">
                <ul>
                    <li onClick={() => { smoothScrollTo('listMovie') }}>Lịch chiếu</li>
                    <li onClick={() => { smoothScrollTo('showTime') }}>Cụm rạp</li>
                    <li onClick={() => { smoothScrollTo('apps') }}>Tin tức</li>
                    <li onClick={() => { smoothScrollTo('apps') }}>Ứng dụng</li>
                </ul>
            </div>
            <div className="navBar_right">
                {renderUserName()}
            </div>
        </section>
    )
}
