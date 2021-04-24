import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { movieServices } from '../../Services/movie';
import MovieDetailHeader from './../../Component/MovieDetailHeader';
import MovieDetailShowTime from './../../Component/MovieDetailShowTime';

export default function MovieDetail(props) {
    let [movie, setMovie] = useState({});
    useEffect(() => {
        movieServices.getMovieDetail(props.match.params.id).then(res => {
            setMovie(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    return (
        <>
            <MovieDetailHeader movie={movie}/>
            <MovieDetailShowTime movie={movie}/>
        </>
    )
}
