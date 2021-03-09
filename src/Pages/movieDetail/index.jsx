import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { movieServices } from '../../Services/movie';
import MovieDetailHeader from '../../Component/movieDetailHeader';
import MovieDetailShowTime from '../../Component/movieDetailShowTime';

export default function MovieDetail(props) {
    let [movie, setMovie] = useState({});
    useEffect(() => {
        movieServices.getMovieDetail(props.match.params.id).then(res => {
            setMovie(res.data);
        }).catch(err => {
            console.log(err);
        })
    })
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    return (
        <div>
            <MovieDetailHeader movie={movie}/>
            <MovieDetailShowTime movie={movie}/>
        </div>
    )
}
