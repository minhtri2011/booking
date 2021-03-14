import React, { useEffect, useState } from 'react';
import './style.scss';
import { movieServices } from '../../Services/movie'
import { today } from '../../Config/setting';
// import { Fragment } from 'react';
export default function SearchBar() {
    const [movie, setMovie] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [date, setDate] = useState([]);
    const [showTimes, setShowTimes] = useState([]);
    const [search, setSearch] = useState({
        Phim: '',
        IdPhim: '',
        Rap: '',
        NgayXem: '',
        XuatChieu: '',
        ID: '',
    });

    useEffect(() => {
        movieServices.getMovieList().then(res => {
            setMovie(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        if(search.IdPhim!==''){
            movieServices.getMovieDetail(search.IdPhim).then(res => {
                setCinema(res.data)
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    },[search.IdPhim])

    // ẩn hiện select dropdown khi click
    const handleClickToActiveDropDown = (e, classChange) => {
        const domClass = document.querySelector(`.${classChange}`)
        if (domClass.contains(e.target)) {
            domClass.classList.toggle('open')
        }
    }
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.searchBar__dropDown').forEach((selectClass) => {
            if (!selectClass.contains(e.target)) {
                selectClass.classList.remove('open')
            }
        })
    })
    // render danh sách phim searchbar
    const renderMovieList = () => {
        return movie
            .filter(list => list.ngayKhoiChieu.slice(0, 10) >= today)
            .sort((a, b) => a.tenPhim > b.tenPhim ? 1 : -1)
            .map((list, index) => {
                return (
                    <li onClick={() => { handleClickSearchNameMovie(list.maPhim, list.tenPhim) }} key={index}>{list.tenPhim}</li>
                )
            })
    }
    const handleClickSearchNameMovie = (id, name) => {
        setSearch(
            {
                ...search,
                Phim: name,
                IdPhim: id
            }
        )
        setTimeout(() => {
            document.querySelector(".selectCinema").classList.add('open');
        }, 1);

    }
    //render danh sách cụm rạp
    const renderCinemaList = () => {
        // if (search.IdPhim !== '') {
        //     return movieServices.getMovieDetail(search.IdPhim).then(res => {
        //         setCinema(res.data)
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // } else { return <li>abc</li> }
    }
    return (
        <div className='searchBar searchBar-grid'>
            <div onClick={(e) => handleClickToActiveDropDown(e, 'selectFilm')} className="searchBar__dropDown selectFilm">
                <div className="searchBar__dropDown-name">
                    <span>{search.Phim === '' ? "Phim" : search.Phim}</span>
                </div>
                <div className="searchBar__dropDown-option">
                    <ul>
                        {renderMovieList()}
                    </ul>
                </div>
            </div >

            <div onClick={(e) => handleClickToActiveDropDown(e, 'selectCinema')} className="searchBar__dropDown selectCinema">
                <div className="searchBar__dropDown-name">
                    <span>{search.Rap === '' ? "Rạp" : search.Phim}</span>
                </div>
                <div className="searchBar__dropDown-option ">
                    <ul>
                        {renderCinemaList()}
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                    </ul>
                </div>
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
        </div >
    )
}
