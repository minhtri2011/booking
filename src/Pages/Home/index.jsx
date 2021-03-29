import React from 'react';
import Carousel from '../../Component/Carousel';
import ListMovie from '../../Component/ListMovie';
import ShowTime from '../../Component/ShowTime';
import Apps from '../../Component/Apps';
import {isMobile} from '../../Config/setting'
import './style.scss';
export default function Home() {
    return (
        <>
            <Carousel />
            <ListMovie />
            {isMobile ? <></> : <ShowTime />}
            <Apps />
        </>
    )
}
