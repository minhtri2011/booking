import React, { memo, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import StarIcon from '@material-ui/icons/Star';
import Circular from '../Circular';

const MovieDetailHeader = (props) => {
    const { movie } = props;
    const [open, setOpen] = React.useState(false);
    let [state, setState] = React.useState();

    const handleClose = () => {
        setOpen(false);
    };

    const renderDanhGia = (values) => {
        let content = [];
        if (values > 5) {
            for (let i = 0; i < 5; i++) {
                content.push(<StarIcon key={i} style={{ color: "yellow" }} />)
            }
        }
        else {
            for (let i = 0; i < values; i++) {
                content.push(<StarIcon key={i} style={{ color: "yellow" }} />)
            }
        }
        return content;
    }
    return (
        // <p className="rate"><span>Khởi chiếu: </span> <Moment format="DD-MM-YYYY">{props.movie.ngayKhoiChieu}</Moment></p>
        <div className="movieDetail">
            <div className="detail">
                <div className="movieImg">
                    <img src={movie.hinhAnh} alt={movie.hinhAnh} />
                </div>
                <div className="movieName">
                    <div className='movieName__content'>
                        <p>{new Date(movie.ngayKhoiChieu).toLocaleDateString('en-GB')}</p>
                        <p>
                            <span>C16</span>
                            <span>{movie.tenPhim}</span>
                        </p>
                        <p>114 phút - 6.3 IMDb - 2D/Digital</p>
                        <button className='btn btn__primary btn__sizeM'>Mua vé</button>
                    </div>
                </div>
                <div className="movieRating">
                    <Circular />
                </div>
            </div>
        </div>
    )
}
export default memo(MovieDetailHeader)