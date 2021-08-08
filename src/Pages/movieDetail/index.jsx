import React, { useLayoutEffect, useState, useEffect } from 'react';
import { movieServices } from '../../Services/movie';
import MovieDetailHeader from './../../Component/movieDetailHeader';
import MovieDetailShowTime from './../../Component/movieDetailShowTime';
import MovieDetailShowTimeMobile from './../../Component/MovieDetailShowTimeMobile';
export default function MovieDetail(props) {
    let [movie, setMovie] = useState({});
    useEffect(() => {
        movieServices.getMovieDetail(props.match.params.id).then(res => {
            setMovie(res.data);
            // scroll đến đầu trang khi dùng router
            window.scrollTo({
                top: 0,
                behavior: "auto",
            })
        }).catch(err => {
            console.log(err);
        })
    }, [props.match.params.id])

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
    const [width] = useWindowSize();
    return (
        <>
            <MovieDetailHeader movie={movie} />
            {width < 768 ? <MovieDetailShowTimeMobile movie={movie} /> : <MovieDetailShowTime movie={movie} />}

        </>
    )
}
