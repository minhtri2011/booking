import React, { useState, useEffect } from 'react';
import { ModalPopup } from '../Modal';
import { groupID } from '../../Config/setting';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { movieServices } from '../../Services/movie';
import TextField from '@material-ui/core/TextField';
import { useDropzone } from 'react-dropzone';


export default function ModalAdminEditUser(props) {
    const { openModal, setOpenModal, setReload, reloadState, movieInfo } = props;
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const thumbs = files?.map(file => (
        <div key={file.name}>
            <img src={file.preview} alt="imgDemo" />
        </div>
    ));
    useEffect(() => () => {
        if (files) {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files]);
    // xóa ảnh up load của form khi tắt modal
    useEffect(() => {
        if (!openModal) {
            setFiles()
        }
    }, [openModal])
    //thêm phim
    const handleEditMovie = (movie) => {
        let moment = require('moment');
        let form_data = new FormData();
        let ngayKhoiChieu = moment(movie.ngayKhoiChieu).format("DD/MM/YYYY")
        let maPhim = parseInt(movie.maPhim, 10);
        let danhGia = parseInt(movie.danhGia, 10);
        let hinhAnh = files ? files[0] : '';
        let movieAdd = {
            ...movie,
            maNhom: groupID,
            maPhim: maPhim,
            danhGia: danhGia,
            ngayKhoiChieu: ngayKhoiChieu,
            hinhAnh: hinhAnh
        };
        for (const key in movieAdd) {
            form_data.append(key, movieAdd[key]);
        }
        movieServices.editMovie(form_data).then(res => {
            setFiles();
            setOpenModal(!openModal);
            setReload(!reloadState);
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật phim thành công',
                showConfirmButton: false,
                timer: 2000
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 2000
            })
        })
    }
    //validate cho form yup
    const editSchema = Yup.object().shape({
        tenPhim: Yup.string().required("(*) Tên phim không được bỏ trống!"),
        biDanh: Yup.string().required("(*) Bí danh không được bỏ trống!"),
        trailer: Yup.string().required("(*) Trailer không được bỏ trống!"),
        moTa: Yup.string().required("(*) Mô tả không được bỏ trống!"),
        ngayKhoiChieu: Yup.string().required("(*) Ngày khởi chiếu không được bỏ trống!"),
        danhGia: Yup.string().required("(*) Đánh giá không được bỏ trống!"),
    })
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenPhim: movieInfo.tenPhim || "",
            biDanh: movieInfo.biDanh || "",
            trailer: movieInfo.trailer || "",
            moTa: movieInfo.moTa || "",
            ngayKhoiChieu: movieInfo.ngayKhoiChieu || "",
            danhGia: movieInfo.danhGia || "",
            hinhAnh: '',
            maNhom: groupID,
            maPhim: movieInfo.maPhim || "",
        },
        validationSchema: editSchema,
        onSubmit: (values, { resetForm }) => {
            handleEditMovie(values, resetForm);
        },
    })
    return (
        <ModalPopup openModal={openModal} setOpenModal={setOpenModal} >
            <div className="modalAddMovieForm">
                <div className="dropImg">
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Kéo thả hoặc click chọn ảnh</p>
                        </div>
                    </section>
                    <aside className="imgDemo">
                        {thumbs}
                    </aside>
                </div>
                <form onSubmit={formik.handleSubmit} id='addMovieForm'>
                    <p>Cập nhật phim</p>
                    <TextField onChange={formik.handleChange} value={formik.values.tenPhim} label="Tên phim" type="text" name='tenPhim' className='tenPhim' variant="outlined" />
                    {formik.errors.tenPhim && formik.touched.tenPhim && (
                        <p className='errorText'>{formik.errors.tenPhim}</p>
                    )}
                    <TextField onChange={formik.handleChange} value={formik.values.biDanh} label="Bí danh" type="string" name='biDanh' className='biDanh' variant="outlined" />
                    {formik.errors.biDanh && formik.touched.biDanh && (
                        <p className='errorText'>{formik.errors.biDanh}</p>
                    )}
                    <TextField onChange={formik.handleChange} value={formik.values.trailer} label="Trailer" type="text" name='trailer' className='trailer' variant="outlined" />
                    {formik.errors.trailer && formik.touched.trailer && (
                        <p className='errorText'>{formik.errors.trailer}</p>
                    )}
                    <TextField onChange={formik.handleChange} value={formik.values.moTa} label="Mô tả" type="text" name='moTa' className='moTa' variant="outlined" />
                    {formik.errors.moTa && formik.touched.moTa && (
                        <p className='errorText'>{formik.errors.moTa}</p>
                    )}
                    <TextField onChange={formik.handleChange} value={formik.values.danhGia} label="Đánh giá" type="number" name='danhGia' className='danhGia' variant="outlined" />
                    {formik.errors.danhGia && formik.touched.danhGia && (
                        <p className='errorText'>{formik.errors.danhGia}</p>
                    )}
                    <TextField onChange={formik.handleChange} defaultValue={formik.values.ngayKhoiChieu.slice(0, 10)} InputLabelProps={{ shrink: true, }} label="Ngày khởi chiếu" type="date" name='ngayKhoiChieu' className='ngayKhoiChieu' variant="outlined" />
                    {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu && (
                        <p className='errorText'>{formik.errors.ngayKhoiChieu}</p>
                    )}
                    <div className="dropImgMobile">
                        <section className="container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Chọn ảnh</p>
                            </div>
                        </section>
                        <aside className="imgDemo">
                            {thumbs}
                        </aside>
                    </div>
                    <button type='submit' className='btn btn__sizeM btn__primary'>Xác nhận</button>
                </form>
            </div>
        </ModalPopup >
    )
}
