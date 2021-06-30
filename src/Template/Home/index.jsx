import React from 'react'
import { Route } from 'react-router-dom';
import Footer from '../../Layout/Footer'
import NavBar from '../../Layout/NavBar';
const HomeLayout = (props) => {
    return (
        <>
            <NavBar />
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