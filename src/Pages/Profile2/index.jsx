/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import { useState } from 'react';
import { userServices } from '../../Services/user';
import { userLogin } from '../../Config/setting';
import Moment from 'react-moment';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Fragment>{children}</Fragment>
                </Box>
            )}
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Profile() {
    const [value, setValue] = React.useState(0);
    let [listChair, setListChair] = useState([]);
    let [user, setUser] = useState([]);
    let getUserFromLocal = JSON.parse(localStorage.getItem(userLogin)).taiKhoan;
    const nameUser = {
        taiKhoan: getUserFromLocal
    }
    // let maLoaiNguoiDung = JSON.parse(localStorage.getItem(userLogin)).maLoaiNguoiDung;
    // let maNhom = JSON.parse(localStorage.getItem(userLogin)).maNhom;
    useEffect(() => {
        userServices.getUserInfo(nameUser).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [nameUser])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // modal
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="profileTabs">
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                    <Tab label="Lịch sử đặt vé" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className="user_info">
                    <div className="info_left">
                        <p>Họ tên: {user.hoTen}</p>
                        <p>Email: {user.email}</p>
                        <p>Số điện thoại: {user.soDT}</p>
                    </div>
                    <div className="info_right">
                        <p>Tài khoản: {user.taiKhoan}</p>
                        <p>Mật khẩu: {user.matKhau}</p>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <td>Stt</td>
                            <td>Tên phim</td>
                            <td>Ngày đặt</td>
                            <td className="mid">Ghế đã đặt</td>
                            <td className="mid">Thời lượng phim</td>
                            <td>Giá vé</td>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {user.thongTinDatVe?.map((movie, index) => {
                            return <tr className="item" key={index}>
                                <td>{index + 1}</td>
                                <td>{movie.tenPhim}</td>
                                <td><Moment format="DD-MM-YYYY LT">{movie.ngayDat}</Moment></td>
                                <td>
                                    <button className="detail_btn" type="button" onClick={
                                        () => {
                                            setOpen(true);
                                            setListChair(movie.danhSachGhe);
                                        }
                                    }>
                                        Chi tiết
                                    </button>
                                </td>
                                <td className="mid">{movie.thoiLuongPhim} phút</td>
                                <td>{movie.giaVe}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </TabPanel>
            {/* modal history */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Grow in={open}>
                    <div className="modalPopup">
                        <table >
                            <thead>
                                <tr>
                                    <td>Tên hệ thống rạp</td>
                                    <td>Tên ghế</td>
                                    <td>Tên rạp</td>
                                </tr>
                            </thead>
                            <tbody>
                                {listChair.map((chair, index) => {
                                    return <tr key={index}>
                                        <td>{chair.tenHeThongRap}</td>
                                        <td>{chair.tenRap}</td>
                                        <td>{chair.tenGhe}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </Grow>
            </Modal>
        </div >
    );
}
