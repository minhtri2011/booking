import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function ProfileBar() {
    return (
        <div className='profileBar'>
            <div className="icon">
                <PersonIcon />
            </div>
            <div className="icon">
                <HomeIcon />
            </div>
            <div className="icon">
                <HistoryIcon />
            </div>
        </div>
    )
}
