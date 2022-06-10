import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';

function ProfileButton({ user }) {
  const history = useHistory();
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
    history.push('/');
  };

  return (
    <>
      <div onClick={() => setShowMenu(!showMenu)}>
        <BiLogOutCircle />
      </div>
      {showMenu && (
        <ul id="profile-dropdown">
          <li>{user?.username}</li>
          <li>{user?.email}</li>
          <li>
            <button id='logout' onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
