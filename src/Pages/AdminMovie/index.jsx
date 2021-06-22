import React, { useEffect, useState } from 'react'
import { userLogin } from '../../Config/setting';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { movieServices } from '../../Services/movie';
import ModalAdminAddMovie from '../../Component/ModalAdminAddMovie';
import ModalAdminEditMovie from '../../Component/ModalAdminEditMovie';
import Swal from 'sweetalert2';
export default function AdminMovie() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [search, setSearch] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [reloadState, setReload] = useState(true);
    const [movieInfo, setMovieInfo] = useState([]);

    useEffect(() => {
        movieServices.getMovieListPagination(search, currentPage).then(res => {
            setMovieList(res.data);
        }).catch(err => {
            console.log(err.response.data);
        })
    }, [currentPage, search, reloadState]);
    //tạo delay khi user nhấn tìm kiếm để hạn chế gửi nhiều request lên server
    let timer;
    const searchMovie = () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            let values = document.getElementById('searchMovie').value;
            setSearch(values)
        }, 500);
    }
    const deleteMovie = (value) => {
        Swal.fire({
            title: 'Bạn muốn xóa phim này ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: `Trở về`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: `Xóa`,
            cancelButtonColor: 'red',
        }).then((result) => {
            if (result.isConfirmed) {
                movieServices.deleteMovie(value).then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: res.data,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }).catch(err => {
                    if (err.response) {
                        Swal.fire({
                            icon: 'error',
                            title: err.response.data,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        setReload(!reloadState)
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa phim thành công',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const handleEditMovie = (value) => {
        setMovieInfo(value);
        setOpenModalEdit(true);
    };
    const renderListMovie = () => {
        return movieList.items?.map((item, index) => {
            return <tr key={index}>
                <td content="Hình ảnh">
                    <img className="imgMovie" src={item.hinhAnh} alt={item.tenPhim} />
                </td>
                <td content="Mã phim">{item.maPhim}</td>
                <td content="Tên Phim">{item.tenPhim}</td>
                <td content="Bí danh">{item.biDanh}</td>
                <td content="Đánh giá">{item.danhGia}</td>
                <td content="Trailer">
                    {item.trailer}
                </td>
                <td content="Ngày khởi chiếu">{item.ngayKhoiChieu}</td>
                <td content="Mô tả">{item.moTa}</td>
                <td className="action" content="Thao tác">
                    <DeleteIcon onClick={() => deleteMovie(item.maPhim)} className="btn_delete" />
                    <SettingsIcon onClick={() => handleEditMovie(item)} className="btn_setting" />
                </td>
            </tr>
        })
    }
    //render nút chuyển trang
    const renderPaginationButton = () => {
        let arr = [];
        for (let i = 1; i <= movieList.totalPages; i++) {
            arr.push(<button key={i} onClick={() => setCurrentPage(i)}>{i}</button>)
        }
        return arr;
    }
    return (
        <div id="adminMovie">
            <div className="header">
                <div className="header__searchBox">
                    <input id="searchMovie" type="text" placeholder='Tìm kiếm' onKeyUp={() => { searchMovie() }} />
                    <AddIcon onClick={() => { setOpenModal(true) }} className="btn-addUser" />
                </div>
                <div className="header__userName">
                    <img src="/img/admin/adAvt.png" alt="avt" />
                    <span>{JSON.parse(localStorage.getItem(userLogin)).hoTen}</span>
                </div>
            </div>
            <div className="userAdminContent">
                <h2 className='title'>Quản lí danh sách phim</h2>
                <table className="tableMovie">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Mã phim</th>
                            <th>Tên phim</th>
                            <th>Bí danh</th>
                            <th>Đánh giá</th>
                            <th>Trailer</th>
                            <th>Ngày khởi chiếu</th>
                            <th>Mô tả</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListMovie()}
                    </tbody>
                </table>
                <div className="pagination">
                    {renderPaginationButton()}
                </div>
                <ModalAdminAddMovie
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadState={reloadState}
                    setReload={setReload} />
                <ModalAdminEditMovie
                    openModal={openModalEdit}
                    setOpenModal={setOpenModalEdit}
                    reloadState={reloadState}
                    setReload={setReload}
                    movieInfo={movieInfo}
                />
            </div>
        </div>
    )
}
