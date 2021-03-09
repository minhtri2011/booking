import React, { useEffect, useState } from 'react';
import './style.scss';
import { movieServices } from '../../Services/movie';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { object } from 'yup';
export default function HomeShowTime() {
    let [movie, setMovie] = useState([]);
    let [cinemaInfo, setCinema] = useState([]);
    let [cinemaChoice, setCinemaChoice] = useState([]);
    let [movieChoice, setmovieChoice] = useState([]);
    // useEffect(() => console.log(collapse), [collapse])
    //lấy data movie
    useEffect(() => {
        movieServices.getMovieSchedule().then(res => {
            setMovie(res.data);
            for (let i = 0; i < 1; i++) {
                setmovieChoice(res.data[0].lstCumRap[0].maCumRap);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    //lấy thông tin rạp
    useEffect(() => {
        movieServices.getCinemaInfo().then(res => {
            setCinema(res.data);
            for (let i = 0; i < 1; i++) {
                setCinemaChoice(res.data[0].maHeThongRap)
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    let handleChange = (value) => {
        setCinemaChoice(value.maHeThongRap);
        for (let i = 0; i < movie.length; i++) {
            if (movie[i].maHeThongRap === value.maHeThongRap) {
                setmovieChoice(movie[i].lstCumRap[0].maCumRap);
            }
        }
    }
    //trả dữ liệu danh sách phim lên state dồng thời xoá class hidecontent
    let handleChangeListMovie = (value) => {
        setmovieChoice(value);
        const a = document.querySelector(".hideContent")
        if (a !== null) {
            a.classList.remove("hideContent")
            a.classList.remove("showList")
        }
    }


    //thiết lập ngày render giao diện

    // let getToDayTime = new Date();
    // let today = (`${getToDayTime.getFullYear()}-${getToDayTime.getMonth() + 1}-${getToDayTime.getDate()}`);

    //lấy ngày 2019-01-01 làm mẫu vì api không cập nhật từng ngày
    let today = "2019-01-01";
    let todayHour = '01';
    // let todayHour = getToDayTime.getHours();

    //lọc danh sách cùng ngày nhưng hơn giờ hiện tại
    let getToDayListTime = (value) => {
        return value.filter(item => item.ngayChieuGioChieu.slice(0, 10) === today && item.ngayChieuGioChieu.slice(11, 13) > todayHour)
    }
    //thực hiện lọc film và push vào một mảng mới để dễ xử lí
    let filterListTime = (value) => {
        let todayList = [];
        let filterList = getToDayListTime(value.lstLichChieuTheoPhim);
        if (filterList.length > 0) {
            todayList.push(
                { maPhim: value.maPhim, hinhAnh: value.hinhAnh, ten: value.tenPhim, filterList: filterList },
            );
            // todayList=[...filterList,value]
        }
        return todayList;
    }
    //tìm xem ngày hôm nay nếu có film thì push vào mảng
    let findMovieToDay = (value) => {
        let cinema = [];
        value.danhSachPhim.forEach((film) => {
            let todayList = getToDayListTime(film.lstLichChieuTheoPhim);

            if (todayList.length > 0) {
                cinema = [...cinema, value]
            }
        })
        return cinema;
    }
    //function ẩn hiện nội dung thời gian chiếu film)
    // let showHideContent = (value) => {
    //     let domClass = document.getElementById(value);
    //     domClass.classList.toggle("hideContent");
    //     domClass.classList.add("showList");
    // }
    //render list movie
    let renderListMovie = (todayList) => {
        if (todayList && todayList.length > 0) {
            return todayList?.map((lich, index) => {
                return <Accordion defaultExpanded className="list" key={index} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className="listFilmInfo">
                        <img className="movie_img" src={lich.hinhAnh} alt={lich.hinhAnh} />
                        <p className="movie_name">{lich.ten}</p>
                    </AccordionSummary>
                    <AccordionDetails className={`showListTimeInfo`}>
                        {lich.filterList?.map((listDateTime, index) => {
                            return <Link className="timeBooking" key={index} to={`/booking/${listDateTime.maLichChieu}`}>
                                <span className="timeBooking-start">{listDateTime.ngayChieuGioChieu.slice(11, 16)}</span> ~ {parseFloat(listDateTime.ngayChieuGioChieu.slice(11, 13)) + 2}:{listDateTime.ngayChieuGioChieu.slice(14, 16)}
                            </Link>
                        })}
                    </AccordionDetails>
                </Accordion>
            })
        }
    }
    //render film
    let renderMovie = (value) => {
        let checkMovie = findMovieToDay(value);
        if (checkMovie.length > 0) {
            return (
                <>
                    {value.danhSachPhim?.map((item, index) => {
                        let todayList = filterListTime(item);
                        return <div key={index}>
                            {renderListMovie(todayList)}
                        </div>
                    })}
                </>
            )
        }
        return <Fragment>
            <p className='null_list'>Không có suất chiếu</p>
        </Fragment>

    }
    //định dạng tên cụm rạp
    let renderTenCumRap = (name) => {
        if (name.includes("Cineplex")) {
            return (
                <div>
                    <span className={name.split("Cineplex -")[0]}>{name.split("Cineplex -")[0]}</span> {" - "}
                    <span>{name.split("Cineplex -")[1]}</span>
                </div>
            )
        }
        return <div>
            <span className={name.split(" -")[0]}>{name.split(" -")[0]}</span> {" - "}
            <span>{name.split(" -")[1]}</span>
        </div>
    }

    return (
        <div className="showTime">
            <div className="item_left">
                {cinemaInfo.map((cinema, index) => {
                    return (
                        <button className={cinema.maHeThongRap === cinemaChoice ? "active" : ''} onClick={() => { handleChange(cinema) }} key={index}>
                            <img className="logo_cinema" src={cinema.logo} alt={cinema.logo} />
                        </button>
                    )
                })}
            </div>
            <div className="item_center">
                {
                    movie
                        .filter(cinema => cinema.maHeThongRap === cinemaChoice)
                        .map((cinema, index) => {
                            return (
                                <div key={index}>
                                    {cinema.lstCumRap
                                        .map((branch, index) => {
                                            return (
                                                <div className={branch.maCumRap === movieChoice ? "cinema_button active" : "cinema_button"} onClick={() => { handleChangeListMovie(branch.maCumRap); }} key={index}>
                                                    <img className="img_cinema" src="/img/bhd-star-bitexco-15379520642437.jpg" alt="bhd-star-bitexco-15379520642437.jpg" />
                                                    <div className="content_item_center">
                                                        <div className="content">
                                                            <div className="nameBranch">
                                                                <span>{renderTenCumRap(branch.tenCumRap)}</span>
                                                            </div>
                                                            <p className="address">{branch.diaChi}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            )
                        })
                }
            </div>
            <div id="item_right" className="item_right">
                {movie?.map((cinema, index) => {
                    return <div key={index}>
                        {cinema.lstCumRap
                            .filter(branch => branch.maCumRap === movieChoice)
                            .map((branch, index) => {
                                return (
                                    <div key={index}>
                                        {renderMovie(branch)}
                                    </div>
                                )
                            })}
                    </div>
                })}
            </div>
        </div>
    )
}
