import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Pagination } from '../../Component/Pagination';
export default function ProfileHistory(props) {
    const { user } = props;
    const formatDateTime = (value) => {
        const moment = require('moment');
        const d = new Date(value);
        return moment(d).format('DD/MM/YYYY - LT')
    }
    return (
        <div className="profileHistory">
            <p className='title'>Lịch sử đặt vé</p>
            <Pagination itemPerPage={10} scrollToEle={'.profileHistory'}>
                {user.thongTinDatVe
                    ?.sort((a, b) => a.ngayDat < b.ngayDat ? 1 : -1)
                    ?.map((item, index) => {
                        return <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <div className='title_accordion' key={index}>
                                    <p>Tên phim: <span>{item.tenPhim}</span></p>
                                    <p>Giá vé: <span>{item.giaVe}</span></p>
                                    <p>Ngày đặt vé:
                                        <span> {formatDateTime(item.ngayDat)}</span>
                                    </p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item.danhSachGhe.map((historyBooking, index) => {
                                    return <div className='content_accordion' key={index}>
                                        <p>{historyBooking.tenHeThongRap}</p>
                                        <p>{historyBooking.tenRap}</p>
                                        <p>Ghế {historyBooking.tenGhe}</p>
                                    </div>
                                })}
                            </AccordionDetails>
                        </Accordion>
                    })}
            </Pagination>
        </div>

    )
}
