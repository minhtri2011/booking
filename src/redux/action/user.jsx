import { DANG_NHAP} from './../types/types';

export const LoginAction = (user) => {
    return {
        type: DANG_NHAP,
        user
    }
}
