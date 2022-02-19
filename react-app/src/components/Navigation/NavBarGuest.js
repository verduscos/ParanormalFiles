// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import LogoutButton from '../auth/LogoutButton';
// import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
// import { IoIosAddCircleOutline } from 'react-icons/io';
// import { IoAlbumsOutline } from 'react-icons/io5';
// import { BiLogOutCircle } from 'react-icons/bi';
// import { login } from '../../store/session';


// const NavBarGuest = () => {
//   const dispatch = useDispatch()


//   const demo = async (e) => {
//     await dispatch(login("demo@aa.io", "password"))
//   }


//   return (
//     <nav id="nav-guest">
//       <ul id="nav-ul-guest">
//         <li className="nav-li">
//           <NavLink to='/' exact={true} activeClassName='active'>
//             logo
//           </NavLink>
//         </li>
//         <li className="nav-li">
//           <NavLink id="login" to='/login' exact={true} activeClassName='active'>
//             asdfjsdklafjdskl
//           </NavLink>
//         </li>
//         <li className="nav-li">
//           <NavLink id="signup" to='/sign-up' exact={true} activeClassName='active'>
//             alskjfklsdajf
//           </NavLink>
//         </li>
//         <li>
//           <button onClick={demo}>Demo</button>
//         </li>

//       </ul>
//     </nav>
//   )
// }


// export default NavBarGuest;
