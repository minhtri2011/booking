import axios from 'axios';
import { domain, token, groupID } from '../Config/setting';


export class Services {
    signIn = (user) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/DangNhap`,
            method: 'POST',
            data: user
        })
    }
    signUp = (user) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/DangKy`,
            method: 'POST',
            data: user
        })
    }
    buyTicket = (info) => {
        return axios({
            url: `${domain}/QuanLyDatVe/DatVe`,
            method: 'POST',
            data: info,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            }
        })
    }
    getUserInfo = (account) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/ThongTinTaiKhoan`,
            method: 'POST',
            data: account
        })
    }
    updateUser = (user) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method: 'PUT',
            data: user,
            header: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            }
        })
    }
    deleteUser = (user) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            }
        })
    }
    addUser = (user) => {
        return axios({
            method: "POST",
            url: `${domain}/QuanLyNguoiDung/ThemNguoiDung`,
            data: user,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            },
        })
    }
    getListUser = () => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupID}`,
            method: 'GET'
        })
    }
    editUser = (user) => {
        return axios({
            method: "PUT",
            url:`${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            data: user,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(token),
            },
        })
    }
}
export const userServices = new Services();