import React from 'react';
import Slider from "react-slick";
export default function Apps() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <section id='apps'>
            <div className="maxWidthContent">
                <div className="apps__content">
                    <div className="apps_detail">
                        <p className="textLeft">Ứng dụng tiện lợi dành cho</p>
                        <p className="textLeft">người yêu điện ảnh</p>
                        <br />
                        <p className='textSmallLeft'>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <br />
                        <button className='buttonLeft'>App miễn phí - Tải về ngay!</button>
                        <p className='textAppUnder'>
                            TIX có hai phiên bản <a rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8">iOS</a> & <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">Android</a>
                        </p>
                    </div>
                    <div className="apps_img">
                        <img className='img' src="img/apps/mobile.png" alt="mobile.png" />
                        <div className="sliderScreen">
                            <div className="img-radius">
                                <Slider {...settings}>
                                    <div>
                                        <img src="/img/apps/slide1.jpg" alt="" />
                                    </div>
                                    <div>
                                        <img src="/img/apps/slide2.jpg" alt="" />
                                    </div>
                                    <div>
                                        <img src="/img/apps/slide3.jpg" alt="" />
                                    </div>
                                    <div>
                                        <img src="/img/apps/slide4.jpg" alt="" />
                                    </div>
                                    <div>
                                        <img src="/img/apps/slide5.jpg" alt="" />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}