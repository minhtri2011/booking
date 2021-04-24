import React from 'react';
import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Fade from '@material-ui/core/Fade';
import SearchBar from '../SearchBar';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, position: 'absolute', top: '50%', right: 0, display: "block", padding: '50px', background: "transparent" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, position: 'absolute', top: '50%', zIndex: 1, left: 0, display: "block", padding: '50px', background: "transparent" }}
            onClick={onClick}
        />
    );
}

const Carousel = props => {

    const settings = {
        className: 'carousel__slider',
        dotsClass: 'slick-dots',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 7000,
        rows: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        dots: true,
        appendDots: dots => (
            <div>
                <ul> {dots} </ul>
            </div>
        ),

    };
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState();
    const handleClose = () => {
        setOpen(false);
    };
    // tạo sự kiện scroll đến 60px sẽ thêm padding tương ứng với chiều cao của navBar để không có hiện tượng giật màn hình khi scroll
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('#carousel');
        if (nav) {
            nav.classList.toggle('scrollAction', window.scrollY > 60);
        }
    })
    return (
        <section id='carousel'>
            <Slider {...settings}>
                <div className="carousel__slide">
                    <div className="carousel__slide-background">
                        <PlayArrowIcon onClick={() => {
                            setState('https://www.youtube.com/embed/krgcyk2rjFc')
                            setOpen(true)
                        }} className="playIcon" />
                    </div>
                    <img src="https://s3img.vcdn.vn/123phim/2021/02/gai-gia-lam-chieu-v-16142435114530.jpg" alt="gai_gia_lam_chieu" />
                </div>
                <div className="carousel__slide">
                    <div className="carousel__slide-background">
                        <PlayArrowIcon onClick={() => {
                            setState('https://www.youtube.com/embed/jluSu8Rw6YE')
                            setOpen(true)
                        }} className="playIcon" />
                    </div>
                    <img src="https://s3img.vcdn.vn/123phim/2021/03/bo-gia-16146819941008.png" alt="bo_gia" />
                </div>
                <div className="carousel__slide">
                    <div className="carousel__slide-background">
                        <PlayArrowIcon onClick={() => {
                            setState('https://www.youtube.com/embed/CpBLtXduh_k')
                            setOpen(true)
                        }} className="playIcon" />
                    </div>
                    <img src="https://s3img.vcdn.vn/123phim/2021/03/palm-springs-16146820863959.jpg" alt="" />
                </div>
            </Slider>
            <SearchBar />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className='Modal-popup-trailer'>
                        <iframe
                            loading="lazy"
                            className="trailer-video"
                            title="iframe" src={state}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                        <button onClick={handleClose} className="close-btn">x</button>
                    </div>
                </Fade>
            </Modal>
        </section>
    );
};

export default Carousel;