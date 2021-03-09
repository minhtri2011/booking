import React, { useEffect, useState } from 'react';
import './style.scss';
import { movieServices } from '../../Services/movie';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function HomeShowTimeMobile() {
    let [movie, setMovie] = useState([]);
    let [cinemaInfo, setCinema] = useState([]);
    // let [cinemaChoice, setCinemaChoice] = useState([]);
    // let [movieChoice, setmovieChoice] = useState([]);
    // useEffect(() => console.log(collapse), [collapse])
    //lấy data movie
    useEffect(() => {
        movieServices.getMovieSchedule().then(res => {
            setMovie(res.data);
            // for (let i = 0; i < 1; i++) {
            //     setmovieChoice(res.data[0].lstCumRap[0].maCumRap);
            // }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    //lấy thông tin rạp
    useEffect(() => {
        movieServices.getCinemaInfo().then(res => {
            setCinema(res.data);
            // for (let i = 0; i < 1; i++) {
            //     setCinemaChoice(res.data[0].maHeThongRap)
            // }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    // let handleChange = (value) => {
    //     setCinemaChoice(value.maHeThongRap);
    //     for (let i = 0; i < movie.length; i++) {
    //         if (movie[i].maHeThongRap === value.maHeThongRap) {
    //             setmovieChoice(movie[i].lstCumRap[0].maCumRap);
    //         }
    //     }
    // }
    //trả dữ liệu danh sách phim lên state dồng thời xoá class hidecontent
    // let handleChangeListMovie = (value) => {
    //     setmovieChoice(value);
    //     const a = document.querySelector(".hideContent")
    //     if (a !== null) {
    //         a.classList.remove("hideContent")
    //         a.classList.remove("showList")
    //     }
    // }


    // thiết lập ngày render giao diện
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
                return <div className="list" key={index} >
                    {/* <div className="listFilmInfo" onClick={() => { showHideContent(lich.maPhim) }}> */}
                    <div className="listFilmInfo">
                        <img className="movie_img" src={lich.hinhAnh} alt={lich.hinhAnh} />
                        <p className="movie_name">{lich.ten}</p>
                    </div>
                    <div id={lich.maPhim} className={`showListTimeInfo`}>
                        {lich.filterList?.map((listDateTime, index) => {
                            return <Link className="timeBooking" key={index} to={`/booking/${listDateTime.maLichChieu}`}>
                                <span className="timeBooking-start">{listDateTime.ngayChieuGioChieu.slice(11, 16)}</span>
                                <span className="timeBooking-end">~ {parseFloat(listDateTime.ngayChieuGioChieu.slice(11, 13)) + 2}:{listDateTime.ngayChieuGioChieu.slice(14, 16)}</span>
                            </Link>
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
    //tạo hiệu ứng show danh sách rạp
    // let showListBranchCinema = (cine) => {
    //     let domID = document.getElementById(cine);
    //     // domID.classList.toggle('showListBranchCinema');
    // }
    // let showListMovie = (id) => {
    //     let domID = document.getElementById(id);
    //     domID.classList.toggle('showListBranch');
    // }
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
