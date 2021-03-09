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
import { userServices } from '../../Services/user';
import { useEffect } from 'react';
import { groupID } from '../../Config/setting';
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
export default function AdminUser() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Tên", field: "hoTen", type: 'string' },
      { title: "Tài Khoản", field: "taiKhoan", type: 'string', disabled: true },
      { title: "Mật Khẩu", field: "matKhau", type: 'string' },
      { title: "Email", field: "email", type: 'string' },
      {
        title: "Số Đt",
        field: "soDt",
        type: 'string',
      },
      {
        title: "Mã loại người dùng",
        field: "maLoaiNguoiDung",
        type: 'string',
        lookup: { KhachHang: "KhachHang", QuanTri: "QuanTri" },
      },
    ],
    data: [],
  });
  useEffect(() => {
    userServices.getListUser()
      .then((rs) => {
        setState((prevState) => {
          return { ...prevState, data: rs.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDeleteUser = (user) => {
    userServices.deleteUser(user.taiKhoan)
      .then((res) => {
        alert(res.data);
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(user), 1);
          return { ...prevState, data };
        });
      })
      .catch((error) => {
        console.log(error.response.data);

      });
  };
  const handleAddUser = (user) => {

    let userAdd = { ...user, maNhom: groupID };
    if (
      user.maLoaiNguoiDung !== "KhachHang" &&
      user.maLoaiNguoiDung !== "QuanTri"
    ) {
      alert("Vui lòng chọn mã loại người dùng");
    } else {
      userServices.addUser(userAdd)
        .then((rs) => {
          alert('Thêm thành công')
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };
  const handleEditUser = (user) => {
    let userEdit = { ...user, maNhom: groupID };
    console.log(userEdit);
    if (
      user.maLoaiNguoiDung !== "KhachHang" &&
      user.maLoaiNguoiDung !== "QuanTri"
    ) {
      alert("Vui lòng chọn mã loại người dùng");
    } else {
      userServices.editUser(userEdit)
        .then((res) => {
          alert('Chỉnh sửa thành công')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Quản lý tài khoản"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              
              handleAddUser(newData);
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
              handleEditUser(newData)
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
              handleDeleteUser(oldData);
              // setState((prevState) => {
              //   const data = [...prevState.data];
              //   data.splice(data.indexOf(oldData), 1);
              //   return { ...prevState, data };
              // });
            }, 600);
          }),
      }}
    />
  );
}
