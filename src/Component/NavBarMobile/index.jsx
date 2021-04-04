import React from 'react'
// import ArrowButtonMenu from '../ArrowButtonMenu';
import './style.scss';
export default function NavBarMobile() {
    // const clickToCloseMenu = (e) => {
    //     let getDom = document.querySelector('.menuNavMobile')
    //     if (!getDom.contains(e.target)) {
    //         menuMobile.classList.remove('toggle');
    //     }
    // }
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
            document.location.href = `/#${target}`;
        }
    }
    return (
        <div id='navBarMobile' >
            <div className="menuNavMobile">
                <ul>
                    <li>Minh Trí</li>
                    <li onClick={() => { smoothScrollTo('listMovie') }}>Lịch chiếu</li>
                    <li onClick={() => { smoothScrollTo('showTime') }}>Cụm rạp</li>
                    <li onClick={() => { smoothScrollTo('apps') }}>Tin tức</li>
                    <li onClick={() => { smoothScrollTo('apps') }}>Ứng dụng</li>
                    <li>Dark mode</li>
                    <li>Đăng xuất</li>
                </ul>
            </div>
        </div>
    )
}
