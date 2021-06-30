/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { movieServices } from '../../Services/movie';
import Swal from 'sweetalert2';
export default function AdminSearchShowTime() {

    const [data, setData] = useState({
        movie: '',
        cinema: '',
        cinemaBrand: '',
        cinemaNumber: '',
        date: '',
        fare: '',
    })
    const [movie, setMovie] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [cinemaBrand, setCinemaBrand] = useState([]);

    const firstRender = useRef(false);
    //lấy danh sách phim
    useEffect(() => {
        //lấy danh sách phim
        movieServices.getMovieList().then(res => {
            setMovie(res.data);
        }).catch(err => {
            console.log(err.response.data);
        })
        //lấy danh sách rạp
        movieServices.getCinemaInfo().then(res => {
            setCinema(res.data)
        }).catch(err => {
            console.log(err.response.data);
        })
    }, [])
    //lấy cụm rạp
    useEffect(() => {
        if (firstRender.current && data.cinema !== '') {
            movieServices.getCinemaBranch(data.cinema).then(res => {
                setCinemaBrand(res.data);
            }).catch(err => {
                console.log(err.response.data);
            })
        } else {
            firstRender.current = true
        }
    }, [data])
    const moment = require('moment');
    const handleChange = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'cinema':
                setData({
                    ...data,
                    [name]: event.target.value,
                    cinemaBrand: '',
                    cinemaNumber: '',
                });
                break;
            case 'cinemaBrand':
                setData({
                    ...data,
                    [name]: event.target.value,
                    cinemaNumber: '',
                });
                break;
            default:
                setData({
                    ...data,
                    [name]: event.target.value
                });
                break;
        }
    };
    const handleUpload = () => {
        let dataUpLoad = {
            maPhim: parseInt(data.movie),
            maRap: parseInt(data.cinemaNumber),
            giaVe: parseInt(data.fare),
            ngayChieuGioChieu:moment(data.date).format('DD/MM/yyyy HH:mm:ss')
        }
        movieServices.addShowTime(dataUpLoad)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            })
    }
    const renderBtn = () => {
        if (!data.movie || !data.date || !data.fare || !data.cinemaNumber) {
            return <button disabled className='btn '>Tạo lịch chiếu</button>
        } else {
            return <button onClick={() => handleUpload()} className='btn btn__primary'>Tạo lịch  chiếu</button>
        }
    }
    return (
        <div className='searchBarShowTime'>
            <div className="searchForm">
                <FormControl variant="outlined">
                    <InputLabel htmlFor="movie">Chọn phim</InputLabel>
                    <Select
                        native
                        value={data.movie}
                        onChange={handleChange}
                        inputProps={{
                            name: 'movie',
                            id: 'movie',
                        }}
                    >
                        <option hidden aria-label="None" value="" />
                        {movie?.map((value, index) => {
                            return <option value={value.maPhim} key={index}>{value.tenPhim}</option>
                        })}
                    </Select>
                </FormControl>
                {/* nếu chọn phim mới hiện Ơ chọn hệ thốn rạp */}
                <FormControl variant="outlined">
                    <InputLabel htmlFor="cinema">Chọn hệ thống rạp</InputLabel>
                    <Select
                        native
                        value={data.cinema}
                        onChange={handleChange}
                        inputProps={{
                            name: 'cinema',
                            id: 'cinema',
                        }}
                    >
                        <option hidden aria-label="None" value="" />
                        {cinema ? cinema?.map((value, index) => {
                            return <option key={index} value={value.maHeThongRap}>{value.tenHeThongRap}</option>
                        }) : <></>}
                    </Select>
                </FormControl>
                {data.cinema ? <FormControl variant="outlined">
                    <InputLabel htmlFor="cinemaBrand">Chọn cụm rạp</InputLabel>
                    <Select
                        native
                        value={data.cinemaBrand}
                        onChange={(e) => handleChange(e)}
                        inputProps={{
                            name: 'cinemaBrand',
                            id: 'cinemaBrand',
                        }}
                    >
                        <option selected hidden aria-label="None" value="" />
                        {cinemaBrand?.map((value, index) => {
                            return <option key={index} value={value.maCumRap}  >{value.tenCumRap}</option>
                        })}
                    </Select>
                </FormControl>
                    : <FormControl disabled variant="outlined">
                        <InputLabel htmlFor="cinemaBrand">Chọn cụm rạp</InputLabel>
                        <Select
                            native
                            value={data.cinemaBrand}
                            onChange={handleChange}
                            inputProps={{
                                name: 'cinemaBrand',
                                id: 'cinemaBrand',
                            }}
                        >
                            <option hidden aria-label="None" value="" />
                            {cinemaBrand?.map((value, index) => {
                                return <option key={index}>{value.tenCumRap}</option>
                            })}
                        </Select>
                    </FormControl>
                }
                {data.cinemaBrand ? <FormControl variant="outlined">
                    <InputLabel htmlFor="cinemaNumber">Chọn rạp</InputLabel>
                    <Select
                        native
                        value={data.cinemaNumber}
                        onChange={handleChange}
                        inputProps={{
                            name: 'cinemaNumber',
                            id: 'cinemaNumber',
                        }}
                    >
                        <option hidden aria-label="None" value="" />
                        {/*  eslint-disable-next-line array-callback-return */}
                        {cinemaBrand?.map(value => {
                            if (value.maCumRap === data.cinemaBrand) {
                                return value.danhSachRap.map((dsr, index) => {
                                    return <option key={index} value={dsr.maRap}>{dsr.tenRap}</option>
                                })
                            }
                        })}
                    </Select>
                </FormControl>
                    : <FormControl disabled variant="outlined">
                        <InputLabel htmlFor="cinemaNumber">Chọn rạp</InputLabel>
                        <Select
                            native
                            value={data.cinemaNumber}
                            onChange={handleChange}
                            inputProps={{
                                name: 'cinemaNumber',
                                id: 'cinemaNumber',
                            }}
                        >
                            <option hidden aria-label="None" value="" />
                        </Select>
                    </FormControl>
                }
                {/* <form> */}
                <FormControl>
                    <TextField
                    format="dd/MM/yyyy HH:mm"
                        id="datetime-local"
                        label="Lịch chiếu"
                        type="datetime-local"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        inputProps={{
                            name: 'date',
                            id: 'date',
                        }}
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="age-native-simple">Chọn giá vé</InputLabel>
                    <Select
                        native
                        value={data.fare}
                        onChange={handleChange}
                        inputProps={{
                            name: 'fare',
                            id: 'fare',
                        }}
                    >
                        <option hidden aria-label="None" value="" />
                        <option value={85000}>85K</option>
                        <option value={100000}>100K</option>
                        <option value={150000}>150K</option>
                    </Select>
                </FormControl>
                {renderBtn()}
            </div>
        </div >
    )
}
