import React, { useState, useEffect } from 'react';
import { today } from '../../Config/setting';
import Moment from 'react-moment'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        // margin: '0 auto',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function MovieDetailShowTime(props) {
    const { movie } = props;
    const classes = useStyles();
    const theme = useTheme();
    let [cinemaid, setCinemaID] = useState([]);
    let [todayChoice, setTodayChoice] = useState(new Date(today));
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
    // render từng phim theo ngày trong tuần 
    const renderFilmOfTheWeek = (value, index) => {
        let arr = checkFilmOfCinema(value);
        if (arr.length !== 0) {
            return (
                <Accordion className='list' defaultExpanded key={index}>
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
    //render hình ảnh và tên rạp phim
    const renderNameCinema = () => {
        return movie.heThongRapChieu?.map((cinema, index) => {
            return (<div key={index} className={`cinemaName ${cinema.maHeThongRap === cinemaid ? 'active' : ''}`} onClick={() => setCinemaID(cinema.maHeThongRap)}>
                <img src={cinema.logo} alt="logo" />
                <span>{cinema.tenHeThongRap}</span>
            </div>
            )
        })
    }
    // render 7 ngày kể từ ngày hiện tại
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
    //render giờ chiếu
    const renderShowTime = () => {
        return movie.heThongRapChieu
            ?.filter((item) => item.maHeThongRap === cinemaid)
            ?.map((cinema, index) => {
                return renderFilmOfTheWeek(cinema, index);
            })
    }
    const renderTab1 = () => {
        if (cinemaid.length === 0) {
            return (
                <p className="noticeFilm">Không có suất chiếu</p>
            )
        } else return (
            <div className="movieShowTime">
                <div className="showTimeLeft">
                    {renderNameCinema()}
                </div>
                <div className="showTimeRight">
                    <div className="dateBooking">
                        {renderDateBooking()}
                    </div>
                    <div className="bookingShowTime">
                        {renderShowTime()}
                    </div>
                </div>
            </div>
        )
    }
    const renderTab2 = () => {
        return <p>{movie.moTa}</p>
    }
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className={classes.root} id="movieDetailShowTime">
            <AppBar className="appBarTabs" position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="full width tabs example"
                >
                    <Tab disableFocusRipple={true} disableTouchRipple={true} label="Lịch chiếu" {...a11yProps(0)} />
                    <Tab disableFocusRipple={true} disableTouchRipple={true} label="Nội dung" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                {renderTab1()}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                {renderTab2()}
            </TabPanel>
        </section>
    )


}
// export default MovieDetailShowTime