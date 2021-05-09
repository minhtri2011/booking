import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Slider from 'react-slick';
import { movieServices } from '../../Services/movie';
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <NavigateBeforeIcon className="btn_prev"
            onClick={onClick} />
    );
}
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <NavigateNextIcon className="btn_next"
            onClick={onClick} />
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 auto',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function ListMovieMemo() {
    const [isOpenModal, setOpenModal] = useState(false)
    let [listMovie, setListMovie] = useState([]);
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    let [infinite, setInfinite1] = useState(true);
    let [infinite2, setInfinite2] = useState(true);

    useEffect(() => {
        movieServices.getMovieList().then(res => {
            setListMovie(res.data);
            let counta = 0;
            let countb = 0;
            for (let i = 0; i < res.data.length; i++) {
                if (new Date(res.data[i].ngayKhoiChieu) < new Date()) {
                    counta += 1;
                } else {
                    countb += 1;
                }
            }
            counta >= 8 ? setInfinite1(true) : setInfinite1(false)
            countb >= 8 ? setInfinite2(true) : setInfinite2(false)
        }).catch(err => {
            console.log(err);
        })
    }, [])
    // setting slick carousel
    const settings = {
        className: 'carousel',
        dotsClass: 'slick',
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        rows: 2,
        infinite: infinite,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            // {
            //     breakpoint: 600,
            //     settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1,
            //     }
            // }
        ]
    };
    const settings2 = {
        className: 'carousel',
        dotsClass: 'slick',
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        rows: 2,
        infinite: infinite2,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    const renderDanhGia = (values) => {
        let content = [];
        if (Math.ceil(values % 2) !== 0) {
            for (let i = 0; i < Math.ceil(values / 2) - 1; i++) {
                content.push(<StarIcon key={i} />)
            }
            content.push(<p key={Math.ceil(values / 2)}>&#189;</p>)
        } else {
            for (let i = 0; i < Math.ceil(values / 2); i++) {
                content.push(<StarIcon key={i} />)
            }
        }
        return content;
    }
    const renderListMovie = () => {
        return (listMovie
            .filter(movie => new Date(movie.ngayKhoiChieu) < new Date())
            .map((movie, index) => {
                return (
                    <div key={index} className="card">
                        <div className="imgMovie">
                            <img src={movie.hinhAnh} alt={movie.hinhAnh} />
                            <div className="btn-play-bg">
                                <PlayArrowIcon className="btn-play" onClick={() => {
                                    setOpenModal(true)
                                    setState(movie.trailer)
                                }} />
                                <Link className="btn-play-bg" to={`/moviedetail/${movie.maPhim}`}>
                                </Link>
                            </div>
                            <div className="rate">
                                <span className='rate__Number'>{movie.danhGia}</span>
                                <span className='rate__Star'>{renderDanhGia(movie.danhGia)}</span>
                            </div>
                        </div>
                        <div className="hiddenButtonMovie">
                            <div className="nameMovie">
                                <span>{movie.tenPhim}</span>
                            </div>
                            <div className="btn-ticket">
                                <Link to={`/moviedetail/${movie.maPhim}`}><button>Mua vé</button></Link>
                            </div>
                        </div>
                    </div>
                )
            }))
    }
    const renderAndCheckMovie = () => {
        let checkLength = 0;
        listMovie.forEach(movie => {
            if (new Date(movie.ngayKhoiChieu) > new Date()) {
                checkLength += 1;
            }
        });
        if (checkLength > 0) {
            return <Slider {...settings2}>
                {renderListNewMovie()}
            </Slider>;
        }
        else {
            return <p className='alertMovieNull'>Hiện tại chưa có phim sắp công chiếu</p>;
        }
    }
    const renderListNewMovie = () => {
        return (listMovie
            .filter(movie => new Date(movie.ngayKhoiChieu) > new Date())
            .map((movie, index) => {
                return (
                    <div key={index} className="card">
                        <div className="imgMovie">
                            <img src={movie.hinhAnh} alt={movie.hinhAnh} />
                            <div className="btn-play-bg">
                            </div>
                        </div>
                        <div className="hiddenButtonMovie">
                            <div className="nameMovie">
                                <span>{movie.tenPhim}</span>
                            </div>
                            <div className="flexDate">
                                <div className="lauchDate">
                                    <Moment format="DD-MM-YYYY">{movie.ngayKhoiChieu}</Moment>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }))
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [state, setState] = useState();
    return (
        <>
            <section className={classes.root} id="listMovie">
                <AppBar className="appBarTabs" position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="full width tabs example"
                    >
                        <Tab disableFocusRipple={true} disableTouchRipple={true} label="Đang chiếu" {...a11yProps(0)} />
                        <Tab disableFocusRipple={true} disableTouchRipple={true} label="Sắp chiếu" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Slider {...settings}>
                        {renderListMovie()}
                    </Slider>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {renderAndCheckMovie()}
                </TabPanel>

            </section>
            <ModalVideo channel="custom" isOpen={isOpenModal} url={state} onClose={() => setOpenModal(false)} />
        </>
    );

}
export const ListMovie = React.memo(ListMovieMemo)
// export default React.memo(ListMovie)