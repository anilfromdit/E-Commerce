import React, { Fragment, useState, useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors, loadUser } from "../../actions/userActions"
import { useAlert } from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from "../layout/MetaData";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/LockRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmNewPassword);
        dispatch(updatePassword(myForm));
    }

    const { isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(loadUser);
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");
            window.location.href = `/account`;
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, error, alert, isUpdated]);
    if (isAuthenticated) {
        return (
            <Fragment>
                {loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="Change Password | E-Mart" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox">
                                <h2 className='updatePasswordHeading'>Update Profile</h2>
                                <form className='updatePasswordForm' encType='multipart-form-data' onSubmit={updatePasswordSubmit}>
                                    <div className="loginPassword">
                                        <VpnKeyIcon />
                                        <input
                                            type="password"
                                            placeholder='Enter Old Password'
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder='Enter New Password'
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            placeholder='Confirm New Password'
                                            required
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" value="Change" className='updatePasswordBtn'
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                }
            </Fragment>
        );
    } else {
        window.location.href = '/login'
    }
}
export default UpdatePassword