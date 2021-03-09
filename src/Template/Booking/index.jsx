import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

const BookingLayout = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}
export const BookingTemplate = props => {
        var Auth = JSON.parse(localStorage.getItem('userLogin'));
    return <Route path={props.path} {...props.exact} render={(propsComponent) => (
        (Auth!==null) ?
            <BookingLayout>
                <props.component {...propsComponent} />
            </BookingLayout>
            : <Redirect to={{ pathname: '/login' }} />
    )} />
}