import React, { useEffect } from 'react';
import Carousel from '../../Component/Carousel';
import { ListMovie } from '../../Component/ListMovie';
import ShowTime from '../../Component/ShowTime';
import Apps from '../../Component/Apps';
import { isMobile } from '../../Config/setting';
export default function Home() {
    useEffect(() => {
        setTimeout(() => {
            const hash = window.location.search;
            const sliceHash = hash.slice(5, hash.length);
            let getID = document.getElementById(sliceHash);
            if (getID) {
                const { top } = getID.getBoundingClientRect();
                window.scrollTo({
                    top: top + window.pageYOffset,
                    behavior: "smooth"
                })
            }
        }, 2000);
    }, [])
    return (
        <>
            <Carousel />
            <ListMovie />
            {isMobile ? <></> : <ShowTime />}
            <Apps />
        </>
    )
}
