/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeTemplate } from './Template/Home';
import { BookingTemplate } from './Template/Booking';
import { userLogin } from './Config/setting';
import { useDispatch } from 'react-redux';
import { LoginAction } from './redux/action/user';
import Home from './Pages/Home'
import Booking from './Pages/Booking'
import AdminUser from './Pages/AdminUser'
import AdminShowTimes from './Pages/AdminShowTime'
import AdminMovie from './Pages/AdminMovie'
import Login from './Pages/Login'
import Registry from './Pages/Registry'
import MovieDetail from './Pages/movieDetail'
import ShowTimeMobile from './Component/ShowTimeMobile';
import Profile from './Pages/Profile';
import './scss/main.scss';
import { FormTemplate } from './Template/Form';
import { AdminTemplate } from './Template/Admin';
import { PropfileTemplate } from './Template/Profile';
function App() {
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem(userLogin);
  // lấy useName từ local mỗi khi load
  const getUserName = () => {
    if (isLogin) {
      dispatch(LoginAction(JSON.parse(isLogin).taiKhoan))
    }
  }
  useEffect(() => {
    getUserName();
  }, [])
  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <HomeTemplate exact path="/" component={Home} />
          <BookingTemplate exact path="/booking/:id" component={Booking} />
          <AdminTemplate exact path="/admin" component={AdminUser} />
          <AdminTemplate exact path="/admin/movie" component={AdminMovie} />
          <AdminTemplate exact path="/admin/movieShowTimes" component={AdminShowTimes} />
          <FormTemplate exact path="/login" component={Login} />
          <FormTemplate exact path="/registry" component={Registry} />
          <PropfileTemplate exact path="/profile" component={Profile} />
          <HomeTemplate exact path="/ShowTimeMobile" component={ShowTimeMobile} />
          <HomeTemplate exact path="/MovieDetail/:id" component={MovieDetail} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}
export default App;
