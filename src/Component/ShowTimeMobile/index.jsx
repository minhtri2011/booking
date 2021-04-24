import React, { useEffect, useState } from 'react';
import { movieServices } from '../../Services/movie';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { today } from '../../Config/setting';

export default function ShowTimeMobile() {
    let [movie, setMovie] = useState([]);
    let [cinemaInfo, setCinema] = useState([]);
    //lấy data movie
    useEffect(() => {
        movieServices.getMovieSchedule().then(res => {
            setMovie(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    //lấy thông tin rạp
    useEffect(() => {
        movieServices.getCinemaInfo().then(res => {
            setCinema(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    // let todayHour = getToDayTime.getHours();

    //lọc danh sách cùng ngày nhưng hơn giờ hiện tại
    let getToDayListTime = (value) => {
        return value.filter(item => new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB') === new Date(today).toLocaleDateString('en-GB') && new Date(item.ngayChieuGioChieu).getHours() > new Date().getHours())
        // return value.filter(item => item.ngayChieuGioChieu.slice(0, 10) === today)
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
    let renderListMovie = (todayList) => {
        if (todayList && todayList.length > 0) {
            return todayList?.map((lich, index) => {
                return <div className="list" key={index} >
                    <div className="listFilmInfo">
                        <img className="movie_img" src={lich.hinhAnh} alt={lich.hinhAnh} />
                        <p className="movie_name">{lich.ten}</p>
                    </div>
                    <div id={lich.maPhim} className={`showListTimeInfo`}>
                        {lich.filterList?.map((listDateTime, index) => {
                            if (new Date(listDateTime.ngayChieuGioChieu).getHours() > new Date().getHours()) {
                                return <Link className="timeBooking" key={index} to={`/booking/${listDateTime.maLichChieu}`}>
                                    <span className="timeBooking-start">{listDateTime.ngayChieuGioChieu.slice(11, 16)}</span>
                                    <span className="timeBooking-end">~ {parseFloat(listDateTime.ngayChieuGioChieu.slice(11, 13)) + 2}:{listDateTime.ngayChieuGioChieu.slice(14, 16)}</span>
                                </Link>
                            } else {
                                return <div className="disableTimeBooking" key={index}>
                                    <span className="disableTimeBooking-start">{listDateTime.ngayChieuGioChieu.slice(11, 16)}</span>
                                    <span className="disableTimeBooking-end">~ {parseFloat(listDateTime.ngayChieuGioChieu.slice(11, 13)) + 2}:{listDateTime.ngayChieuGioChieu.slice(14, 16)}</span>
                                </div>
                            }
                        })}
                    </div>
                </div>
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
        <div className="showTimeMobile">
            <div className="cinema-list">
                {cinemaInfo.map((cinema, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='cinemaName' key={index}>
                                <img src={cinema.logo} alt={cinema.logo} />
                                <p>{cinema.tenHeThongRap}</p>
                            </AccordionSummary>
                            {/* render tên cụm rạp theo rạp */}
                            {
                                movie
                                    .filter(cinemax => cinemax.maHeThongRap === cinema.maHeThongRap)
                                    .map((cinema, index) => {
                                        return (
                                            <AccordionDetails id={cinema.maHeThongRap} className="list-branch-cinema" key={index}>
                                                {cinema.lstCumRap
                                                    .map((branch, index) => {
                                                        return (<Accordion key={index}>
                                                            <AccordionSummary className='listBranch' >
                                                                <img className="img_cinema" src="/img/bhd-star-bitexco-15379520642437.jpg" alt="bhd-star-bitexco-15379520642437.jpg" />
                                                                <div className="content_item_listBranch">
                                                                    <div className="content">
                                                                        <div className="nameBranch">
                                                                            <span>{renderTenCumRap(branch.tenCumRap)}</span>
                                                                        </div>
                                                                        <p className="address">{branch.diaChi}</p>
                                                                    </div>
                                                                </div>
                                                                {/* render tên phim theo cụm rạp */}
                                                            </AccordionSummary>
                                                            <AccordionDetails id={branch.maCumRap} className="listMovie">
                                                                {renderMovie(branch)}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        )
                                                    })}
                                            </AccordionDetails>
                                        )
                                    })
                            }
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}
