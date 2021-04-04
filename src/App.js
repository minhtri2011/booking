/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, Suspense, lazy } from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeTemplate } from './Template/Home';
// import { AdminTemplate } from './Template/Admin';
import { BookingTemplate } from './Template/Booking';
import { userLogin } from './Config/setting';
import { useDispatch } from 'react-redux';
import { LoginAction } from './redux/action/user';

// import { PropfileTemplate } from './Template/Profile';
// import { AdminTemplate } from './Template/Admin';
// import { BookingTemplate } from './Template/Booking';
// import { FormTemplate } from './Template/Form';
// import Loading from './Pages/Loading';
import Home from './Pages/Home'
import Booking from './Pages/Booking'
import AdminUser from './Pages/AdminUser'
import AdminMovie from './Pages/AdminMovie'
import Login from './Pages/Login'
import Registry from './Pages/Registry'
import MovieDetail from './Pages/movieDetail'
import ShowTimeMobile from './Component/ShowTimeMobile';
import Profile from './Pages/Profile';
// import './scss/main.scss';
import Aa from './Pages/Aa'
// // lazyLoad page loading
// const Home = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/Home'))
//     }, 2400);
//   })
// });
// const Login = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/Login'))
//     }, 2400);
//   })
// });
// const Registry = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/Registry'))
//     }, 2400);
//   })
// });
// const MovieDetail = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/movieDetail'))
//     }, 2400);
//   })
// });
// const Booking = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/Booking'))
//     }, 2400);
//   })
// });
// const Profile = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/Profile'))
//     }, 2400);
//   })
// });
// const AdminUser = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/AdminUser'))
//     }, 2400);
//   })
// });
// const AdminMovie = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('./Pages/AdminMovie'))
//     }, 2400);
//   })
// });

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
    // <BrowserRouter>
    //   <Fragment>
    //     <Suspense fallback={<Loading />}>
    //       <Switch>
    //         <FormTemplate exact path="/login" component={Login} />
    //         <FormTemplate exact path="/registry" component={Registry} />
    //         <BookingTemplate exact path="/booking/:id" component={Booking} />
    //         <HomeTemplate exact path="/" component={Home} />
    //         <HomeTemplate exact path="/moviedetail/:id" component={MovieDetail} />
    //         <PropfileTemplate exact path="/profile" component={Profile} />
    //         <AdminTemplate exact path="/admin/movie" component={AdminMovie} />
    //         <AdminTemplate exact path="/admin" component={AdminUser} />
    //       </Switch>
    //     </Suspense>
    //   </Fragment>
    // </BrowserRouter>
    <BrowserRouter>
      <Fragment>
        <Switch>
          <HomeTemplate exact path="/" component={Home} />
          <BookingTemplate exact path="/booking/:id" component={Booking} />
          <HomeTemplate exact path="/admin" component={AdminUser} />
          <HomeTemplate exact path="/admin/movie" component={AdminMovie} />
          <HomeTemplate exact path="/login" component={Login} />
          <Route exact path="/registry" component={Registry} />
          <Route exact path="/profile" component={Profile} />
          <HomeTemplate exact path="/ShowTimeMobile" component={ShowTimeMobile} />
          <HomeTemplate exact path="/MovieDetail/:id" component={MovieDetail} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}
export default App;
