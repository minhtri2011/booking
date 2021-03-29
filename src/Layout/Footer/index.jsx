import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import './style.scss';

export default function CenteredGrid() {
    return (
        <section id="footer">
            <Container>
                <div className='maxWidth'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} >
                            <Grid container spacing={0}>
                                <Hidden smDown>
                                    <Grid item sm={12}>
                                        <p className='text_title'>TIX</p>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <a className='text_content' href="@"><p>FAQ</p></a>
                                        <a className='text_content' href="@">Brand Guidelines</a>
                                    </Grid>
                                </Hidden>
                                <Grid item xs={12} sm={12}>
                                    <Grid container>
                                        <Grid sm={12} xs={12} item>
                                            <a className='text_content' href="@">Thoả thuận sử dụng</a>
                                        </Grid>
                                        <Grid sm={12} xs={12} item>
                                            <a className='text_content' href="@">Chính sách bảo mật</a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Hidden smDown>
                            <Grid item md={4} >
                                <p className='text_title'>ĐỐI TÁC</p>
                                <div className='listlogo'>
                                    {/* <div> */}
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.cgv.vn/">
                                            <img className='imgLogo' src="/img/footer/cgv.png" alt="CGV" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.bhdstar.vn/">
                                            <img className='imgLogo' src="/img/footer/bhd.png" alt="BHD" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.galaxycine.vn/">
                                            <img className='imgLogo' src="/img/footer/galaxycine.png" alt="GALAXY" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="http://cinestar.com.vn/">
                                            <img className='imgLogo' src="/img/footer/cinestar.png" alt="CINESTAR" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="http://lottecinemavn.com/LCHS/index.aspx">
                                            <img className='imgLogo' src="/img/footer/lotte.png" alt="LOTTE" />
                                        </a>
                                    {/* </div> */}
                                    {/* <div> */}
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.megagscinemas.vn/">
                                            <img className='imgLogo' src="/img/footer/megags.png" alt="MEGAS" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.betacineplex.vn/home.htm">
                                            <img className='imgLogo' src="/img/footer/bt.jpg" alt="bt" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="http://ddcinema.vn/">
                                            <img className='imgLogo' src="/img/footer/dongdacinema.png" alt="ddc" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://touchcinema.com/">
                                            <img className='imgLogo' src="/img/footer/TOUCH.png" alt="TOUCH" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://cinemaxvn.com/">
                                            <img className='imgLogo' src="/img/footer/cnx.jpg" alt="CNX" />
                                        </a>
                                    {/* </div> */}
                                    {/* <div> */}
                                        <a target="_blank" rel="noopener noreferrer" href="https://starlight.vn/">
                                            <img className='imgLogo' src="/img/footer/STARLIGHT.png" alt="STARLIGHT" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.dcine.vn/">
                                            <img className='imgLogo' src="/img/footer/dcine.png" alt="DCINE" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://zalopay.vn/">
                                            <img className='imgLogo' src="/img/footer/zalopay_icon.png" alt="ZALO" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.payoo.vn/">
                                            <img className='imgLogo' src="/img/footer/payoo.jpg" alt="PAYOO" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.vietcombank.com.vn/">
                                            <img className='imgLogo' src="/img/footer/VCB.png" alt="VCB" />
                                        </a>
                                    {/* </div> */}
                                    {/* <div> */}
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.agribank.com.vn/">
                                            <img className='imgLogo' src="/img/footer/AGRIBANK.png" alt="AGRIBANK" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.vietinbank.vn/">
                                            <img className='imgLogo' src="/img/footer/VIETTINBANK.png" alt="VIETTINBANK" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.indovinabank.com.vn/">
                                            <img className='imgLogo' src="/img/footer/IVB.png" alt="IVB" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://webv3.123go.vn/">
                                            <img className='imgLogo' src="/img/footer/123go.png" alt="123go" />
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://laban.vn/">
                                            <img className='imgLogo' src="/img/footer/laban.png" alt="LABAN" />
                                        </a>
                                    {/* </div> */}
                                </div>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item md={2} >
                                <p className='text_title text_center '>MOBILE APP</p>
                                <div className='iconMobile'>
                                    <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197">
                                        <img src="/img/footer/apple-logo.png" alt="apple" />
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                                        <img src="/img/footer/android-logo.png" alt="android" />
                                    </a>
                                </div>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={6} md={2}>
                            <Hidden smDown>
                                <p className='text_title text_center'>SOCIAL</p>
                            </Hidden>
                            <div className="iconMobile">
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tix.vn/">
                                    <img src="/img/footer/facebook-logo.png" alt="facebook" />
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://zalo.me/tixdatve">
                                    <img src="/img/footer/zalo-logo.png" alt="zalo" />
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                    <hr className='hrCustom' />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <img className='logoFooter' src="/img/footer/zion-logo.jpg" alt="zion" />
                        </Grid>
                        <Grid item xs={12} sm={8} className='textContentFooter'>
                            <span className='text_title'>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</span>
                            <span className='text_content'>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</span>
                            <span className='text_content'>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</span>
                            <span className='text_content'>đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</span>
                            <span className='text_content'>Số Điện Thoại (Hotline): 1900 545 436</span>
                            <span className='text_content'>Email: support@tix.vn</span>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <img className='logoFooter' src="/img/footer/tb.png" alt="tb" />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );

}
