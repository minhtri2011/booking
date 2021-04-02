import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
// import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import NavBar from '../../Layout/NavBar';
const HomeLayout = (props) => {
    return (
        <>
            {/* <Header /> */}
            <NavBar/>
            {props.children}
            <Footer />
        </>
    )
}
export const HomeTemplate = (props) => (
    <Route path={props.path} {...props.exact} render={(propsComponent) => (
        <HomeLayout>
            <props.component {...propsComponent} />
        </HomeLayout>
    )} />
) 