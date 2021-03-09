import { DANG_NHAP } from './../types/types';
const initialState = {
    taiKhoan: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP:
            state.taiKhoan = action.user;
            return { ...state }
        default:
            return state
    }
}
