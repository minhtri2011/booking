import React, { useEffect, useState } from 'react';
import { movieServices } from '../../Services/movie';
import Grid from '@material-ui/core/Grid';
import './style.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import Moment from 'react-moment';
import { HashLink as Link } from 'react-router-hash-link';
export default function HomeShowTime() {
    let [movie, setMovie] = useState([]);
    let [cinemaInfo, setCinema] = useState([]);
    useEffect(() => {
        movieServices.getMovieSchedule().then(res => {
            setMovie(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        movieServices.getCinemaInfo().then(res => {
            setCinema(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div id="showTime" className="showTime">
            <Tabs
                defaultTab="BHDStar"
                onChange={(tabId) => { }}
                vertical
            >
                <Grid container spacing={0}>
                    <Grid item md={2} sm={12}>
                        <TabList className="showTimeLeft">
                            {cinemaInfo.map((info, index) => {
                                return <Tab key={index} tabFor={info.maHeThongRap} >
                                    <img src={info.logo} alt={info.logo} /></Tab>
                            })}
                        </TabList>
                    </Grid>
                    <Grid item md={10} sm={12}>
                        {movie.map((cinema, index) => {
                            return (
                                <TabPanel key={index} tabId={cinema.maHeThongRap}>
                                    <div className="miniShowTime">
                                        <Tabs
                                            onChange={(tabId) => { }}>
                                            <Grid container spacing={0}>
                                                <Grid className="miniLeft" item xs={4}>
                                                    <TabList>
                                                        {cinema.lstCumRap.map((branch, index) => {
                                                            return <Tab style={{ display: 'flex' }} key={index} tabFor={branch.maCumRap}>
                                                                <img style={{ width: '3rem' }} src="/img/bhd-star-bitexco-15379520642437.jpg" alt="bhd-star-bitexco-15379520642437.jpg" />
                                                                <div style={{ width: '100%', paddingLeft: '5px' }}>
                                                                    <p className="nameBranch">{branch.tenCumRap}</p>
                                                                    <p className="address">{branch.diaChi}</p>
                                                                </div>
                                                            </Tab>
                                                        })}
                                                    </TabList>
                                                </Grid>
                                                <Grid className="miniRight" item xs={8}>
                                                    {cinema.lstCumRap.map((branch, index) => {
                                                        return <TabPanel key={index} tabId={branch.maCumRap}>
                                                            {branch.danhSachPhim.map((listMovie, index) => {
                                                                return <div key={index}>
                                                                    <div className="nameMovie">
                                                                        <img src={listMovie.hinhAnh} alt={listMovie.hinhAnh} width="50px" />
                                                                        <h5>{listMovie.tenPhim}</h5>
                                                                    </div>
                                                                    <div className="time">
                                                                        {listMovie.lstLichChieuTheoPhim.map((listTime, index) => {
                                                                            return <Link to={`/booking/${listTime.maLichChieu}`} key={index} className="timeItem">
                                                                                <Moment format="DD/MM-hh:mm A">{listTime.ngayChieuGioChieu}</Moment>
                                                                            </Link>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            })}
                                                        </TabPanel>
                                                    })}
                                                </Grid>
                                            </Grid>
                                        </Tabs>
                                    </div>
                                </TabPanel>
                            )
                        })}
                    </Grid>
                </Grid>
            </Tabs>
        </div>
    )
};