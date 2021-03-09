import axios from 'axios';
import { domain, token, groupID } from './../Config/setting'

export class Movie {
    getMovieList = () => {
        return axios({
            method: 'GET',
            url: `${domain}/QuanLyPhim/LayDanhSachPhim?maNhom=${groupID}`
        })
    }
    getCinemaInfo = () => {
        return axios({
            method: 'GET',
            url: `${domain}/QuanLyRap/LayThongTinHeThongRap`
        })
    }
    getCinemaBranch = (id) => {
        return axios({
            method: 'GET',
            url: `${domain}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
        })
    }
    getBooking = (id) => {
        return axios({
            method: 'GET',
            url: `${domain}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
        })
    }
    getMovieDetail = (id) => {
        return axios({
            method: 'GET',
            url: `${domain}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
        })
    }
    getMovieSchedule = () => {
        return axios({
            method: 'GET',
            url: `${domain}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${groupID}`
        })
    }
    addMovie = (movie) => {
        return axios({
            method: "POST",
            url:
                `${domain}/QuanLyPhim/ThemPhimUploadHinh`,
            data: movie,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            }
        })
    }
    editMovie = (movie) => {
        return axios({
            method: "POST",
            url: `${domain}/QuanLyPhim/CapNhatPhimUpload`,
            data: movie,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            }
        })
    }
    deleteMovie = (movie) => {
        return axios({
            method: "DELETE",
            url: `${domain}/QuanLyPhim/XoaPhim?MaPhim=${movie}`,
            data: movie,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            }
        })
    }
}
export const movieServices = new Movie();