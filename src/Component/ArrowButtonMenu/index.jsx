import React from 'react';
import './style.scss';
export default function ArrowButtonMenu() {
    // vô hiệu hoá scroll khi mở menu
    const openMobileMenu = () => {
        let menuBtn = document.querySelector('#ArrowButtonMenu');
        let menuMobile = document.querySelector('#navBarMobile');
        menuBtn.classList.toggle('toggle');
        menuMobile.classList.toggle('toggle');
        if (menuBtn.classList.contains('toggle')) {
            document.body.style.overflowY = 'hidden'
        } else document.body.style.overflowY = 'auto'
    }
    return (
        <div onClick={() => { openMobileMenu() }} id="ArrowButtonMenu">
            <div className="buttonMobile"></div>
            <div className="buttonMobile"></div>
            <div className="buttonMobile"></div>
        </div>
    )
}
