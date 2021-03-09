import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useEffect } from 'react';
import { groupID } from '../../Config/setting';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { movieServices } from '../../Services/movie';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
export default function AdminMovie() {
    const useStyles = makeStyles(theme => ({
        datePicker: {
            width: 150
        }
    }));
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: "Mã phim", field: "maPhim", type: "numeric" },
            { title: "Tên phim", field: "tenPhim" },
            { title: "Trailer", field: "trailer" },
            { title: "Bí danh", field: "biDanh" },
            {
                title: "Hình Ảnh",
                editComponent: props => (
                    <input
                        type="file"
                        onChange={e => props.onChange(e.target.files[0])}
                    />
                ),
                field: "hinhAnh",
                render: hinhAnh => (
                    <img src={hinhAnh.hinhAnh} style={{ width: 100, height: 100 }} alt={hinhAnh.hinhAnh} />
                ),
                type: "string"
            },
            { title: "Mô Tả", field: "moTa" },
            {
                title: "Ngày khởi chiếu",
                editComponent: props => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.datePicker}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date"
                            value={props.value ? props.value : new Date()}
                            onChange={(date) => {
                                props.onChange(date)
                            }}
                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                        />
                    </MuiPickersUtilsProvider>
                ),
                field: "ngayKhoiChieu"
            },
            { title: "Đánh giá", field: "danhGia", type: "numeric" }
        ],
        data: [],
    });
    useEffect(() => {
        movieServices.getMovieList()
            .then((rs) => {
                setState((prevState) => {
                    return { ...prevState, data: rs.data };
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    let handleDeleteMovie = (movie) => {
        movieServices.deleteMovie(movie.maPhim)
            .then(rs => {
                alert('Xoá thành công')
            })
            .catch(error => {
                alert(error.response.data);
            });
    };
    let handleAddMovie = (movie) => {
        let moment = require('moment');
        console.log(movie);
        var form_data = new FormData();
        let ngayKhoiChieu = moment(movie.ngayKhoiChieu).format("DD/MM/YYYY")
        let maPhim = parseInt(movie.maPhim, 10);
        let danhGia = parseInt(movie.danhGia, 10);
        let movieAdd = { ...movie, maNhom: groupID, maPhim: maPhim, danhGia: danhGia, ngayKhoiChieu: ngayKhoiChieu };
        for (const key in movieAdd) {
            console.log(key, movieAdd[key]);
            form_data.append(key, movieAdd[key]);
        }
        movieServices.addMovie(form_data)
            .then(res => {
                alert('Thêm phim thành công');
            })
            .catch(error => {
                alert(error.response.data);
            });
    };
    let handleEditMovie = (movie) => {
        var form_data = new FormData();
        let maPhim = parseInt(movie.maPhim, 10);
        let danhGia = parseInt(movie.danhGia, 10);
        let movieEdit = {
            ...movie,
            maNhom: groupID,
            maPhim: maPhim,
            danhGia: danhGia
        };
        for (const key in movieEdit) {
            form_data.append(key, movieEdit[key]);
        }
        movieServices.editMovie(form_data)
            .then(rs => {
                console.log(rs);
                alert('Sửa thành công')
            })
            .catch(error => {
                alert('Sửa không thành công')
            });
    };

    return (
        <MaterialTable
            icons={tableIcons}
            title="Quản lý phim"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            handleAddMovie(newData);
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            handleEditMovie(newData)
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            handleDeleteMovie(oldData);
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
