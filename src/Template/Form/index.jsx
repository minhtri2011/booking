import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

const FormLayout = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}
export const FormTemplate = props => {
        var Auth = JSON.parse(localStorage.getItem('userLogin'));
    return <Route path={props.path} {...props.exact} render={(propsComponent) => (
        (Auth===null) ?
            <FormLayout>
                <props.component {...propsComponent} />
            </FormLayout>
            : <Redirect to={{ pathname: '/' }} />
    )} />
}