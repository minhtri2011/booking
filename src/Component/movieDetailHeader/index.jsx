import React, { useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import Circular from '../Circular';
import ModalVideo from 'react-modal-video'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
export default function MovieDetailHeader(props) {
    const { movie } = props;
    const [isOpen, setOpen] = useState(false)
    const scrollToShowTime = () => {
        let getID = document.getElementById('movieDetailShowTime');
        const { top } = getID.getBoundingClientRect();
        window.scrollTo({
            top: top + window.pageYOffset,
            behavior: "smooth"
        })
    }
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('.movieDetail');
        if (nav) {
            nav.classList.toggle('scrollAction', window.scrollY > 60);
        }
    })
    return (
        <div className="movieDetail">
            <div className="background">
                <video autoPlay loop muted src="/video/CGVIntroduction.mp4"></video>
                <iframe width="560" height="315" src={movie.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="detail">
                <div className="movieImg">
                    <img src={movie.hinhAnh} alt={movie.hinhAnh} />
                    <PlayArrowIcon onClick={() => setOpen(true)}></PlayArrowIcon>
                </div>
                <div className="movieName">
                    <div className='movieName__content'>
                        <p>{new Date(movie.ngayKhoiChieu).toLocaleDateString('en-GB')}</p>
                        <p>
                            <span>C16</span>
                            <span>{movie.tenPhim}</span>
                        </p>
                        <p>114 phút - 6.3 IMDb - 2D/Digital</p>
                        <button onClick={()=>scrollToShowTime()} className='btn btn__primary btn__sizeM'>Mua vé</button>
                    </div>
                </div>
                <div className="movieRating">
                    <div className="movieRating__content">
                        <Circular percentValue={movie.danhGia} />
                        <div className="startMain">
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <span>&#189;</span>
                        </div>
                        <div className="numberOfReviews">
                            <span>Có 123 người đánh giá</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="scrollDown" onClick={()=>scrollToShowTime()}>
                <ScrollDownButton  />
            </div> */}
            <ModalVideo channel="custom" isOpen={isOpen} url={movie.trailer} onClose={() => setOpen(false)} />
        </div>
    )
}