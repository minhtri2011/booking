import React, { useState, useEffect } from 'react'
import { today } from '../../Config/setting';
import Moment from 'react-moment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
export default function MovieDetailShowTimeMobile(props) {
    const { movie } = props;
    let [todayChoice, setTodayChoice] = useState(new Date(today));
    let [cinemaid, setCinemaID] = useState([]);
    useEffect(() => {
        for (let i = 0; i < movie.heThongRapChieu?.length; i++) {
            setCinemaID(movie.heThongRapChieu[0].maHeThongRap);
        }
    }, [movie])
    // render từng ngày thứ trong tuần
    const getDay = value => {
        let days = new Date(value).getDay();
        let day_name = '';
        switch (days) {
            case 0:
                day_name = `Chủ nhật`;
                break;
            case 1:
                day_name = `Thứ hai`;
                break;
            case 2:
                day_name = `Thứ ba`;
                break;
            case 3:
                day_name = `Thứ tư`;
                break;
            case 4:
                day_name = `Thứ năm`;
                break;
            case 5:
                day_name = `Thứ sáu`;
                break;
            case 6:
                day_name = `Thứ bảy`;
                break;
            default: ;
        }
        return day_name;
    }
    // kiểm tra rạp có bao nhiêu phim có ngày chiếu bằng với ngày hiện tại
    const checkFilmOfCinema = value => {
        let arr = [];
        value.cumRapChieu.forEach(branch => {
            branch.lichChieuPhim.forEach(item => {
                if (new Date(item.ngayChieuGioChieu).toLocaleDateString() >= new Date(todayChoice).toLocaleDateString() && new Date(item.ngayChieuGioChieu).toLocaleDateString() <= new Date(todayChoice + 7).toLocaleDateString()) {
                    arr = { ...branch, lichChieuHienTai: item };
                }
            })
        })
        return arr;
    }
    const renderFilmOfTheWeek = (value, index) => {
        let arr = checkFilmOfCinema(value);
        if (arr.length !== 0) {
            return (
                <Accordion className='list' key={index}>
                    <AccordionSummary className='list__Name' expandIcon={<ExpandMoreIcon />} >
                        <p>{arr.tenCumRap}</p>
                    </AccordionSummary>
                    <AccordionDetails className='list__Detail'>
                        <p>2D Digital</p>
                        <div className="listTime">
                            {arr.lichChieuPhim
                                ?.filter(item => new Date(item.ngayChieuGioChieu).toLocaleDateString('en-GB') === new Date(todayChoice).toLocaleDateString('en-GB'))
                                .map((showtime, index) => {
                                    if (new Date(showtime.ngayChieuGioChieu).getHours() > new Date().getHours()) {
                                        return <Link key={index} className="time" to={`/booking/${showtime.maLichChieu}`}>
                                            <span className="time-start">{showtime.ngayChieuGioChieu.slice(11, 16)}</span>
                                            <span className="time-end">~ {parseFloat(showtime.ngayChieuGioChieu.slice(11, 13)) + 2}:{showtime.ngayChieuGioChieu.slice(14, 16)}</span>
                                        </Link>
                                    }
                                    else {
                                        return <div className="disableTimeBooking" key={index}>
                                            <span className="disableTimeBooking-start">{showtime.ngayChieuGioChieu.slice(11, 16)}</span>
                                            <span className="disableTimeBooking-end">~ {parseFloat(showtime.ngayChieuGioChieu.slice(11, 13)) + 2}:{showtime.ngayChieuGioChieu.slice(14, 16)}</span>
                                        </div>
                                    }
                                })}
                        </div>
                    </AccordionDetails>
                </Accordion >
            )
        }
        else {
            return <p key={index} className="alertFilm">Chưa có lịch chiếu vào ngày này</p>
        }
    }
    const renderDateBooking = () => {
        let daysOffWeek = [];
        for (let i = 0; i < 7; i++) {
            let day = new Date(today);
            let getDate = day.setDate(day.getDate() + i);
            daysOffWeek.push(
                <div
                    className={`dateFilter ${new Date(getDate).toLocaleDateString() === new Date(todayChoice).toLocaleDateString() ? 'active' : ''}`}
                    onClick={() => { setTodayChoice(getDate) }} key={i}>
                    <p>{getDay(new Date(getDate))}</p>
                    <Moment format='DD'>{new Date(getDate)}</Moment>
                </div>
            )
        }
        return daysOffWeek;
    }
    
    if (cinemaid.length === 0) {
        return (
            <div className="movieDetailShowTimeMobile">
                <p className="noticeFilm">Không có suất chiếu</p>
            </div>
        )
    } else {
        return (
            <div className="movieDetailShowTimeMobile">
                <div className="dateOfWeek">
                    {renderDateBooking()}
                </div>
                <div className="showTime">
                    {
                        movie.heThongRapChieu?.map((cinema, index) => {
                            return <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} key={index} className="cinemaName" onClick={() => setCinemaID(cinema.maHeThongRap)}>
                                    <img src={cinema.logo} alt="logo" />
                                    <span>{cinema.tenHeThongRap}</span>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {renderFilmOfTheWeek(cinema)}
                                </AccordionDetails>
                            </Accordion>
                        })
                    }
                </div>
            </div>
        )
    }
}