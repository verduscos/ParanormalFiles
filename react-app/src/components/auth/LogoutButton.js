import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { BiLogOutCircle } from 'react-icons/bi';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };


  return (
      <button id="logoutBtn" onClick={onLogout}><BiLogOutCircle /></button>
  );
};

export default LogoutButton;
