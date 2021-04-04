import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import ArrowButtonMenu from '../../Component/ArrowButtonMenu';
import './style.scss';
import NavBarMobile from '../../Component/NavBarMobile';

export default function NavBar() {
    // tạo hiệu ứng sticky nav bar 
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('#navBar');
        nav.classList.toggle('sticky', window.scrollY > 60);
    })
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('#navBar');
        nav.classList.toggle('active', window.scrollY > 250);
    })

    window.addEventListener('click', (e) => {
        let menu = document.querySelector('#navBarMenu');
        const btnMenu = document.querySelector('#btnOpenMenu');
        if (menu) {
            if (menu.classList.contains('active') && !btnMenu.contains(e.target)) {
                menu.classList.remove('active');
            }
        }

    })

    // smooth scroll đến id đã chỉ định
    const smoothScrollTo = (target) => {
        if (window.location.pathname === '/') {
            let getID = document.getElementById(target);
            const { top } = getID.getBoundingClientRect();
            window.scrollTo({
                top: top + window.pageYOffset,
                behavior: "smooth"
            })
        } else {
            document.location.href = `/#${target}`;
        }
    }
    // check tài khoản trên redux, nếu có thì render tên TK, ngược lại sẽ render link chuyển hướng đến login page
    const taiKhoan = useSelector(state => state.userReducer.taiKhoan);
    // tạo đóng mở menu
    const toggleOpenMenu = () => {
        let menu = document.querySelector('#navBarMenu');
        menu.classList.toggle('active')
    }
    // khi click chuột ngoài menu sẽ đóng menu
    window.onclick = (e) => {
        let menuBtn = document.querySelector('#btnOpenMenu');
        if (menuBtn) {
            let menu = document.querySelector('#menu');
            if (!menuBtn.contains(e.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }
    }
    // render tên user
    const renderUserName = () => {
        return taiKhoan ? <div id='btnOpenMenu' onClick={() => { toggleOpenMenu() }} className='userName'>
            <AccountCircleIcon /> <p >{taiKhoan}</p>
        </div> : <Link className='userName' to='/login'>
            <AccountCircleIcon /><p>Đăng Nhập</p>
        </Link>
    }
    // logOut tài khoản => xoá hết localStorage
    const logOutUser = () => {
        window.location.replace('/');
        localStorage.clear();
    }
    return (
        <section id='navBar'>
            <div className="navBar_left">
                <Link to='/'><p>CineX</p></Link>
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
                <div id='navBarMenu' className="menu">
                    <div className="menu_btn">
                        <Link to='/profile'>
                            <button>Trang cá nhân</button>
                        </Link>
                    </div>
                    <div className="menu_btn">
                        <button onClick={() => logOutUser()} >Đăng xuất</button>
                    </div>
                </div>
            </div>
            <NavBarMobile />
            <ArrowButtonMenu />
        </section>
    )
}
