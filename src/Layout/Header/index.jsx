import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { HashLink as Link } from 'react-router-hash-link';
import './style.scss';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    button_mid: {
        '&:hover': {
            backgroundColor: 'transparent',
            color: 'red',
        },
    },
    button_right: {
        color: '#9B9B9B',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    button_molbie: {
        fontSize: '16px',
        color: '#9B9B9B',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'Primary',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    menuMid: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    menuRight: {
        position: 'absolute',
        right: '2rem',
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    textlink: {
        textDecoration: 'none',
        color: '#9B9B9B',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
    textlink2: {
        textDecoration: 'none',
        color: 'orangered',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
}));
export default function Header(props) {
    const taiKhoan = useSelector((state) => state.userReducer.taiKhoan);
    const renderUserName = () => {
        if (taiKhoan !== '') {
            return <IconButton disableRipple
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                className={classes.button_right}
                onClick={handleProfileMenuOpen}
            >
                <span className={classes.textlink}>
                    <AccountCircle style={{ fontSize: '30px', paddingRight: '5px' }} />
                </span>
                <span>{taiKhoan}</span>
            </IconButton>

        } else {
            return (
                <IconButton disableRipple
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    className={classes.button_right}
                >
                    <Link className={classes.textlink} to="/login">
                        <span>
                            <AccountCircle style={{ fontSize: '30px', paddingRight: '5px' }} />
                        </span>
                        <span>Đăng nhập</span>
                    </Link>
                </IconButton>)
        }
    }
    // render tên người dùng mobile
    const renderMobileUserName = () => {
        if (taiKhoan !== '') {
            return <IconButton className={classes.button_molbie}>
                <Link className={classes.textlink} to="/profile">
                    <AccountCircle style={{ paddingRight: '5px' }} />
                    {taiKhoan}
                </Link>
            </IconButton>
        }
        else {
            return <IconButton className={classes.button_molbie}>
                <Link className={classes.textlink} to="/login">
                    <AccountCircle style={{ paddingRight: '5px' }} />
                    <span>Đăng nhập</span>
                </Link>
            </IconButton>
        }
    }
    const renderMobileAdmin = () => {
        if (taiKhoan !== '') {
            const Auth = JSON.parse(localStorage.getItem('userLogin')).maLoaiNguoiDung;
            if (Auth === 'QuanTri') {
                return <MenuItem>
                    <IconButton style={{ color: 'black', fontSize: '1rem' }}>
                        <Link className={classes.textlink2} to="/admin">
                            <AccountCircle style={{ paddingRight: '5px' }} />
                    Quản trị
                </Link>
                    </IconButton>
                </MenuItem>
            }
        }
    }
    const renderMobileLogout = () => {
        if (taiKhoan !== '') {
            return <MenuItem>
                <IconButton style={{ color: 'black', fontSize: '1rem' }} onClick={() => {
                    localStorage.clear();
                    window.location.replace('/');
                }}>
                    Đăng xuất
            </IconButton></MenuItem>
        }
    }
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderAdminMenu = () => {
        if (taiKhoan !== '') {
            const Auth = JSON.parse(localStorage.getItem('userLogin')).maLoaiNguoiDung;
            if (Auth === 'QuanTri') {
                return (
                    <MenuItem>
                        <Link to="/admin">
                            <span>Quản trị</span>
                        </Link>
                    </MenuItem>
                )
            }
        }
    }
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className="popupMenu">
                <MenuItem onClick={handleMenuClose}>
                    <Link to="/profile">Trang cá nhân</Link>
                </MenuItem>
                {renderAdminMenu()}
                <MenuItem onClick={() => {
                    localStorage.clear();
                    window.location.replace('/');
                }}>Đăng xuất</MenuItem>
            </div>
        </Menu >
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                {renderMobileUserName()}
            </MenuItem>
            {renderMobileAdmin()}
            {renderMobileLogout()}
        </Menu>
    );
    return (
        <section id="header" className={classes.grow}>
            <AppBar position="static" className="appBar">
                <Toolbar className="toolBar">
                    <IconButton className="logo">
                        <Link to="/"><img src="/img/web-logo.png" alt="weblogo" width="50px" /></Link>
                    </IconButton>
                    <div className={classes.sectionDesktop + ' ' + classes.menuMid} >
                        <IconButton disableRipple className={classes.button_mid}>
                            <Link className="textLink" to="/#listMovie" smooth>Lịch chiếu</Link>
                        </IconButton>
                        <IconButton disableRipple className={classes.button_mid}>
                            <Link className="textLink" to="/#showTime" smooth>Cụm rạp</Link>
                        </IconButton>
                        <IconButton disableRipple className={classes.button_mid}>
                            <Link className="textLink" to="/#apps" smooth>Ứng dụng</Link>
                        </IconButton>
                    </div>
                    <div className={classes.sectionDesktop + ' ' + classes.menuRight}>
                        {renderUserName()}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            className="btnRight"
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </section>
    );
}
