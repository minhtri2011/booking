import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { HashLink as Link } from 'react-router-hash-link';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const MovieDetailHeader = (props) => {
    const classes = useStyles();
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
        <div className="banner">
            <Grid container spacing={0}>
                <Grid className="bannerLeft" item xs={12} sm={4}>
                    <img src={props.movie.hinhAnh} alt={props.movie.hinhAnh} />
                </Grid>
                <Grid className="bannerRight" item xs={12} sm={8}>
                    <div>
                        <h3>{props.movie.tenPhim}</h3>
                        <p>{props.movie.moTa}</p>
                        <p className="rate"><span>Khởi chiếu: </span> <Moment format="DD-MM-YYYY">{props.movie.ngayKhoiChieu}</Moment></p>
                        <p className='rate'><span>Đánh giá:</span> {renderDanhGia(props.movie.danhGia)}</p>
                        <div className="btn">
                            <button onClick={()=>{
                                setOpen(true);
                                setState(props.movie.trailer)
                            }} >Trailer</button>
                            <Link to="#movieShowTime" smooth><button >Đặt vé</button></Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
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
                }}
            >
                <Fade in={open}>
                    <iframe title="modal" width="560" height="315" src={state} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </Fade>
            </Modal>
        </div>
    )
}
export default memo(MovieDetailHeader)