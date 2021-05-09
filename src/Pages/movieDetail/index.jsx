import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { movieServices } from '../../Services/movie';
import MovieDetailHeader from './../../Component/MovieDetailHeader';
import MovieDetailShowTime from './../../Component/MovieDetailShowTime';
import MovieDetailShowTimeMobile from './../../Component/MovieDetailShowTimeMobile';
import { isMobile } from '../../Config/setting';
export default function MovieDetail(props) {
    let [movie, setMovie] = useState({});
    useEffect(() => {
        movieServices.getMovieDetail(props.match.params.id).then(res => {
            setMovie(res.data);
            // scroll đến đầu trang khi dùng router
            window.scrollTo({
                top:0,
                behavior: "auto",
            })
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <>
            <MovieDetailHeader movie={movie} />
            {isMobile? <MovieDetailShowTimeMobile movie={movie} />:<MovieDetailShowTime movie={movie} />}
            
        </>
    )
}
