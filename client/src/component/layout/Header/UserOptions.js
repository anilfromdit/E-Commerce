import React, { Fragment, useState } from 'react'
import "./UserOptions.css"
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Backdrop } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {useAlert} from "react-alert"
import { logout } from '../../../actions/userActions';
import {useDispatch} from 'react-redux'

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();
    const options = [
        { icon: <PersonIcon />, name: "Account", func: account },
        { icon: <ListAltIcon />, name: "Your Orders", func: orders },
        { icon: <ExitToAppIcon />, name: "Log Out", func: logoutUser }
    ]
    if (user.role === "admin") {
        options.unshift(
            { icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }

    function orders() {

        window.location.href = `/orders`;
    }
    function account() {

        window.location.href = `/account`;
    }
    function dashboard() {

        window.location.href = `/dashboard`;
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Log Out Successfully");
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex:"10"}}/>
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{zIndex:"11"}}
                open={open}
                direction="down"
                className='SpeedDial'
                icon={<img className='SpeedDialIcon' alt="profile" src={user.avatar.url ? user.avatar.url : "/Profile.png"} />}
            >
                {options.map((option)=>(
                    <SpeedDialAction key={option.name} icon={option.icon} tooltipTitle={option.name} onClick={option.func} />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions