import React from 'react'
import { useSelector } from "react-redux";

const UpdateProfile = () => {
    const {user, loading,isAuthenticated} = useSelector((state) => state.user);
    if(isAuthenticated){
  return (
    <div>UpdateProfile</div>
  );}
else{
    window.location.href="/login"
}
}

export default UpdateProfile