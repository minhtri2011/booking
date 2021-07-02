/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { movieServices } from '../../Services/movie';
import Countdown, { zeroPad } from 'react-countdown';
import { userLogin } from '../../Config/setting';
import { userServices } from '../../Services/user';
import Swal from 'sweetalert2';
export default function Booking(props) {
    // const [open, setOpen] = React.useState(false);
    let [movie, setMovie] = useState([]);
    let [listChair, setListChair] = useState([]);
    let [activeSideBar, setActiveSideBar] = useState(false);
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

    //dùng usememo để thời gian đếm ngược không bị render lại khi setstate 
    const dateNow = useMemo(() => Date.now(), [])
    //render danh sách ghế
    const renderListChair = () => {
        return movie.danhSachGhe?.map((chair, index) => {
            return <div className="chair__item" key={index}>
                {renderChair(chair.daDat, chair.loaiGhe, chair)}
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </div>
        })
    }
    //render từng ghế và format lọc từng loại ghế
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
    //tính năng chọn ghế
    const bookChair = (chair) => {
        let index = listChair.findIndex(book => book.stt === chair.stt);
        let arr = [];
        if (listChair.length === 0) {
            setListChair([...listChair, chair]);
        } else {
            listChair.forEach(value => {
                arr = [...arr, parseInt(value.stt)];
            })
            if (chair.stt - Math.max(...arr) > 1 || chair.stt - Math.min(...arr) < -1) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Chỉ được đặt dãy ghế gần nhau',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                if (index !== -1) {
                    listChair.splice(index, 1);
                } else {
                    listChair = [...listChair, chair];
                }
                setListChair([...listChair]);
            }
        }

    }
    //render thông tin phim, địa chỉ và cụm rạp
    const renderMovie = () => {
        return <div>
            <h3 className="border price">
                {listChair.reduce((total, chair) => {
                    return total += chair.giaVe;
                }, 0).toLocaleString()} Đ
            </h3>
            <p className="movieName">{movie.thongTinPhim?.tenPhim}</p>
            <p className="address">{movie.thongTinPhim?.tenCumRap}</p>
            <p className="address">{movie.thongTinPhim?.diaChi}</p>
            <p className="border">Khởi chiếu: {movie.thongTinPhim?.ngayChieu} - {movie.thongTinPhim?.gioChieu} - {movie.thongTinPhim?.tenRap}</p>
            {listChair.length > 0 ? <p className="seatName">
                <span>Ghế: </span>
                {listChair.map((chair, index) => {
                    return <span key={index}>G-{chair.tenGhe}, </span>
                })}
            </p> : <p>Bạn chưa đặt ghế</p>}


        </div>
    }
    //format giờ đếm ngược của thư viện countdown
    const renderTime = ({ minutes, seconds }) => {
        return <span>{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>;
    }
    //thao tác khi đếm ngược hoàn thành, khách hàng có lựa chọn book vé hoặc chuyển về trang chủ
    const onComplete = () => {
        // handleOpen();
        setTimeout(() => {
            props.history.replace('/');
        }, 10000);
        Swal.fire({
            title: 'Đã quá hạn!',
            text: "Bạn sẽ được chuyển hướng về trang chủ sau 10 giây",
            icon: 'warning',
            timer: 9500,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tiếp tục đặt vé',
            cancelButtonText: 'Trang chủ',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }else{
                props.history.replace('/');
            }
        })
    }
    //thao tách submit đặt ghế
    const booking = () => {
        let info = {
            "maLichChieu": props.match.params.id,
            "danhSachVe": listChair,
            "taiKhoanNguoiDung": JSON.parse(localStorage.getItem(userLogin)).taiKhoan
        }
        if (listChair.length > 0) {
            userServices.buyTicket(info).then(res => {
                alert('Đặt vé thành công');
                window.location.replace('/');
            }).catch(err => {
                console.log(err);
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn chưa đặt vé',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
    return (
        <div className="booking_page">
            <div className="renderChair">
                <div className="headerRender">
                    <div className="headerLeft">
                        <p className="title">{movie.thongTinPhim?.tenCumRap}</p>
                        <div className="content">
                            <p>{movie.thongTinPhim?.tenRap}</p>
                            <p>Ngày chiếu: <span>{movie.thongTinPhim?.ngayChieu}</span></p>
                            <p>Giờ chiếu: <span>{movie.thongTinPhim?.gioChieu}</span></p>
                        </div>
                    </div>
                    <div className="headerRight">
                        <p>Thời gian giữ ghế:</p>
                        <p className="countDownNumber"><Countdown intervalDelay={0} renderer={renderTime} onComplete={onComplete} date={dateNow + 120000}></Countdown></p>
                    </div>
                </div>
                <img src="/img/screen.png" alt="" />
                <div className="renderListChair">{renderListChair()}</div>
                <div className="seatCaption">
                    <div className="normal_Chair"></div>
                    <span>Ghế thường</span>
                    <div className="vip_Chair"></div>
                    <span>Ghế vip</span>
                    <div className="booking_Chair">
                        <span>x</span>
                    </div>
                    <span>Ghế đã chọn</span>
                </div>
                <div className="buttonMobile">
                    <p className="price">{listChair.reduce((total, chair) => {
                        return total += chair.giaVe;
                    }, 0).toLocaleString()} Đ</p>
                    {listChair.length > 0 ?
                        <button onClick={() => setActiveSideBar(!activeSideBar)}>Đặt vé</button>
                        :
                        <button disabled className="disabled" >Đặt vé</button>
                    }
                </div>
            </div>
            <div className={`booking__panel ${activeSideBar ? 'active' : ''}`}>
                <div className="movie_info">{renderMovie()}</div>
                <div className="bookingBtn">
                    <button onClick={() => setActiveSideBar(!activeSideBar)} className="btn_booking">Hủy</button>
                    <button onClick={() => {
                        booking()
                    }} className="btn_booking" >Đặt vé</button>
                </div>
            </div>
        </div>
    )
}
