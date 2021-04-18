import React, { useEffect, useState } from 'react';
import ProfileHistory from '../../Component/ProfileHistory';
import ProfileInfo from '../../Component/ProfileInfo';
import { userLogin } from '../../Config/setting';
import { userServices } from '../../Services/user';
import './style.scss';
export default function Profile() {
    let [user, setUser] = useState([]);
    const getUserFromLocal = JSON.parse(localStorage.getItem(userLogin)).taiKhoan;
    let nameUser = { taiKhoan: getUserFromLocal }
    useEffect(() => {
        userServices.getUserInfo(nameUser).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id='profile'>
            <ProfileInfo user={user} setUser={setUser}/>
            <ProfileHistory user={user} />
        </div>
    )
}
