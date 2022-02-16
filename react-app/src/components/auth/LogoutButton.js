import React from 'react';
import { useDispatch } from 'react-redux';
import { logout,login } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const demo = async (e) => {
    await dispatch(login("demo@aa.io", "password"))
  }

  // TODO
  // CREATE SEPERATE COMPONENT FOR DEMO

  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <button onClick={demo}>Demo</button>
    </>
  );
};

export default LogoutButton;
