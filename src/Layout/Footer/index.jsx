import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#222222',
    },
    text_title: {
        color: '#ffffff',
        fontSize: '12px',
        margin: '10px 0'
    },
    text_content: {
        color: '#949494',
        fontSize: '12px',
        textDecoration: 'none',
        display: 'block',
        // paddingTop: '15px',
        lineHeight: '1.8',

        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            color: '#949494',
            fontSize: '12px',
            textDecoration: 'none',
            display: 'block',
            // paddingTop: '15px',
            lineHeight: '1.8',
            margin:'0 auto',
        },
    },

    imglogo: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        margin: '15px 20px 0 0',
        backgroundColor: '#ffffff',

    },
    listlogo: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    footer: {
        padding: '20px 0',
    },
    hr: {
        borderTop: '1px solid #4a4a4a',
        marginTop: '20px',
        marginBottom: '20px',
        border: 0,
    },
    text: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();
    return (
        <section id="footer" className={classes.root}>
            <Container maxWidth='lg'>
                <div className={classes.footer} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} >
                            <Grid container spacing={0}>
                                <Hidden smDown>
                                    <Grid item sm={12}>
                                        <p className={classes.text_title}>TIX</p>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <a className={classes.text_content} style={{ paddingTop: '10px' }} href="@"><p>FAQ</p></a>
                                        <a className={classes.text_content} style={{ paddingTop: '10px' }} href="@">Brand Guidelines</a>
                                    </Grid>
                                </Hidden>
                                <Grid item xs={12} sm={6}>
                                    <Grid container>
                                        <Grid sm={12} xs={6} item>
                                            <a className={classes.text_content} style={{paddingTop: '10px'}} href="@">Thoả thuận sử dụng</a>
                                        </Grid>
                                        <Grid sm={12} xs={6} item>
                                            <a className={classes.text_content} style={{paddingTop: '10px'}} href="@">Chính sách bảo mật</a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Hidden smDown>
                            <Grid item md={4} >
                                <p className={classes.text_title}>ĐỐI TÁC</p>
                                <div className={classes.listlogo}>
                                    <div>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.cgv.vn/">
                                            <img className={classes.imglogo} src="/img/footer/cgv.png" alt="CGV" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.bhdstar.vn/">
                                            <img className={classes.imglogo} src="/img/footer/bhd.png" alt="BHD" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.galaxycine.vn/">
                                            <img className={classes.imglogo} src="/img/footer/galaxycine.png" alt="GALAXY" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="http://cinestar.com.vn/">
                                            <img className={classes.imglogo} src="/img/footer/cinestar.png" alt="CINESTAR" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="http://lottecinemavn.com/LCHS/index.aspx">
                                            <img className={classes.imglogo} src="/img/footer/lotte.png" alt="LOTTE" />
                                        </a>
                                    </div>
                                    <div>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.megagscinemas.vn/">
                                            <img className={classes.imglogo} src="/img/footer/megags.png" alt="MEGAS" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.betacineplex.vn/home.htm">
                                            <img className={classes.imglogo} src="/img/footer/bt.jpg" alt="bt" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="http://ddcinema.vn/">
                                            <img className={classes.imglogo} src="/img/footer/dongdacinema.png" alt="ddc" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://touchcinema.com/">
                                            <img className={classes.imglogo} src="/img/footer/TOUCH.png" alt="TOUCH" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://cinemaxvn.com/">
                                            <img className={classes.imglogo} src="/img/footer/cnx.jpg" alt="CNX" />
                                        </a>
                                    </div>
                                    <div>
                                        <a target="_blank" rel="noopener noreferrer" href="https://starlight.vn/">
                                            <img className={classes.imglogo} src="/img/footer/STARLIGHT.png" alt="STARLIGHT" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.dcine.vn/">
                                            <img className={classes.imglogo} src="/img/footer/dcine.png" alt="DCINE" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://zalopay.vn/">
                                            <img className={classes.imglogo} src="/img/footer/zalopay_icon.png" alt="ZALO" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.payoo.vn/">
                                            <img className={classes.imglogo} src="/img/footer/payoo.jpg" alt="PAYOO" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.vietcombank.com.vn/">
                                            <img className={classes.imglogo} src="/img/footer/VCB.png" alt="VCB" />
                                        </a>
                                    </div>
                                    <div>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.agribank.com.vn/">
                                            <img className={classes.imglogo} src="/img/footer/AGRIBANK.png" alt="AGRIBANK" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.vietinbank.vn/">
                                            <img className={classes.imglogo} src="/img/footer/VIETTINBANK.png" alt="VIETTINBANK" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.indovinabank.com.vn/">
                                            <img className={classes.imglogo} src="/img/footer/IVB.png" alt="IVB" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://webv3.123go.vn/">
                                            <img className={classes.imglogo} src="/img/footer/123go.png" alt="123go" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://laban.vn/">
                                            <img className={classes.imglogo} src="/img/footer/laban.png" alt="LABAN" />
                                        </a>
                                    </div>
                                </div>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item md={2} >
                                <p style={{ textAlign: 'center' }} className={classes.text_title}>MOBILE APP</p>
                                <div style={{ textAlign: 'center' }}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197">
                                        <img style={{ margin: '15px 5px' }} height='30px' src="/img/footer/apple-logo.png" alt="apple" />
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                                        <img style={{ margin: '15px 5px' }} height='30px' src="/img/footer/android-logo.png" alt="android" />
                                    </a>
                                </div>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={6} md={2}>
                            <Hidden smDown>
                                <p style={{ textAlign: 'center' }} className={classes.text_title}>SOCIAL</p>
                            </Hidden>
                            <div className="text" style={{ textAlign: 'center' }}>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tix.vn/">
                                    <img style={{ margin: '15px 5px' }} height='30px' src="/img/footer/facebook-logo.png" alt="facebook" />
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://zalo.me/tixdatve">
                                    <img style={{ margin: '15px 5px' }} height='30px' src="/img/footer/zalo-logo.png" alt="zalo" />
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                    <hr className={classes.hr} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <img width="90px" style={{ margin: '0 auto', display: 'flex', borderRadius: '10px' }} src="/img/footer/zion-logo.jpg" alt="zion" />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.text}>
                            <span className={classes.text_title}>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</span>
                            <span className={classes.text_content}>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</span>
                            <span className={classes.text_content}>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</span>
                            <span className={classes.text_content}>đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</span>
                            <span className={classes.text_content}>Số Điện Thoại (Hotline): 1900 545 436</span>
                            <span className={classes.text_content}>Email: support@tix.vn</span>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <img style={{ margin: '0 auto', display: 'flex' }} width="100px" src="/img/footer/tb.png" alt="tb" />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );

}
