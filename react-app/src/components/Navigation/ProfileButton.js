import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  return (
    <>
      <div onClick={() => setShowMenu(!showMenu)}>
        <BiLogOutCircle />
      </div>
      {showMenu && (
        <div id="profile-dropdown">
          <ul>
            <li id="profile-username">{user?.username}</li>
            <li id="profile-email">{user?.email}</li>
            <li>
              <button id='logout' onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
