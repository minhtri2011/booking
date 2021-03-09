import React, { Fragment } from 'react'
import Header from '../../Layout/Header'
import { Route } from 'react-router-dom'

const ProfileLayout = (props) => {
    return (
        <Fragment>
            <Header />
            {props.children}
        </Fragment>
    )
}
export const PropfileTemplate = props => {
    return <Route path={props.path} {...props.exact} render={(propsComponent) => (
        <ProfileLayout>
            <props.component {...propsComponent} />
        </ProfileLayout>
    )} />
}