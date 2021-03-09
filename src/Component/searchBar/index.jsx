import React from 'react';
import './style.scss';

export default function SearchBar() {
    return (
        <div className='searchBar searchBar-grid'>
            <div className="searchBar__dropDown selectFilm">
                <div className="searchBar__dropDown-name">Phim</div>
                <div className="dropDown-menu active">
                    <ul>
                        <li>b</li>
                        <li>c</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, modi.</li>
                        <li>d</li>
                    </ul>
                </div>
            </div>
            <div className="searchBar__dropDown selectCinema">
                <div className="searchBar__dropDown-name">Rạp</div>
            </div>
            <div className="searchBar__dropDown selectShowTimes">
                <div className="searchBar__dropDown-name">Ngày xem</div>
            </div>
            <div className="searchBar__dropDown selectShowTime">
                <div className="searchBar__dropDown-name">Xuất chiếu</div>
            </div>
            <div className="searchBar__dropDown ">
                <button className="btn-buyTicket">Mua vé ngay</button>
            </div>
        </div>
    )
}
