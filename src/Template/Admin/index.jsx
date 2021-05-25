import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { userLogin } from '../../Config/setting';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function AdminLayout(props) {
    const getUserName = () => {
        const getUser = JSON.parse(localStorage.getItem(userLogin)).hoTen;
        return <span>{getUser}</span>
    }
    const collapseNavBar = () => {
        const navBar = document.querySelector('.navBar');
        navBar.classList.toggle('collapse')
    }
    return (
        <div className="dashboard">
            <div className="content">
                <div className="navBar collapse">
                    <div className="navBar__btn">
                        <MenuIcon onClick={()=>collapseNavBar()} />
                    </div>
                    <div className="navBar__logo">
                        <Link to='/'><p>CineX</p></Link>
                    </div>
                    <div className="navBar__link">
                        <Link to='/'>
                            <HomeIcon />
                            <p>Trang chủ</p>
                        </Link>
                        <Link to='/'>
                            <PeopleIcon />
                            <p>Quản lí user</p>
                        </Link>
                        <Link to='/'>
                            <MovieIcon />
                            <p>Quản lí phim</p>
                        </Link>
                        <Link to='/'>
                            <ScheduleIcon />
                            <p>Quản lí lịch chiếu phim</p>
                        </Link>
                        <Link to='/'>
                            <ExitToAppIcon />
                            <p>Đăng xuất</p>
                        </Link>
                    </div>
                </div>
                <div className="data">
                    <div className="data__Content">
                        {props.children}
                    </div>
                    <div className="username">
                        <img src="/img/admin/adAvt.png" alt="avt" />
                        {getUserName()}
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
