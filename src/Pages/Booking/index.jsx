/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { movieServices } from '../../Services/movie';
import Grid from '@material-ui/core/Grid';
import Countdown, { zeroPad } from 'react-countdown';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';
import { userLogin } from '../../Config/setting';
import { userServices } from '../../Services/user';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
export default function Booking(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [movie, setMovie] = useState([]);
    let [listChair, setListChair] = useState([]);
    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        movieServices.getBooking(props.match.params.id)
            .then(res => {
                setMovie(res.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])
    const renderListChair = () => {
        return movie.danhSachGhe?.map((chair, index) => {
            return <div style={{ display: 'inline' }} key={index}>
                {renderChair(chair.daDat, chair.loaiGhe, chair)}
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </div>
        })
    }
    const renderChair = (bookingChair, type, chair) => {
        if (type === 'Thuong') {
            if (bookingChair) {
                return <button className="chair bookingChair" disabled><div className="sttChair">x</div></button>
            }
            else {
                let cssBookingChair = '';
                let index = listChair.findIndex(book => book.stt === chair.stt);
                if (index !== -1) {
                    cssBookingChair = 'booking_chair';
                }
                return <button onClick={() => {
                    bookChair(chair);
                }}
                    className={`chair ${cssBookingChair}`}><div className="sttChair">{chair.stt}</div></button>
            }
        }
        else {
            if (bookingChair) {
                return <button className="vipChair bookingVipChair" disabled><div className="sttChair">x</div></button>
            }
            else {
                let cssBookingChair = '';
                let index = listChair.findIndex(book => book.stt === chair.stt);
                if (index !== -1) {
                    cssBookingChair = 'booking_chair';
                }
                return <button onClick={() => {
                    bookChair(chair);
                }}
                    className={`vipChair ${cssBookingChair}`}><div className="sttChair">{chair.stt}</div></button>
            }
        }

    }
    const bookChair = (chair) => {
        let index = listChair.findIndex(book => book.stt === chair.stt);
        if (index !== -1) {
            listChair.splice(index, 1)
        } else {
            listChair = [...listChair, chair]
        }
        setListChair([...listChair]);
    }

    const renderMovie = () => {
        // return movie.thongTinPhim?.map((info, index) => {
        return <div>
            <h3 className="border price">
                {listChair.reduce((total, chair, index) => {
                    return total += chair.giaVe;
                }, 0).toLocaleString()} Đ
            </h3>
            <p className="movieName">{movie.thongTinPhim?.tenPhim}</p>
            <p className="address">{movie.thongTinPhim?.tenCumRap}</p>
            <p className="address">{movie.thongTinPhim?.diaChi}</p>
            <p className="border">Khởi chiếu: {movie.thongTinPhim?.ngayChieu} - {movie.thongTinPhim?.gioChieu} - {movie.thongTinPhim?.tenRap}</p>
            <p>Ghế:</p>
            <p className="seatName">
                {listChair.map((chair, index) => {
                    return <span key={index}>G-{chair.tenGhe}, </span>
                })}
            </p>

        </div>
    }
    const renderTime = ({ minutes, seconds }) => {
        return <span>{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>;
    }
    const onComplete = () => {
        handleOpen();
        setTimeout(() => {
            props.history.replace('/');
        }, 3600);
    }
    const dateNow = useMemo(() => Date.now(), [])
    const booking = () => {
        let info = {
            "maLichChieu": props.match.params.id,
            "danhSachVe": listChair,
            "taiKhoanNguoiDung": JSON.parse(localStorage.getItem(userLogin)).taiKhoan
        }
        userServices.buyTicket(info).then(res => {
            alert('Đặt vé thành công');
            window.location.replace('/');
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        // <div className="booking_page">
        //     <div className="booking">
        //         <Grid container spacing={0}>
        //             <Grid item xs={12} md={9}>
        //                 <div className="renderChair">
        //                     <div className="headerRender">
        //                         <div className="headerLeft">
        //                             <p className="title">{movie.thongTinPhim?.tenCumRap}</p>
        //                             <p className="content">Khởi chiếu: {movie.thongTinPhim?.ngayChieu} - {movie.thongTinPhim?.gioChieu} - {movie.thongTinPhim?.tenRap}</p>
        //                         </div>
        //                         <div className="headerRight">
        //                             <p>Thời gian giữ ghế:</p>
        //                             <p className="countDownNumber"><Countdown intervalDelay={0} renderer={renderTime} onComplete={onComplete} date={dateNow + 120000}></Countdown></p>
        //                         </div>
        //                     </div>
        //                     <img src="/img/screen.png" alt="" />
        //                     <div className="renderListChair">{renderListChair()}</div>
        //                     <div className="seatCaption">
        //                         <div className="normal_Chair"></div>
        //                         <span>Ghế thường</span>
        //                         <div className="vip_Chair"></div>
        //                         <span>Ghế vip</span>
        //                         <div className="booking_Chair">
        //                             <span>x</span>
        //                         </div>
        //                         <span>Ghế đã chọn</span>
        //                     </div>
        //                 </div>
        //             </Grid>
        //             <Grid className="grid_right" item xs={12} md={3}>
        //                 <div className="movie_info">{renderMovie()}</div>
        //                 <button onClick={() => {
        //                     booking()
        //                 }} className="btn_booking">Đặt vé</button>
        //             </Grid>
        //         </Grid>
        //     </div>

        //     <Modal
        //         aria-labelledby="transition-modal-title"
        //         aria-describedby="transition-modal-description"
        //         className={classes.modal}
        //         open={open}
        //         closeAfterTransition
        //         BackdropComponent={Backdrop}
        //         BackdropProps={{
        //             timeout: 500,
        //         }}
        //     >
        //         <Zoom in={open}>
        //             <div className="classModal">
        //                 <img width="500px" src="/img/bookingPage/loader_motion_for_product_UI.gif" alt="loader_motion_for_product_UI.gif" />
        //                 <div className="textModal">
        //                     <h2>Hết thời gian mua vé!</h2>
        //                     <p>Đang chuyển hướng về trang chủ..</p>
        //                 </div>
        //             </div>
        //         </Zoom>
        //     </Modal>
        // </div>
        <div id="booking">
            <div className="booking__content">
                <div className="booking__header">
                    <div className="headerLeft">
                        <p className="title">{movie.thongTinPhim?.tenCumRap}</p>
                        <p className="content">Khởi chiếu: {movie.thongTinPhim?.ngayChieu} - {movie.thongTinPhim?.gioChieu} - {movie.thongTinPhim?.tenRap}</p>
                    </div>
                    <div className="headerRight">
                        <p>Thời gian giữ ghế:</p>
                        <p className="countDownNumber"><Countdown intervalDelay={0} renderer={renderTime} onComplete={onComplete} date={dateNow + 12000000}></Countdown></p>
                    </div>
                </div>
            </div>
            <div className="booking__tab">

            </div>
        </div>
    )
}
