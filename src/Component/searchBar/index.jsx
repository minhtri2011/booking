/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import './style.scss';
import { movieServices } from '../../Services/movie'
import { today } from '../../Config/setting';
import { Link } from 'react-router-dom';
// import { Fragment } from 'react';
export default function SearchBar() {
    const [movie, setMovie] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [searchID, setSearchID] = useState()
    const [getID, setID] = useState()
    const [search, setSearch] = useState({
        Phim: '',
        Rap: '',
        NgayXem: '',
        XuatChieu: '',
    });

    useEffect(() => {
        movieServices.getMovieList().then(res => {
            setMovie(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    //firstRender dùng để không tự khởi chạy hàm useEfect lấy danh sách rạp, ngăn hiện lỗi lúc chưa set searchID
    const firstRender = useRef(false);
    useEffect(() => {

        if (firstRender.current && searchID !== '') {
            movieServices.getMovieDetail(searchID).then(res => {
                // tạo hiệu ứng tìm kiếm và hiện list option khi hoàn tất push data lên state cinema
                setTimeout(() => {
                    document.querySelector(".selectCinema").classList.add('open');
                }, 1);
                setSearch({
                    ...search,
                    Rap: 'Rạp',
                })

                setCinema(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [searchID])

    // ẩn hiện select dropdown khi click
    function handleClickToActiveDropDown(e, classChange) {
        const domClass = document.querySelector(`.${classChange}`);
        if (domClass.contains(e.target)) {
            domClass.classList.toggle('open');
        }
    }
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.searchBar__dropDown').forEach((selectClass) => {
            if (!selectClass.contains(e.target)) {
                selectClass.classList.remove('open')
            }
        })
    })


    // click hiện danh sách phim đồng thời kiểm tra nếu đã search phim rồi thì add class hiển thị danh sách rạp, không cần render lại
    const handleClickSearchNameMovie = (id, name) => {
        if (id === searchID) {
            setTimeout(() => {
                document.querySelector(".selectCinema").classList.add('open');
            }, 1);
            setSearch({
                ...search,
                Rap: 'Rạp',
            });
        } else {
            firstRender.current = true;
            setSearchID(id);
            setDate();
            setTime();
            setID();
            setSearch(
                {
                    ...search,
                    Phim: name,
                    Rap: 'Đang tìm rạp',
                }
            );
        }
    }
    // tìm rạp phim
    const handleClickSearchCinema = (item) => {
        let arrItem = []
        item.lichChieuPhim.forEach(i => {
            arrItem.push(i);
        })
        setDate(arrItem)
        setSearch({
            ...search,
            Rap: item.tenCumRap,
        })
        setTimeout(() => {
            document.querySelector(".selectShowTimes").classList.add('open');
        }, 1);
    }
    // tìm ngày chiếu phim
    const handleClickSearchShowTimes = (day, dateOfWeek) => {
        setSearch({
            ...search,
            NgayXem: day,
        });
        setTime(dateOfWeek);
        setTimeout(() => {
            document.querySelector(".selectTime").classList.add('open');
        }, 1);
    }
    const handleClickSearchTime = (gio, item) => {
        setSearch({
            ...search,
            XuatChieu: gio
        });
        setID(item);
    }


    //render danh sách cụm rạp
    const renderCinemaList = () => {
        if (!cinema || cinema.length === 0) {
            return <li>Vui lòng chọn phim</li>
        }
        else {
            return [cinema].map((item, index) => {
                return <div key={index}>
                    {item.heThongRapChieu?.map((list, index) => {
                        return <div key={index}>
                            {list.cumRapChieu?.map((cine, index) => {
                                return <li onClick={() => { handleClickSearchCinema(cine) }} key={index}>{cine.tenCumRap}</li>
                            })}
                        </div>
                    })}
                </div>
            })
        }
    }
    // render danh sách phim searchbar
    const renderMovieList = () => {
        return movie
            // .filter(list => list.ngayKhoiChieu.slice(0, 10) <= today)
            .filter(list => new Date(list.ngayKhoiChieu) <= new Date())
            .sort((a, b) => a.tenPhim > b.tenPhim ? 1 : -1)
            .map((list, index) => {
                return (
                    <li onClick={() => { handleClickSearchNameMovie(list.maPhim, list.tenPhim) }} key={index}>{list.tenPhim}</li>
                )
            })
    }

    // lấy ngày chiếu 
    const getDays = (list = []) => {
        let allDays = list.map((item) => {
            let day_name = '';
            let current_day = new Date(item.ngayChieuGioChieu).getDay();
            if ((new Date(item.ngayChieuGioChieu).toLocaleDateString()) === new Date(today).toLocaleDateString()) {
                return day_name = `Hôm nay - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
            } else {
                switch (current_day) {
                    case 0:
                        day_name = `Chủ nhật - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    case 1:
                        day_name = `Thứ hai - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    case 2:
                        day_name = `Thứ ba - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    case 3:
                        day_name = `Thứ tư - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    case 4:
                        day_name = `Thứ năm - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    case 5:
                        day_name = `Thứ sáu - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    case 6:
                        day_name = `Thứ bảy - ${new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB')}`;
                        break;
                    default: ;
                }
            }
            return day_name;
        })
        return [...new Set(allDays)]
    }

    const renderMovieShowTimes = () => {
        if (!date || date.length === 0) {
            return <li>Vui lòng chọn phim và rạp</li>
        } else {
            let getDay = getDays(date);
            return getDay.map((item, index) => {
                let weekdays = item.slice(0, item.indexOf(' -'));
                let dayOfWeeks = item.slice(item.indexOf('- ') + 2, item.length);
                return <li onClick={() => { handleClickSearchShowTimes(weekdays, dayOfWeeks) }} key={index}>
                    <p>{weekdays}</p>
                    <span>{dayOfWeeks}</span>
                </li>
                // return <li  key={index}>{item}</li>
            })
        }
    }
    const renderTimes = () => {
        if (!time || time.length === 0) {
            return <li>Vui lòng chọn phim, rạp và ngày xem</li>
        } else {
            return date.map((item, index) => {
                let days = new Date(item.ngayChieuGioChieu).toLocaleString('en-GB');
                if (time === days.slice(0, days.indexOf(','))) {
                    let getTime = new Date(item.ngayChieuGioChieu).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return <li onClick={() => handleClickSearchTime(getTime, item)} key={index}>
                        {getTime}
                    </li>
                }
            })
        }
    }
    const renderBtnBuyTicket = () => {
        if (!getID || getID.length === 0) {
            return <button className="btn-buyTicket btn-disable">
                Mua vé ngay
            </button>
        } else {
            // console.log(getID);
            return <Link className="btn-buyTicket" to={`/booking/${getID.maLichChieu}`}>
                Mua vé ngay
            </Link>
        }
    }
    return (
        <div className='searchBar'>
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
                    <span>{search.Rap === '' ? "Rạp" : search.Rap}</span>
                </div>
                <div className="searchBar__dropDown-option ">
                    <ul>
                        {renderCinemaList()}
                    </ul>
                </div>
            </div>
            <div onClick={(e) => handleClickToActiveDropDown(e, 'selectShowTimes')} className="searchBar__dropDown selectShowTimes">
                <div className="searchBar__dropDown-name">
                    <span>{search.NgayXem === '' ? 'Ngày xem' : search.NgayXem}</span>
                </div>
                <div className="searchBar__dropDown-option ">
                    <ul>
                        {renderMovieShowTimes()}
                    </ul>
                </div>

            </div>
            <div onClick={(e) => handleClickToActiveDropDown(e, 'selectTime')} className="searchBar__dropDown selectTime" >
                <div className="searchBar__dropDown-name">
                    <span>{search.XuatChieu === '' ? 'Xuất chiếu' : search.XuatChieu}</span>
                </div>
                <div className="searchBar__dropDown-option ">
                    <ul>
                        {renderTimes()}
                    </ul>
                </div>
            </div>
            <div className="searchBar__dropDown ">
                {renderBtnBuyTicket()}
            </div>
        </div >
    )
}
