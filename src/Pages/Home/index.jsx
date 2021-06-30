import React, { useEffect, useLayoutEffect, useState } from 'react';
import Carousel from '../../Component/Carousel';
import { ListMovie } from '../../Component/ListMovie';
import ShowTime from '../../Component/ShowTime';
import Apps from '../../Component/Apps';
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
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
    const [width] = useWindowSize();
    return (
        <>
            <Carousel />
            <ListMovie />
            {width < 768 ? <></> : <ShowTime />}
            <Apps />
        </>
    )
}
