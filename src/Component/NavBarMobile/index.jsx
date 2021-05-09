import React from 'react';
import { Link } from 'react-router-dom';
export default function NavBarMobile() {
    let getUserNameLocal = JSON.parse(localStorage.getItem('userLogin'));
    window.onclick = (e) => {
        let menuMobile = document.querySelector('#navBarMobile');
        let menuBtn = document.querySelector('#ArrowButtonMenu');
        let getDom = document.querySelector('.menuNavMobile')
        if (menuMobile) {
            if (menuMobile.classList.contains('toggle') && !menuBtn.contains(e.target) && !getDom.contains(e.target)) {
                menuMobile.classList.toggle('toggle');
                menuBtn.classList.toggle('toggle');
                document.body.style.overflowY = 'auto';
            }
        }
    }
    const smoothScrollTo = (target) => {
        document.body.style.overflowY = 'auto';
        let menuMobile = document.querySelector('#navBarMobile');
        let menuBtn = document.querySelector('#ArrowButtonMenu');
        let getID = document.getElementById(target);
        if (window.location.pathname === '/') {
            menuBtn.classList.toggle('toggle');
            menuMobile.classList.toggle('toggle');
            const { top } = getID.getBoundingClientRect();
            window.scrollTo({
                top: top + window.pageYOffset,
                behavior: "smooth",
            })
        } else {
            menuBtn.classList.toggle('toggle');
            menuMobile.classList.toggle('toggle');
            document.location.href = `/?src=${target}`;
        }
    }
    return (
        <div id='navBarMobile' >
            <div className="menuNavMobile">
                <ul>
                    <li>{getUserNameLocal ?
                        <Link onClick={() => { document.body.style.overflowY = 'auto'; }} to='/profile'>{getUserNameLocal.taiKhoan}</Link> :
                        <Link onClick={() => { document.body.style.overflowY = 'auto'; }} to='/login'>Đăng nhập</Link>
                    }</li>
                    <li onClick={() => { smoothScrollTo('listMovie') }}>Lịch chiếu</li>
                    <li>
                        <Link onClick={() => { document.body.style.overflowY = 'auto'; }} to='/showtimemobile'>Cụm rạp</Link>
                    </li>
                    <li onClick={() => { smoothScrollTo('apps') }}>Ứng dụng</li>
                    <li>Dark mode</li>
                    <li>Đăng xuất</li>
                </ul>
            </div>
        </div>
    )
}
