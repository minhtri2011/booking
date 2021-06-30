import React, { Fragment } from 'react'
import Header from '../../Layout/Header'
import { Route ,Redirect} from 'react-router-dom'

const ProfileLayout = (props) => {
    return (
        <Fragment>
            <Header />
            {props.children}
        </Fragment>
    )
}
export const PropfileTemplate = props => {
    const checkLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (checkLogin) {
        const Auth = JSON.parse(localStorage.getItem('userLogin')).maLoaiNguoiDung;
        return (
            <Route path={props.path} {...props.exact} render={(propsComponent) =>
                (Auth === 'khachHang') ? <Redirect to={{ pathname: '/' }} /> : <ProfileLayout>
                    <props.component {...propsComponent} />
                </ProfileLayout>
            } />
        )
    } else {
        return <Redirect to={{ pathname: '/' }} />
    }
    // return <Route path={props.path} {...props.exact} render={(propsComponent) => (
    //     <ProfileLayout>
    //         <props.component {...propsComponent} />
    //     </ProfileLayout>
    // )} />
}