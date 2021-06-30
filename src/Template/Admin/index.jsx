import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userLogin } from '../../Config/setting';
function AdminLayout(props) {

    const toggleNavBar = () => {
        const navBar = document.querySelector('.navBar');
        navBar.classList.toggle('toggle');
    }
    const collapseNavBar = () => {
        const navBar = document.querySelector('.navBar');
        navBar.classList.toggle('collapse')
    }
    return (
        <div className="dashboard">
            <div className="content">
                <div className="navBar__mobileBtn">
                    <MenuIcon onClick={() => toggleNavBar()} />
                </div>
                <div className="navBar collapse">
                    <div className="navBar__btn">
                        <MenuOpenIcon onClick={() => collapseNavBar()} />
                    </div>
                    <div className="navBar__logo">
                        <p>CineX</p>
                    </div>
                    <div className="navBar__link">
                        <div className="navBar__text navBar__userName">
                            <img src="/img/admin/adAvt.png" alt="avt" />
                            <p>{JSON.parse(localStorage.getItem(userLogin)).hoTen}</p>
                        </div>
                        <div className="navBar__text navBar__colappse" onClick={() => collapseNavBar()}>
                            <MenuOpenIcon />
                            <p>Thu gọn</p>
                        </div>
                        <Link className='navBar__text' to='/'>
                            <HomeIcon />
                            <p>Trang chủ</p>
                        </Link >
                        <Link className='navBar__text' to='/admin'>
                            <PeopleIcon />
                            <p>Quản lí user</p>
                        </Link >
                        <Link className='navBar__text' to='/admin/movie'>
                            <MovieIcon />
                            <p>Quản lí phim</p>
                        </Link >
                        <Link className='navBar__text' to='/admin/movie2'>
                            <ScheduleIcon />
                            <p>Quản lí lịch chiếu phim</p>
                        </Link >
                        <div className='navBar__text' onClick={()=>{
                            localStorage.clear();
                            window.location.replace('/');
                        }}>
                            <ExitToAppIcon />
                            <p>Đăng xuất</p>
                        </div >
                    </div>
                </div>
                <div className="data">
                    <div className="data__Content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AdminTemplate = props => {
    const checkLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (checkLogin) {
        const Auth = JSON.parse(localStorage.getItem('userLogin')).maLoaiNguoiDung;
        return (
            <Route path={props.path} {...props.exact} render={(propsComponent) =>
                (Auth === 'khachHang') ? <Redirect to={{ pathname: '/' }} /> : <AdminLayout>
                    <props.component {...propsComponent} />
                </AdminLayout>
            } />
        )
    } else {
        return <Redirect to={{ pathname: '/' }} />
    }
}
AdminLayout.propTypes = {
    window: PropTypes.func,
};

// export default ResponsiveDrawer;
